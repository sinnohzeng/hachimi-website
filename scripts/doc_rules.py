#!/usr/bin/env python3
"""文档治理的判据：篇幅、活文档之间的逐字重复、链接、路径提及、文档目录里的二进制。

与 `prose_rules.py` 同属一组七份逐字节相同的脚本，作用域与上限都读仓根 `prose.json`。入口 `check-prose-style.py`
不给路径跑全仓时，逐文件的判据之后接着跑这几条。一处命中即红：

1. **篇幅**：必读集是 `CLAUDE.md`、`AGENTS.md`，加 AGENTS“开工前按序读”一节编号各条链到的仓内 `.md`，
   链到 `specs/` 的（按任务换）与跨仓、外链的不算。必读集与 `must_read` 的键要一致，多一份少一份都红；
   单份超上限、合计超 `must_read_total` 都红。`on_demand` 单份超上限红。AGENTS“按任务再读”一节链到的仓内 `.md`
   要在 `on_demand` 或 `must_read` 里有上限，或在 `uncapped` 里写明理由。上限表里的文件不在也红。
   字符数取 `len(text)`，与 UTF-8 下的 `wc -m` 一致，生成块不计。
2. **逐字重复**：活文档两两之间，去掉围栏代码块、生成块、链接地址、标点、记号与空白之后，有连续 `RUN` 个汉字相同即红，
   报两处的文件与行号。字母与数字打断一串。`canon` 定稿句表“句子”一节里的句子本就要逐字落在几处，先抹掉再比。
   写了 `prose-style-ignore` 的行不比，留给本来就要在几处逐字出现的句子，豁免写理由。
3. **链接**：入库 `.md` 里的相对链接（行内、图片与链接定义行）要指到入库的文件，或底下有入库文件的目录。
   判据是入库没有，不是这台机器上有没有。锚点、外链、站点绝对路径与落在本仓之外的跨仓链接不查。
4. **路径提及**：`path_mention_files` 里反引号包着、以 `path_mention_roots` 开头的仓内路径要入库，
   带通配符与占位符的不查。
5. **二进制**：`binary_roots` 下入库的二进制即红，`binary_allowed` 的前缀除外。截图与录屏看过即删，结论写进文字。
"""

from __future__ import annotations

import posixpath
import re
import unicodedata
from collections import defaultdict
from collections.abc import Callable, Iterable
from pathlib import PurePosixPath
from urllib.parse import unquote

import prose_rules

ENTRY = "AGENTS.md"
READ_ORDER = "开工前按序读"
TRIGGERS = "按任务再读"
RUN = 16
HAN_RUN = re.compile(rf"[㐀-䶿一-鿿]{{{RUN},}}")
LINK_TARGET = re.compile(r"\]\(([^)\s]+)[^)]*\)")
INLINE_LINK = re.compile(r"!?\[[^\]]*\]\(\s*([^()\s]+)")
DEFINITION = re.compile(r"^\s{0,3}\[([^\]^][^\]]*)\]:\s*(\S+)")
SCHEME = re.compile(r"^[A-Za-z][A-Za-z0-9+.\-]*:")
URL = re.compile(r"https?://\S+")
MENTION = re.compile(r"`([^`\s*<>{}]+)`(?!\]\()")
ORDERED = re.compile(r"\d+\.\s")

Reader = Callable[[str], "str | None"]

ADVICE = ("篇幅超了就删到只剩现状、搬去归宿或给链接；重复的句子只留在归宿那一份，别处给链接；"
          "链接与路径改成入库的真路径，文件没了就连引用一起删；截图与录屏看过即删，结论写进文字。")


def section(text: str, title: str) -> list[str]:
    """`## <title>` 到下一个二级标题之间的行。"""
    lines = text.splitlines()
    for start, line in enumerate(lines):
        if line.startswith("## ") and line[3:].strip() == title:
            end = next((i for i in range(start + 1, len(lines)) if lines[i].startswith("## ")), len(lines))
            return lines[start + 1:end]
    return []


def repo_links(lines: Iterable[str]) -> list[str]:
    """行里链到本仓 `.md` 的目标，去掉锚点；`specs/`、跨仓与外链不算。"""
    found: list[str] = []
    for line in lines:
        for target in LINK_TARGET.findall(line):
            path = posixpath.normpath(target.split("#", 1)[0])
            if path.endswith(".md") and not SCHEME.match(path) and not path.startswith(("specs/", "../")) \
                    and path not in found:
                found.append(path)
    return found


