#!/usr/bin/env python3
"""文档预算门：入库的 Markdown 按类归属，每类有总量上限，同类很多份的再加单份上限（hachimi-ios ADR-0070 决策 6）。

**为什么必须有这道门**：文档的增长跟着提交数走，没有一处要求删。只给必读集定上限，叙事就挪进
没有门的计划、调研、编号规约与 ADR 接着长。每类给一个总量，哪一类涨了当场红；归不进任何一类的
文件也红，于是这张表同时是目录白名单，新起一个按日期堆的目录进不了库。

**各仓一份，逐字节相同**：放在 `COPIES` 列的各处，只用标准库，不 import 仓内别的模块，仓根取
`git rev-parse --show-toplevel`，表是仓根的 `doc-budget.json`，各仓一张。同级各仓在父目录里时，
跑这道门就逐字节比对它们的副本，有一份不同即红：改判据要各仓同批改，只改一份会让其余各仓悄悄跑旧判据。
单测 `tests/test_doc_budget_gate.py` 同样各仓相同。

**与各仓单份篇幅门的分工**：入口与常驻文档里点名的那几份，单份上限写在各仓 `prose.json`
的 `must_read` 与 `on_demand`，由行文门判，这里不重复。这张表只管两件事：每一类的合计，与同类很多份的单份上限
（编号规约、ADR、调研、能力规约这一类）。

判据，一处命中即红：

- 走 `git ls-files` 里的 `*.md`，入库的加未被忽略的新文件。每份按 `categories` 的次序匹配 `globs`，
  第一类命中即归它；一类都不归的判红。
- 一类的合计超过 `total`。字数取 `len(read_text())`，与 UTF-8 下的 `wc -m` 一致。
- 一份超过它那条 `files` 规则的 `max`。
- 一类一份都没归进来：glob 写错了或目录删了，这一类在空转。
- 一份里的一节超过 `sections` 那一条的 `cap`。
- 父目录下同级仓里的副本与本份字节不同。缺席的仓不比。

表的写法：

- `globs`：仓根相对路径。`*` 不跨目录，`**/` 跨任意层目录，`?` 一个字符，`[0-9]` 字符类。
- `files`：单份上限，一条一个 `glob`（缺省管整类）、一个 `max`，可选一个 `since`。
- `since` 只管阈值之后新写的：`key` 是一条正则，第一组从仓根相对路径里取出编号或日期，
  `from` 是起始值，含它本身。两边都是数字按数值比，否则按字符串比，日期写成 `YYYY-MM-DD` 即可。
  取不出 `key` 的文件不归这条规则管。
- `headroom`：`--tighten` 留的余量，写绝对字数；缺省取实测的一成。
- `sections`（顶层，可选）：一条管一份文件里的一节，`file` 是仓根相对路径，`heading` 是标题行的开头，
  `cap` 是上限。从那一行的下一行量到下一个同级或更高级的标题为止。文件或标题找不到算 0，不判红：
  各仓的标题写法不同（`## [Unreleased]`、`## [未发布]`），各写各的表。

`--tighten`：把每类的 `total` 改成实测加余量，向上取整到千，只降不升，再按原键序与缩进写回表。
发版收口时跑一次。上调直接改表，理由写进那个提交的说明。

用法：`python3 scripts/doc-budget-gate.py [--tighten]`。
"""

from __future__ import annotations

import argparse
import json
import math
import re
import subprocess
import sys
from collections.abc import Callable
from pathlib import Path

TABLE = "doc-budget.json"
# 各仓副本的位置，相对于各仓共同的父目录。
COPIES = ("hachimi-ios/scripts", "hachimi-android/scripts", "hachimi-backend/scripts", "hachimi-engine/scripts",
          "hachimi-website/scripts", "hachimi-ziwei-web/scripts", "hachimi-orb/tools")


def repo_root() -> Path:
    """仓根按本文件的位置定：套件放在仓根下一层（`scripts/`，orb 是 `tools/`）。钩子在关联工作树里运行时
    导出 `GIT_DIR`，按位置定不受它影响。"""
    return Path(__file__).resolve().parents[1]


