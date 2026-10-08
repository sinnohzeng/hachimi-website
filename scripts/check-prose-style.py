#!/usr/bin/env python3
"""行文门的入口：取入库清单，按仓根 `prose.json` 筛出要扫的文件，跑判据，打印。

判据在 `prose_rules.py`（逐文件）与 `doc_rules.py`（文档治理）的档头，字段表在 `prose_rules.Config`。
这个文件另判三件事：

- **配置不空转**：`skip_files` 的键要是入库文件，`names` 要有入库文件叫这个名字；`skip_prefixes`、`frozen_prefixes`、`skip_dirs` 与各 glob
  （`living`、`procedural`、`narrative_comments`、`path_mention_files`、每条规则的 `files`）要至少对得上一份入库文件。
  目录一改名，豁免与作用域就静默落空，这里当场报出来。
- **副本一致**：`KIT` 列的七份文件在 `COPIES` 各处逐字节相同。同级各仓在父目录里、且仓根有 `prose.json` 时才比，
  缺席或还没接上这组脚本的仓不比。
- **术语表在不在**：`glossary` 指的文件不在时打印一行，术语一条不判。

用法：`python3 scripts/check-prose-style.py [路径…]`。给路径时只对这几份跑逐文件的判据；不给路径则扫全部入库文本，
再跑文档治理与上面三件事。
"""

from __future__ import annotations

import subprocess
import sys
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parent))

import doc_rules  # noqa: E402
import prose_rules  # noqa: E402

KIT = ("prose_rules.py", "doc_rules.py", "check-prose-style.py", "commit-msg-style-gate.py",
       "tests/test_prose_rules.py", "tests/test_prose_gate.py", "tests/test_doc_rules.py")
# 七份副本的位置，相对于各仓共同的父目录。
COPIES = ("hachimi-ios/scripts", "hachimi-android/scripts", "hachimi-backend/scripts", "hachimi-engine/scripts",
          "hachimi-website/scripts", "hachimi-ziwei-web/scripts", "hachimi-orb/tools")


def repo_root() -> Path:
    """仓根按本文件的位置定：套件放在仓根下一层（`scripts/`，orb 是 `tools/`）。钩子在关联工作树里运行时
    导出 `GIT_DIR`，按位置定不受它影响。"""
    return Path(__file__).resolve().parents[1]


def listing(root: Path) -> list[str]:
    """入库文件加未被忽略的新文件；已入库但工作区里删掉了的读不到，不算。"""
    raw = subprocess.run(["git", "ls-files", "-z", "--cached", "--others", "--exclude-standard"],
                         cwd=root, capture_output=True, text=True, check=True).stdout
    return sorted({path for path in raw.split("\0") if path and (root / path).is_file()})


def scanned(listed: list[str], config: prose_rules.Config) -> list[str]:
    """行文门扫的那一份：后缀或文件名对得上，不在跳过的目录、前缀与整文件豁免里。"""
    found = []
    for name in listed:
        path = Path(name)
        if path.suffix not in config.suffixes and path.name not in config.names:
            continue
        if config.skip_dirs.intersection(path.parts[:-1]) or name.startswith(config.skip_prefixes):
            continue
        if name not in config.skip_files:
            found.append(name)
    return found


def stale_problems(config: prose_rules.Config, listed: list[str]) -> list[str]:
    """配置里对不上任何入库文件的那几项。"""
    problems = [f"skip_files 的 {key} 不是入库文件：改名就改键，删了就连理由一起删" for key in config.skip_files
                if key not in listed]
    problems += [f"names 的 {name} 没有入库文件叫这个名字" for name in sorted(config.names)
                 if not any(Path(path).name == name for path in listed)]
    for field, prefixes in (("skip_prefixes", config.skip_prefixes), ("frozen_prefixes", config.frozen_prefixes),
                            ("binary_allowed", config.binary_allowed)):
        problems += [f"{field} 的 {prefix} 底下没有入库文件" for prefix in prefixes
                     if not any(name.startswith(prefix) for name in listed)]
    problems += [f"skip_dirs 的 {folder} 没有入库文件在它底下" for folder in sorted(config.skip_dirs)
                 if not any(folder in Path(name).parts[:-1] for name in listed)]
    globs = [("living", config.living), ("procedural", config.procedural),
             ("narrative_comments", config.narrative_comments), ("path_mention_files", config.path_mention_files)]
    globs += [(f"rules 第 {index + 1} 条的 files", rule.files) for index, rule in enumerate(config.rules)]
    for field, patterns in globs:
        problems += [f"{field} 的 {glob} 对不上任何入库文件" for glob in patterns
                     if not any(prose_rules.matches(name, [glob]) for name in listed)]
    return problems