def must_read_set(read: Reader) -> list[str]:
    """CLAUDE、AGENTS 加读序编号列表里的链接，按读序。没有 AGENTS 的仓只有 CLAUDE。"""
    entry = read(ENTRY)
    if entry is None:
        return ["CLAUDE.md"]
    listed = [line for line in section(entry, READ_ORDER) if ORDERED.match(line)]
    return ["CLAUDE.md", ENTRY] + [p for p in repo_links(listed) if p not in ("CLAUDE.md", ENTRY)]


def without_generated(text: str, generated: Iterable[tuple[str, str]]) -> str:
    lines = text.split("\n")
    skipped = prose_rules.generated_rows(lines, generated)
    return "\n".join(line for number, line in enumerate(lines, 1) if number not in skipped)


def size_problems(config: prose_rules.Config, read: Reader) -> list[str]:
    problems: list[str] = []
    must = must_read_set(read)
    problems += [f"{p}：在读序里，prose.json 的 must_read 缺这一行" for p in must if p not in config.must_read]
    problems += [f"{p}：prose.json 的 must_read 有这一行，读序里没有" for p in config.must_read if p not in must]
    triggers = repo_links(section(read(ENTRY) or "", TRIGGERS))
    capped = {**config.must_read, **config.on_demand}
    problems += [f"{p}：在“{TRIGGERS}”表里，prose.json 的 on_demand 与 uncapped 都没有它"
                 for p in triggers if p not in capped and p not in config.uncapped]
    problems += [f"{p}：uncapped 里有，文件不在" for p in config.uncapped if read(p) is None]
    total = 0
    for name, cap in capped.items():
        text = read(name)
        if text is None:
            problems.append(f"{name}：上限表里有，文件不在")
            continue
        count = len(without_generated(text, config.generated))
        total += count if name in must else 0
        if count > cap:
            problems.append(f"{name}：{count:,} 字符，上限 {cap:,}")
    if total > config.must_read_total:
        problems.append(f"必读集合计 {total:,} 字符，上限 {config.must_read_total:,}")
    return problems


def normalize(text: str, generated: Iterable[tuple[str, str]] = ()) -> tuple[str, list[int]]:
    """→ 规范化文本与每个字所在的行号。链接只留链接文字，标点、记号、空白与控制字符去掉；
    代码块、生成块与写了豁免的行不在内，它们断开前后两段。"""
    chars: list[str] = []
    rows: list[int] = []
    lines = text.splitlines()
    skipped = prose_rules.generated_rows(lines, generated)
    previous = 0
    for number, line in prose_rules.markdown_lines(lines):
        if number in skipped or prose_rules.IGNORE in line:
            continue
        if number != previous + 1:
            chars.append("\0")
            rows.append(number)
        previous = number
        line = URL.sub(" ", LINK_TARGET.sub("]", line))
        for char in line:
            if unicodedata.category(char)[0] not in "PSZC":
                chars.append(char)
                rows.append(number)
    return "".join(chars), rows


def canon_sentences(text: str | None) -> list[str]:
    """定稿句表“句子”一节里简体与繁体两列的句子，规范化之后。"""
    if text is None:
        return []
    found: list[str] = []
    for line in section(text, "句子"):
        cells = [cell.strip() for cell in line.strip().strip("|").split("|")]
        if len(cells) >= 4 and re.match(r"C\d+$", cells[0]):
            found += [normalize(cell)[0] for cell in cells[2:4]]
    return [s for s in found if s]


def mask(text: str, sentences: Iterable[str]) -> str:
    for sentence in sorted(sentences, key=len, reverse=True):
        text = text.replace(sentence, "\0" * len(sentence))
    return text


def merge(pairs: set[tuple[int, int, int, int]]) -> list[tuple[int, int, int, int, int]]:
    """同一对文件、同一条对角线上相邻的命中并成一段 → (a, b, 起点 a, 起点 b, 窗口数)。"""
    runs: list[tuple[int, int, int, int, int]] = []
    for a, b, pos_a, pos_b in sorted(pairs, key=lambda p: (p[0], p[1], p[2] - p[3], p[2])):
        if runs:
            ra, rb, start_a, start_b, count = runs[-1]
            if (ra, rb, start_a - start_b) == (a, b, pos_a - pos_b) and start_a + count == pos_a:
                runs[-1] = (ra, rb, start_a, start_b, count + 1)
                continue
        runs.append((a, b, pos_a, pos_b, 1))
    return runs