def markdown_files(root: Path) -> list[str]:
    """入库的与未被忽略的新 `.md`；已入库但工作区里删掉了的读不到，不算。"""
    listing = subprocess.run(["git", "ls-files", "-z", "--cached", "--others", "--exclude-standard", "--", "*.md"],
                             cwd=root, capture_output=True, text=True, check=True).stdout
    return sorted({path for path in listing.split("\0") if path and (root / path).is_file()})


def compile_glob(pattern: str) -> re.Pattern[str]:
    """glob 换成整串匹配的正则：`*` 与 `?` 不跨 `/`，`**/` 匹配零到多层目录。"""
    out: list[str] = []
    index = 0
    while index < len(pattern):
        if pattern.startswith("**/", index):
            out.append("(?:.*/)?")
            index += 3
        elif pattern.startswith("**", index):
            out.append(".*")
            index += 2
        elif pattern[index] == "*":
            out.append("[^/]*")
            index += 1
        elif pattern[index] == "?":
            out.append("[^/]")
            index += 1
        elif pattern[index] == "[" and "]" in pattern[index + 2:]:
            close = pattern.index("]", index + 2)
            body = pattern[index + 1:close]
            out.append("[^" + body[1:] + "]" if body.startswith("!") else "[" + body + "]")
            index = close + 1
        else:
            out.append(re.escape(pattern[index]))
            index += 1
    return re.compile("".join(out) + r"\Z")


def matches(path: str, globs: list[str]) -> bool:
    return any(compile_glob(glob).match(path) for glob in globs)


def classify(paths: list[str], categories: list[dict]) -> tuple[dict[str, list[str]], list[str]]:
    """→ 每类收到的文件、一类都不归的文件。第一类命中即归它。"""
    members: dict[str, list[str]] = {category["name"]: [] for category in categories}
    orphans: list[str] = []
    for path in paths:
        home = next((category["name"] for category in categories if matches(path, category["globs"])), None)
        if home is None:
            orphans.append(path)
        else:
            members[home].append(path)
    return members, orphans


def ordinal(value: str) -> tuple[int, int | str]:
    """数字按数值比，其余按字符串比；两种不混比，数字排在前面。"""
    return (0, int(value)) if value.isdigit() else (1, value)


def governed(path: str, rule: dict) -> bool:
    """这份是否归这条单份规则管：glob 对得上，`since` 给了就要取得出 key 且不小于起始值。"""
    if "glob" in rule and not matches(path, [rule["glob"]]):
        return False
    since = rule.get("since")
    if since is None:
        return True
    found = re.search(since["key"], path)
    return bool(found) and ordinal(found.group(1)) >= ordinal(str(since["from"]))


def problems(table: dict, sizes: dict[str, int]) -> list[str]:
    """`sizes` 是全部 `.md` 的字数，键是仓根相对路径。"""
    categories = table["categories"]
    members, orphans = classify(sorted(sizes), categories)
    found = [f"{path}：归不进 {TABLE} 的任何一类。放到该放的目录，或在表里给它立一类" for path in orphans]
    for category in categories:
        name, paths = category["name"], members[category["name"]]
        if not paths:
            found.append(f"“{name}”一类一份都没有：glob 写错了或目录删了，改 glob 或删掉这一类")
            continue
        total = sum(sizes[path] for path in paths)
        if total > category["total"]:
            found.append(f"“{name}”合计 {total:,} 字，上限 {category['total']:,}")
        for rule in category.get("files", []):
            for path in paths:
                if governed(path, rule) and sizes[path] > rule["max"]:
                    found.append(f"{path}：{sizes[path]:,} 字，“{name}”单份上限 {rule['max']:,}")
    return found


HEADING = re.compile(r"^(#{1,6})\s")


def section_size(text: str, heading: str) -> int:
    """开头是 `heading` 的那一行之后、下一个同级或更高级标题之前的字数；找不到这一行算 0。"""
    lines = text.split("\n")
    for start, line in enumerate(lines):
        opened = HEADING.match(line)
        if opened and line.startswith(heading):
            level = len(opened.group(1))
            end = next((index for index in range(start + 1, len(lines))
                        if (found := HEADING.match(lines[index])) and len(found.group(1)) <= level), len(lines))
            return len("\n".join(lines[start + 1:end]))
    return 0