def copy_problems(own: Path, parent: Path) -> list[str]:
    """父目录下同级各仓的副本逐份逐字节比对本份。仓根没有 `prose.json` 的仓还没接上这组脚本，不比。"""
    found = []
    for folder in COPIES:
        other = parent / folder
        if not (parent / folder.split("/", 1)[0] / prose_rules.CONFIG).is_file() or other.resolve() == own.resolve():
            continue
        for name in KIT:
            theirs = other / name
            if not theirs.is_file():
                found.append(f"{folder}/{name}：缺这一份，七份要同批改")
            elif theirs.read_bytes() != (own / name).read_bytes():
                found.append(f"{folder}/{name}：与本份字节不同，七份要同批改")
    return found


def load_glossary(root: Path, config: prose_rules.Config) -> tuple[prose_rules.Glossary | None, list[str]]:
    """→ 术语表，与它的问题。文件不在打印一行、不判；在而找不到那张表即红。"""
    path = (root / config.glossary).resolve()
    if not path.is_file():
        print(f"  术语表 {config.glossary} 不在，术语一条不判")
        return None, []
    terms = prose_rules.parse_glossary(path.read_text(encoding="utf-8"))
    if terms is None:
        header = " | ".join(prose_rules.GLOSSARY_HEADER)
        return None, [f"{config.glossary}：找不到表头是“{header}”的表"]
    inside = path.relative_to(root.resolve()).as_posix() if path.is_relative_to(root.resolve()) else ""
    return prose_rules.Glossary.build(config.glossary, terms, inside), []


def report(title: str, lines: list[str], advice: str) -> None:
    print(f"❌ {title}，{len(lines)} 处：", file=sys.stderr)
    for line in lines:
        print(f"  {line}", file=sys.stderr)
    print(f"\n   {advice}", file=sys.stderr)


def main(argv: list[str]) -> int:
    root = repo_root()
    try:
        config = prose_rules.load_config(root)
    except (OSError, ValueError) as error:
        print(f"❌ 读不了仓根 {prose_rules.CONFIG}：{error}", file=sys.stderr)
        return 1
    listed = listing(root)
    glossary, problems = load_glossary(root, config)
    if argv:
        names = [Path(arg).resolve().relative_to(root.resolve()).as_posix() for arg in argv]
    else:
        names = scanned(listed, config)
        problems += stale_problems(config, listed)

    def read(name: str) -> str | None:
        path = root / name
        try:
            return path.read_text(encoding="utf-8") if path.is_file() else None
        except UnicodeDecodeError:
            return None

    must_read = set(doc_rules.must_read_set(read))
    hits: list[str] = []
    for name in names:
        text = read(name)
        if text is None:
            continue
        scope = prose_rules.scope_of(name, config, must_read)
        for hit in prose_rules.check_file(name, text, config, scope, glossary):
            hits.append(f"{name}:{hit.line} {hit.detail}" if hit.line else f"{name} {hit.detail}")
    if not argv:
        problems += doc_rules.check(config, listed, names, read, lambda name: (root / name).read_bytes())
        problems += copy_problems(Path(__file__).resolve().parent, root.parent)
    if not hits and not problems:
        print(f"✓ 行文门通过（{len(names)} 个文件{'' if argv else '，文档治理与副本同过'}）")
        return 0
    if hits:
        report("行文门未过", hits, prose_rules.ADVICE)
    if problems:
        report("文档治理与配置未过", problems, doc_rules.ADVICE)
    return 1


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