def duplicate_problems(config: prose_rules.Config, read: Reader, names: Iterable[str]) -> list[str]:
    canon = canon_sentences(read(config.canon)) if config.canon else []
    docs: list[tuple[str, str, list[int]]] = []
    for name in sorted(names):
        text, rows = normalize(read(name) or "", config.generated)
        docs.append((name, mask(text, canon), rows))
    grams: dict[str, list[tuple[int, int]]] = defaultdict(list)
    for index, (_, text, _) in enumerate(docs):
        for run in HAN_RUN.finditer(text):
            for start in range(run.start(), run.end() - RUN + 1):
                grams[text[start:start + RUN]].append((index, start))
    pairs: set[tuple[int, int, int, int]] = set()
    for spots in grams.values():
        for a, pos_a in spots:
            pairs.update((a, b, pos_a, pos_b) for b, pos_b in spots if b > a)
    found = []
    for a, b, pos_a, pos_b, count in merge(pairs):
        (name_a, text_a, rows_a), (name_b, _, rows_b) = docs[a], docs[b]
        length = count + RUN - 1
        quote = text_a[pos_a:pos_a + length]
        quote = quote if len(quote) <= 24 else quote[:24] + "…"
        found.append(f"{name_a}:{rows_a[pos_a]} 与 {name_b}:{rows_b[pos_b]} 有 {length} 字逐字相同“{quote}”")
    return found


def known_paths(listed: Iterable[str]) -> set[str]:
    """入库清单，外加它们各级父目录：目录形态的链接只要底下有入库文件就算指得到。"""
    known: set[str] = set()
    for line in listed:
        known.add(line)
        parent = PurePosixPath(line).parent
        while str(parent) != ".":
            known.add(str(parent))
            parent = parent.parent
    return known


def link_targets(text: str) -> list[tuple[int, str]]:
    """这一份里的全部链接目标，带行号。围栏代码块与行内反引号片段已剥。"""
    found: list[tuple[int, str]] = []
    for number, line in prose_rules.markdown_lines(text.splitlines()):
        line = prose_rules.strip_inline_code(line)
        found += [(number, target) for target in INLINE_LINK.findall(line)]
        defined = DEFINITION.match(line)
        if defined:
            found.append((number, defined.group(2)))
    return found


def link_problems(name: str, text: str, known: set[str]) -> list[str]:
    base = PurePosixPath(name).parent
    problems = []
    for number, raw in link_targets(text):
        target = raw.strip("<>")
        if not target or target.startswith(("#", "/")) or SCHEME.match(target):
            continue
        where = unquote(target.split("#", 1)[0].split("?", 1)[0])
        if not where:
            continue
        inside = posixpath.normpath(str(base / where))
        if inside == ".." or inside.startswith("../"):
            continue
        if inside not in known:
            problems.append(f"{name}:{number} 链接指不到入库的文件：{raw}")
    return problems


def mention_problems(name: str, text: str, roots: tuple[str, ...], known: set[str]) -> list[str]:
    problems = []
    for number, line in prose_rules.markdown_lines(text.splitlines()):
        for path in MENTION.findall(line):
            if path.startswith(roots) and path.rstrip("/") not in known:
                problems.append(f"{name}:{number} 提到的路径不在库里：{path}")
    return problems


def is_binary(data: bytes) -> bool:
    if b"\0" in data:
        return True
    try:
        data.decode("utf-8")
    except UnicodeDecodeError:
        return True
    return False


def binary_problems(config: prose_rules.Config, listed: Iterable[str], read_bytes: Callable[[str], bytes]) -> list[str]:
    return [f"{name} 是二进制：截图与录屏看过即删，结论写进文字" for name in listed
            if name.startswith(config.binary_roots) and not name.startswith(config.binary_allowed)
            and is_binary(read_bytes(name))]


def check(config: prose_rules.Config, listed: list[str], scanned: list[str], read: Reader,
          read_bytes: Callable[[str], bytes]) -> list[str]:
    """全部判据跑一遍。`listed` 是入库清单，`scanned` 是行文门扫的那一份。"""
    living = [name for name in scanned if name.endswith(".md") and not name.startswith(config.frozen_prefixes)
              and (prose_rules.matches(name, config.living) or prose_rules.matches(name, config.procedural))]
    known = known_paths(listed)
    found = size_problems(config, read) + duplicate_problems(config, read, living)
    for name in scanned:
        if not name.endswith(".md"):
            continue
        text = read(name) or ""
        found += link_problems(name, text, known)
        if prose_rules.matches(name, config.path_mention_files):
            found += mention_problems(name, text, config.path_mention_roots, known)
    return found + binary_problems(config, listed, read_bytes)