def section_problems(table: dict, read: Callable[[str], str | None]) -> list[str]:
    """`read` 给仓根相对路径回正文，文件不在回 None。"""
    found: list[str] = []
    for rule in table.get("sections", []):
        text = read(rule["file"])
        size = section_size(text, rule["heading"]) if text is not None else 0
        if size > rule["cap"]:
            found.append(f"{rule['file']} 的“{rule['heading']}”一节 {size:,} 字，上限 {rule['cap']:,}")
    return found


def measured(table: dict, sizes: dict[str, int]) -> dict[str, tuple[int, int]]:
    """每类的份数与合计字数。"""
    members, _ = classify(sorted(sizes), table["categories"])
    return {name: (len(paths), sum(sizes[path] for path in paths)) for name, paths in members.items()}


def tighten(table: dict, sizes: dict[str, int]) -> list[str]:
    """每类 total 改成实测加余量、向上取整到千，只降不升。就地改 `table`，返回逐类的说明。"""
    counts = measured(table, sizes)
    notes: list[str] = []
    for category in table["categories"]:
        files, total = counts[category["name"]]
        headroom = category.get("headroom", math.ceil(total / 10))
        target = math.ceil((total + headroom) / 1000) * 1000
        before = category["total"]
        category["total"] = min(before, target)
        notes.append(f"{category['name']}：{files} 份，实测 {total:,}，上限 {before:,} → {category['total']:,}")
    return notes


def indent_of(text: str) -> int:
    """表文件自己的缩进宽度，写回时照用。"""
    found = re.search(r"^\{\n( +)\S", text)
    return len(found.group(1)) if found else 2


def dump(table: dict, indent: int) -> str:
    return json.dumps(table, ensure_ascii=False, indent=indent) + "\n"


def copy_problems(own: Path, parent: Path) -> list[str]:
    """父目录下同级各仓的副本逐字节比对本份，缺席的仓不比。"""
    mine = own.read_bytes()
    found = []
    for folder in COPIES:
        other = parent / folder / own.name
        if other.is_file() and other.resolve() != own.resolve() and other.read_bytes() != mine:
            found.append(f"{folder}/{own.name}：与本份字节不同，各仓要同批改")
    return found


def main() -> int:
    parser = argparse.ArgumentParser(description="文档预算门（hachimi-ios ADR-0070 决策 6）")
    parser.add_argument("--tighten", action="store_true", help="各类 total 按实测下调，只降不升")
    args = parser.parse_args()

    root = repo_root()
    source = root / TABLE
    if not source.is_file():
        print(f"❌ 仓根没有 {TABLE}，文档预算无从判", file=sys.stderr)
        return 1
    text = source.read_text(encoding="utf-8")
    table = json.loads(text)
    sizes = {path: len((root / path).read_text(encoding="utf-8")) for path in markdown_files(root)}

    if args.tighten:
        for note in tighten(table, sizes):
            print(f"  {note}")
        source.write_text(dump(table, indent_of(text)), encoding="utf-8")
        print(f"已按实测改写 {TABLE}")

    def read(relative: str) -> str | None:
        path = root / relative
        return path.read_text(encoding="utf-8") if path.is_file() else None

    found = problems(table, sizes) + section_problems(table, read) + copy_problems(Path(__file__), root.parent)
    if not found:
        print(f"✅ 文档预算门通过：{len(sizes)} 份 Markdown 归入 {len(table['categories'])} 类，合计、单份与节都在上限内")
        return 0
    print(f"❌ 文档预算门未过，{len(found)} 处：", file=sys.stderr)
    for line in found:
        print(f"  {line}", file=sys.stderr)
    print("\n   超了先删过时的句子、退场到期的编号规约与没人引的调研；确要上调就改表，理由写进提交说明。",
          file=sys.stderr)
    return 1


if __name__ == "__main__":
    sys.exit(main())
