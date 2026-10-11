#!/usr/bin/env python3
"""单文件快检：编辑钩子每改一份文件调一次，只跑一秒级、逐文件的判据，命中当场回给改它的智能体。

调用方是用户级 Claude Code 钩子 `~/.claude/hooks/edit-gate.py`（dotfiles 仓纳管），协议在它的档头：
argv 是改过的文件，工作目录是仓根，stdout 每行一条 `HARD<TAB>说明` 或 `WARN<TAB>说明`，退出码不看。

判据一律借现成的门，本文件只分派，同一份文件在这里与推送前那一趟结论相同：

- 行文门：只判 `scanned()` 收进来的文件。改的是 `.md` 时另跑文档治理里与它有关的三条：篇幅、与别的活文档逐字重复、
  它自己的链接。全仓那一趟的配置空转与副本比对不在这里跑。父目录缺 hachimi-ios 时行文门跑不了，打一条 WARN。
- 红线门：仓里有 `red-lines-gate.py` 时，`.kt`、`.kts`、`.xml` 交给它的 `--paths`，只跑逐文件的各条。
- SwiftLint：仓根有 `.swiftlint.yml`、本机装了 `swiftlint` 时，`.swift` 照 `make lint` 的 `--strict` 判。

detekt、Android Lint、编译与跨文件的对数只在推送前的门里。
"""

from __future__ import annotations

import importlib.util
import json
import shutil
import subprocess
import sys
from pathlib import Path

HERE = Path(__file__).resolve().parent
sys.path.insert(0, str(HERE))

import doc_rules  # noqa: E402
import prose_rules  # noqa: E402

RED_LINES = HERE / "red-lines-gate.py"
RED_LINE_SUFFIXES = (".kt", ".kts", ".xml")


def prose_gate():
    spec = importlib.util.spec_from_file_location("check_prose_style", HERE / "check-prose-style.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


def prose_lines(root: Path, names: list[str]) -> list[str]:
    gate = prose_gate()
    if gate.ios_missing(root):
        return [f"WARN\t父目录缺 {gate.IOS}，行文门这次没判；推送前的门照判"]
    config = prose_rules.load_config(root)
    listed = gate.listing(root)
    wanted = [name for name in names if name in set(gate.scanned(listed, config))]
    if not wanted:
        return []

    def read(name: str) -> str | None:
        path = root / name
        try:
            return path.read_text(encoding="utf-8") if path.is_file() else None
        except UnicodeDecodeError:
            return None

    glossary, problems = gate.load_glossary(root, config)
    must_read = set(doc_rules.must_read_set(read))
    out = [f"HARD\t{problem}" for problem in problems]
    for name in wanted:
        scope = prose_rules.scope_of(name, config, must_read)
        for hit in prose_rules.check_file(name, read(name) or "", config, scope, glossary):
            out.append(f"HARD\t{name}:{hit.line} {hit.detail}" if hit.line else f"HARD\t{name} {hit.detail}")
    docs = [name for name in wanted if name.endswith(".md")]
    if docs:
        living = [name for name in gate.scanned(listed, config)
                  if name.endswith(".md") and not name.startswith(config.frozen_prefixes)
                  and (prose_rules.matches(name, config.living) or prose_rules.matches(name, config.procedural))]
        related = doc_rules.size_problems(config, read)
        if any(name in living for name in docs):
            related += doc_rules.duplicate_problems(config, read, living)
        known = doc_rules.known_paths(listed)
        out += [f"HARD\t{problem}" for problem in related if any(name in problem for name in docs)]
        for name in docs:
            out += [f"HARD\t{problem}" for problem in doc_rules.link_problems(name, read(name) or "", known)]
    return out


def red_line_lines(root: Path, names: list[str]) -> list[str]:
    wanted = [name for name in names if name.endswith(RED_LINE_SUFFIXES)]
    if not wanted or not RED_LINES.is_file():
        return []
    result = subprocess.run([sys.executable, str(RED_LINES), "--json", "--paths", *wanted],
                            cwd=root, capture_output=True, text=True)
    try:
        hits = json.loads(result.stdout) if result.returncode in (0, 1) else None
    except ValueError:
        hits = None
    if hits is None:
        return [f"WARN\t红线门这次没跑通，推送前的门照判：{(result.stderr or result.stdout).strip()[:300]}"]
    return [f"HARD\t{hit['path']}:{hit['line']} {hit['detail']}" for hit in hits]


def swiftlint_lines(root: Path, names: list[str]) -> list[str]:
    wanted = [name for name in names if name.endswith(".swift")]
    if not wanted or not (root / ".swiftlint.yml").is_file() or shutil.which("swiftlint") is None:
        return []
    result = subprocess.run(["swiftlint", "lint", "--strict", "--quiet", "--force-exclude", *wanted],
                            cwd=root, capture_output=True, text=True)
    return [f"HARD\t{line}" for line in result.stdout.splitlines() if ": error: " in line or ": warning: " in line]


def main(argv: list[str]) -> int:
    root = HERE.parent
    names = []
    for arg in argv:
        try:
            names.append(Path(arg).resolve().relative_to(root.resolve()).as_posix())
        except ValueError:
            continue
    for line in prose_lines(root, names) + red_line_lines(root, names) + swiftlint_lines(root, names):
        print(line)
    return 0


if __name__ == "__main__":
    sys.exit(main(sys.argv[1:]))
