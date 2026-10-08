#!/usr/bin/env python3
"""行文门的判据：逐行的几条、按文件类型取行文、叙事词、术语、句长与本仓规则。

**一组脚本，七份逐字节相同**（hachimi-ios ADR-0074 决策 5）：本份、`doc_rules.py`、`check-prose-style.py`、
`commit-msg-style-gate.py` 与 `tests/` 下四份单测是一组，全名列在 `check-prose-style.py` 的 `KIT`。只用标准库，
各仓的差别全写在仓根 `prose.json`，字段与含义见 `Config`。改判据要七份同批改。

判据，一处命中即红。写了 `prose-style-ignore` 的那一行整行不判，豁免连同理由写在该行：

1. **破折号**：一行里有中文，这行的 em dash 与 en dash 即红，先剥掉行内反引号片段。插入语拆成两句或改前置定语，
   分隔标题与说明用冒号。三种不算：人名与术语的连接号（两侧都是字母）、数值与序号区间（两侧都是数字，
   右侧可以是 `.5` 这样的小数）、字符串开头的装饰横线（左邻是 ASCII 引号）。
2. **直角引号**：港台与日式那两对方头引号一个不留，大陆国标用弯引号，嵌套用单弯引号。
3. **第三方署名**：判整行原文，反引号不豁免。
4. **ASCII 直引号**：行文里同时有中文与 ASCII 双引号即红。代码里的引号是语法，只判取出来的行文。
5. **自造的计划单位**：计划的单位写阶段、任务与检查点，词表在 hachimi-ios `docs/glossary.md` 的“流程”一节。
   冻结前缀不判。
6. **叙事词**：`NARRATIVE` 加本仓的 `narrative_extra`。判 Markdown 活文档与必读集的正文，
   以及 `narrative_comments` 那几类文件的注释，弯引号里引的界面字样与原话不判。
   Markdown 另判六角括号注与标题里带年月的括注。
   常驻文本只写现状，变更经过进 CHANGELOG 与提交说明。commit message 讲的就是变更，不判这一条。
7. **术语**：术语表（`glossary` 指的那份）“不写成”一列的词出现在活文档与源码注释里即红，报该写成哪个词。
   错的写法整个落在“词”一列的某个写法里面时不算，正确的词里含着错的词也不误报。弯引号里的词是在引界面字样或原话，不判。
   术语表本身不判。
8. **句长**：Markdown 活文档按句切，句号、问号、叹号、分号与段尾各断一句。长度是汉字数加英文词数，
   行内反引号片段、代码块与链接地址不计。程序文（`procedural`）上限 `PROCEDURAL_CAP`，其余活文档 `LIVING_CAP`。
   标题、表格行与链接定义行不判。
9. **本仓规则**：`rules` 一条一个正则，`in` 取 `prose`（行文）、`lines`（整行原文）或 `paths`（入库路径），
   `files` 与 `except` 是作用的文件。仓里独有的禁写说法写在这里，不写进代码。

冻结前缀（`frozen_prefixes`：调研、证据、ADR、CHANGELOG 之类时点记录）只判第 1 到第 4 条。

取行文的办法，按文件类型分：

- `.md`：围栏代码块与档首元数据块之外的行，剥掉行内反引号片段。元数据块是第一行 `---` 到下一个 `---`，逐行三条照判。四空格缩进的段落算行文，代码块一律用围栏。
- `whole_line_suffixes`：整行都是给人读的字，例如商店正文。
- `data_suffixes`：整份是数据，不取。
- 源码：`comment_styles` 按后缀或文件名给注释写法，取注释正文。扫描器按整份文件走一遍，跨行的块注释、
  三引号串与模板串各自归位；`.py` 用 `tokenize` 取注释，用 `ast` 取 docstring；`.swift` 用词法器 `swift_tokens`，
  它把源码切成注释、字面量、正文段与插值的记号流，hachimi-ios 的门脚本取同一条记号流。注释里的围栏代码块不取。
  `hash` 写法的井号要求前面是行首或空白；大写标记的 heredoc 正文不当代码扫。
"""

from __future__ import annotations

import ast
import functools
import io
import json
import re
import tokenize
import warnings
from collections.abc import Iterable, Iterator
from dataclasses import dataclass
from pathlib import Path

CONFIG = "prose.json"
IGNORE = "prose-style-ignore"
PROCEDURAL_CAP = 50
LIVING_CAP = 70

# 弯引号算中文语境：弯引号后面接一段插入语时，两侧都不是汉字，只靠汉字判会漏。
CJK = re.compile("[\u3000-\u9fff\uff00-\uffef\u2018\u2019\u201c\u201d]")
HAN = re.compile("[\u3400-\u4dbf\u4e00-\u9fff\uf900-\ufaff]")
DASH = re.compile("[\u2014\u2013]+")
LETTER = re.compile(r"[A-Za-z]")
NUMBER_START = re.compile(r"\.?\d")
BANNED_QUOTES = {"\u300c": "\u201c", "\u300d": "\u201d", "\u300e": "\u2018", "\u300f": "\u2019"}
SIGNATURE = re.compile(r"co-authored-by:\s*claude|generated with \[?claude|\U0001f916 generated", re.I)
STRAIGHT_QUOTE = '"'
COINED_UNIT = re.compile(
    "刀[一二三四五六七八九十甲乙丙丁戊]|刀 ?\\d|刀 [A-Z]\\b|[本每各同别整此]刀|[这那每下上前后同哪]一刀"
    "|第[ 一二三四五六七八九十零\\d]+刀|[两三四五六七八九几]刀|落刀|派刀|回标(?![准签题])")
# 叙事词，七仓一张表。现状里常用的“不再”“原来”“已删”“只因”“那一次”“下一轮”不进表；“从前往后”“从前面”是方位。
# hachimi-ios `.swiftlint.yml` 的 `narrative_comment` 逐字含这一条，由 `narrative_mirrors` 对账。
NARRATIVE = re.compile("此前|原先|曾经|曾写着|已下线|换底[之以]?[前后]|这一版新加|沉淀自|早先|从前(?![往面])|实测过|教训|后续可")
BRACKET_NOTE = re.compile("\u3014")
HEADING_DATE = re.compile("^#{1,6} .*\uff08\\d{4}-\\d{2}")
GLOSSARY_HEADER = ("词", "英文与代码名", "指什么", "不写成")
QUOTED = re.compile("\u201c[^\u201d]*\u201d|\u2018[^\u2019]*\u2019")

FENCE = re.compile(r"^\s{0,3}(`{3,}|~{3,})")
# 注释行首的空白与装饰星号、斜杠，判围栏之前剥掉。
COMMENT_LEAD = re.compile(r"^[\s*/]*")
DOCSTRING_OPEN = re.compile(r"""^[rRbBuUfF]{0,2}('{3}|"{3}|'|")""")
DOCSTRING_CLOSE = re.compile(r"""('{3}|"{3}|'|")$""")
DOCSTRING_HOLDERS = (ast.Module, ast.ClassDef, ast.FunctionDef, ast.AsyncFunctionDef)

ADVICE = ("破折号拆成两句、改前置定语或换冒号；直角引号与 ASCII 直引号都换弯引号；计划单位照术语表“流程”一节写；"
          "叙事改写成现状，经过进 CHANGELOG 与提交说明；术语照术语表写；长句拆成几句，程序文一步一个动作、条件写在前面。")


# ── 配置 ──


@dataclass(frozen=True)
class Rule:
    """本仓规则一条：`where` 取 prose、lines 或 paths，`files` 与 `exclude` 是 glob。"""

    pattern: re.Pattern[str]
    where: str
    files: tuple[str, ...]
    exclude: tuple[str, ...]
    message: str


@dataclass(frozen=True)
class Config:
    """仓根 `prose.json`。七个仓字段相同，缺一个或多一个都报错。路径一律仓根相对，glob 写法见 `compile_glob`。

    - `suffixes`、`names`：扫哪些后缀，以及哪些没有后缀的文件名。
    - `skip_dirs`、`skip_prefixes`：不扫的目录名（任一层）与路径前缀。
    - `skip_files`：整文件豁免，路径到理由。只收整份是外来数据的文件。
    - `frozen_prefixes`：时点记录，只判逐行的前四条。
    - `comment_styles`：后缀或文件名到注释写法，写法见 `STYLES`。
    - `data_suffixes`、`whole_line_suffixes`：整份是数据不取行文；整行都算行文。
    - `living`、`procedural`：活文档与程序文的 glob。程序文也是活文档。
    - `narrative_comments`：判叙事词的注释在哪些文件里。`narrative_extra`：本仓另判的叙事词正则，可为空串。
    - `narrative_mirrors`：逐字含 `NARRATIVE` 正则原文的文件，别的工具拿同一张表判别处。
    - `must_read`、`must_read_total`、`on_demand`、`uncapped`：必读集与按需文档的篇幅上限，不设上限的写理由。
    - `generated`：生成块的起止标记，块里不判行文、不计篇幅。
    - `canon`：定稿句表，逐字重复先抹掉表里的句子；空串表示没有。`glossary`：术语表。
    - `path_mention_files`、`path_mention_roots`：这些文件里反引号包着、以这些前缀开头的仓内路径必须在。
    - `binary_roots`、`binary_allowed`：这些目录下不许入库二进制，允许的前缀除外。
    - `rules`：本仓规则。
    """

    suffixes: frozenset[str]
    names: frozenset[str]
    skip_dirs: frozenset[str]
    skip_prefixes: tuple[str, ...]
    skip_files: dict[str, str]
    frozen_prefixes: tuple[str, ...]
    comment_styles: dict[str, str]
    data_suffixes: frozenset[str]
    whole_line_suffixes: frozenset[str]
    living: tuple[str, ...]
    procedural: tuple[str, ...]
    narrative_comments: tuple[str, ...]
    narrative_extra: str
    narrative_mirrors: tuple[str, ...]
    must_read: dict[str, int]
    must_read_total: int
    on_demand: dict[str, int]
    uncapped: dict[str, str]
    generated: tuple[tuple[str, str], ...]
    canon: str
    glossary: str
    path_mention_files: tuple[str, ...]
    path_mention_roots: tuple[str, ...]
    binary_roots: tuple[str, ...]
    binary_allowed: tuple[str, ...]
    rules: tuple[Rule, ...]


LIST_FIELDS = ("suffixes", "names", "skip_dirs", "skip_prefixes", "frozen_prefixes", "data_suffixes",
               "whole_line_suffixes", "living", "procedural", "narrative_comments", "narrative_mirrors",
               "path_mention_files", "path_mention_roots", "binary_roots", "binary_allowed")
TEXT_MAP_FIELDS = ("skip_files", "comment_styles", "uncapped")
CAP_FIELDS = ("must_read", "on_demand")
TEXT_FIELDS = ("narrative_extra", "canon", "glossary")
FIELDS = (*LIST_FIELDS, *TEXT_MAP_FIELDS, *CAP_FIELDS, *TEXT_FIELDS, "must_read_total", "generated", "rules")
RULE_FIELDS = {"pattern", "in", "files", "except", "message"}
RULE_PLACES = ("prose", "lines", "paths")


class ConfigError(ValueError):
    """`prose.json` 缺字段、多字段或类型不对。"""


def _strings(value: object) -> bool:
    return isinstance(value, list) and all(isinstance(item, str) for item in value)


def _rule(raw: object, index: int) -> Rule:
    if not isinstance(raw, dict) or set(raw) != RULE_FIELDS:
        raise ConfigError(f"rules 第 {index + 1} 条的字段要正好是 {sorted(RULE_FIELDS)}")
    if raw["in"] not in RULE_PLACES or not _strings(raw["files"]) or not _strings(raw["except"]) \
            or not isinstance(raw["pattern"], str) or not isinstance(raw["message"], str) or not raw["files"]:
        raise ConfigError(f"rules 第 {index + 1} 条：in 取 {'、'.join(RULE_PLACES)}，files 非空，pattern 与 message 是字符串")
    return Rule(re.compile(raw["pattern"]), raw["in"], tuple(raw["files"]), tuple(raw["except"]), raw["message"])


def parse_config(data: object) -> Config:
    """校验并换成 `Config`。字段一个不能少，也不能多。"""
    if not isinstance(data, dict):
        raise ConfigError(f"{CONFIG} 的顶层要是一个对象")
    missing = [name for name in FIELDS if name not in data]
    extra = sorted(set(data) - set(FIELDS))
    if missing or extra:
        raise ConfigError(f"{CONFIG} 缺字段 {missing}，多字段 {extra}；七个仓同一套字段")
    for name in LIST_FIELDS:
        if not _strings(data[name]):
            raise ConfigError(f"{name} 要是字符串数组")
    for name in TEXT_MAP_FIELDS:
        if not isinstance(data[name], dict) or not all(isinstance(v, str) and v for v in data[name].values()):
            raise ConfigError(f"{name} 要是字符串到非空字符串的对象")
    for name in CAP_FIELDS:
        if not isinstance(data[name], dict) or not all(isinstance(v, int) and v > 0 for v in data[name].values()):
            raise ConfigError(f"{name} 要是路径到正整数的对象")
    for name in TEXT_FIELDS:
        if not isinstance(data[name], str):
            raise ConfigError(f"{name} 要是字符串")
    if not isinstance(data["must_read_total"], int) or data["must_read_total"] <= 0:
        raise ConfigError("must_read_total 要是正整数")
    if not isinstance(data["generated"], list) or not all(_strings(pair) and len(pair) == 2 for pair in data["generated"]):
        raise ConfigError("generated 要是 [起, 止] 两个字符串一组的数组")
    unknown = sorted(set(data["comment_styles"].values()) - set(STYLES) - {PYTHON, SWIFT})
    if unknown:
        raise ConfigError(f"comment_styles 里有不认识的写法 {unknown}，可选 {sorted([*STYLES, PYTHON, SWIFT])}")
    if not isinstance(data["rules"], list):
        raise ConfigError("rules 要是数组")
    if data["narrative_extra"]:
        re.compile(data["narrative_extra"])
    return Config(
        suffixes=frozenset(data["suffixes"]), names=frozenset(data["names"]), skip_dirs=frozenset(data["skip_dirs"]),
        skip_prefixes=tuple(data["skip_prefixes"]), skip_files=dict(data["skip_files"]),
        frozen_prefixes=tuple(data["frozen_prefixes"]), comment_styles=dict(data["comment_styles"]),
        data_suffixes=frozenset(data["data_suffixes"]), whole_line_suffixes=frozenset(data["whole_line_suffixes"]),
        living=tuple(data["living"]), procedural=tuple(data["procedural"]),
        narrative_comments=tuple(data["narrative_comments"]), narrative_extra=data["narrative_extra"],
        narrative_mirrors=tuple(data["narrative_mirrors"]), must_read=dict(data["must_read"]),
        must_read_total=data["must_read_total"], on_demand=dict(data["on_demand"]), uncapped=dict(data["uncapped"]),
        generated=tuple((pair[0], pair[1]) for pair in data["generated"]), canon=data["canon"],
        glossary=data["glossary"], path_mention_files=tuple(data["path_mention_files"]),
        path_mention_roots=tuple(data["path_mention_roots"]), binary_roots=tuple(data["binary_roots"]),
        binary_allowed=tuple(data["binary_allowed"]),
        rules=tuple(_rule(raw, index) for index, raw in enumerate(data["rules"])))


def load_config(root: Path) -> Config:
    return parse_config(json.loads((root / CONFIG).read_text(encoding="utf-8")))


def compile_glob(pattern: str) -> re.Pattern[str]:
    """glob 换成整串匹配的正则：`*` 与 `?` 不跨 `/`，`**/` 匹配零到多层目录，结尾的 `**` 匹配其下一切。"""
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


_GLOBS: dict[str, re.Pattern[str]] = {}


def matches(path: str, globs: Iterable[str]) -> bool:
    for glob in globs:
        if glob not in _GLOBS:
            _GLOBS[glob] = compile_glob(glob)
        if _GLOBS[glob].match(path):
            return True
    return False


# ── 取行文 ──


@dataclass(frozen=True)
class Style:
    """一种注释写法。`quotes` 是不跨行的串，`long_quotes` 是可以跨行的串。"""

    line: tuple[str, ...] = ()
    block: tuple[str, str] | None = None
    nested: bool = False
    quotes: str = ""
    long_quotes: tuple[str, ...] = ()
    hash_word: bool = False
    heredoc: bool = False
    regex: bool = False
    shell_escapes: bool = False


PYTHON = "python"
SWIFT = "swift"
STYLES = {
    "c": Style(line=("//",), block=("/*", "*/"), quotes="\"'", long_quotes=("`",), regex=True),
    "kotlin": Style(line=("//",), block=("/*", "*/"), nested=True, quotes="\"'", long_quotes=('"""',)),
    "css": Style(block=("/*", "*/"), quotes="\"'"),
    "hash": Style(line=("#",), quotes="\"'", hash_word=True, heredoc=True, shell_escapes=True),
    "sql": Style(line=("--",), quotes="'"),
    "lua": Style(line=("--",), block=("--[[", "]]"), quotes="\"'"),
    "xml": Style(block=("<!--", "-->")),
}
REGEX_BEFORE = set("(,=:[!&|?{};+-*%<>~^")
REGEX_KEYWORDS = {"return", "typeof", "case", "in", "of", "delete", "void", "throw", "new", "else", "do", "yield", "await"}
HEREDOC = re.compile(r"<<[-~]?\s*(['\"]?)([A-Z_][A-Z0-9_]*)\1")


def strip_inline_code(text: str) -> str:
    """剥掉行内反引号片段。反引号里是代码，`buttons["下一个"]` 的引号不是标点。"""
    kept: list[str] = []
    index = 0
    while index < len(text):
        if text[index] != "`":
            kept.append(text[index])
            index += 1
            continue
        ticks = 0
        while index < len(text) and text[index] == "`":
            ticks += 1
            index += 1
        closing = text.find("`" * ticks, index)
        if closing == -1:
            continue  # 这一行没有闭合，后面的当行文
        index = closing + ticks
    return "".join(kept)


class _Scanner:
    """按整份文件走一遍，记下每一行的注释正文。状态：块注释深度、所在的串与它的收尾、待进的 heredoc。"""

    def __init__(self, text: str, style: Style):
        self.text, self.style = text, style
        self.found: dict[int, list[str]] = {}
        self.line = 1

    def note(self, body: str) -> None:
        if body.strip().strip("*").strip():
            self.found.setdefault(self.line, []).append(body)

    def regex_end(self, start: int, last: str, word: str) -> int:
        """`start` 处的斜杠若起一个正则字面量，返回它收尾之后的下标，否则返回 -1。"""
        if last and last not in REGEX_BEFORE and word not in REGEX_KEYWORDS:
            return -1
        index, in_class, text = start + 1, False, self.text
        while index < len(text) and text[index] != "\n":
            char = text[index]
            if char == "\\":
                index += 2
                continue
            if in_class:
                in_class = char != "]"
            elif char == "[":
                in_class = True
            elif char == "/":
                return index + 1
            index += 1
        return -1

    def skip_heredoc(self, index: int, tag: str) -> int:
        """`index` 是 heredoc 正文第一行的开头。跳到收尾那一行的换行符上。"""
        text = self.text
        while index < len(text):
            end = text.find("\n", index)
            end = len(text) if end == -1 else end
            if text[index:end].strip() == tag:
                return end
            if end == len(text):
                return end
            self.line += 1
            index = end + 1
        return index

    def run(self) -> dict[int, str]:
        text, style = self.text, self.style
        index, depth = 0, 0
        closer, escapes, one_line = "", True, True
        last, word, heredoc = "", "", ""
        current: list[str] = []
        while index < len(text):
            char = text[index]
            if char == "\n":
                if depth:
                    self.note("".join(current))
                    current = []
                if closer and one_line:
                    closer = ""
                self.line += 1
                index += 1
                last, word = "", ""
                if heredoc:
                    index = self.skip_heredoc(index, heredoc)
                    heredoc = ""
                continue
            if depth:
                opener, ender = style.block or ("", "")
                if style.nested and text.startswith(opener, index):
                    depth += 1
                    current.append(opener)
                    index += len(opener)
                elif text.startswith(ender, index):
                    depth -= 1
                    index += len(ender)
                    if depth:
                        current.append(ender)
                    else:
                        self.note("".join(current))
                        current = []
                else:
                    current.append(char)
                    index += 1
                continue
            if closer:
                if escapes and char == "\\":
                    index += 1 if text.startswith("\n", index + 1) else 2
                elif text.startswith(closer, index):
                    index += len(closer)
                    closer = ""
                else:
                    index += 1
                continue
            if style.block and text.startswith(style.block[0], index):
                depth = 1
                index += len(style.block[0])
                continue
            marker = next((m for m in style.line if text.startswith(m, index)), None)
            if marker and not (style.hash_word and index and not text[index - 1].isspace()):
                end = text.find("\n", index)
                end = len(text) if end == -1 else end
                self.note(text[index + len(marker):end])
                index = end
                continue
            if style.shell_escapes and char == "\\":
                index += 2 if index + 1 < len(text) and text[index + 1] != "\n" else 1
                continue
            long_quote = next((q for q in style.long_quotes if text.startswith(q, index)), None)
            if long_quote:
                index += len(long_quote)
                closer, escapes, one_line = long_quote, True, False
                continue
            if char in style.quotes:
                closer, escapes, one_line = char, not (style.shell_escapes and char == "'"), True
                index += 1
                continue
            if style.regex and char == "/":
                end = self.regex_end(index, last, word)
                if end != -1:
                    index, last, word = end, "/", ""
                    continue
            if style.heredoc and char == "<":
                opened = HEREDOC.match(text, index)
                if opened:
                    heredoc = opened.group(2)
                    index = opened.end()
                    continue
            if not char.isspace():
                word = word + char if char.isalnum() or char in "_$" else ""
                last = char
            index += 1
        if depth:
            self.note("".join(current))
        return {number: " ".join(parts) for number, parts in self.found.items()}


def comments(text: str, style: str) -> dict[int, str]:
    """→ 行号到这一行的注释正文。"""
    if style == PYTHON:
        return python_comments(text)
    if style == SWIFT:
        return swift_comments(text)
    return _Scanner(text, STYLES[style]).run()


_LITERAL_OPEN = re.compile(r'(#*)("""|")|(#+)/')


def swift_tokens(text: str) -> list[tuple[str, int, int]]:
    r"""Swift 源码按字符走一遍，给出 (种类, 起, 止) 的记号，按起点排好，外层在前。

    种类五样：`comment` 是整段注释，含定界符，块注释可以嵌套；`string` 是整个字符串字面量，含引号与井号；
    `regex` 是 `#/…/#` 整个正则字面量；`text` 是字面量正文的一段，不含定界符与插值；
    `interpolation` 是 `\(…)` 整段，原始串里写作 `\#(…)`。插值里是代码，它里面的注释与字面量照常各成记号。
    单行串与正则到行尾还没闭合就在行尾收口，不吞掉后面整份文件。
    """
    tokens: list[tuple[str, int, int]] = []
    index, length = 0, len(text)
    # 栈元素两种：字面量态 `[种类, 起点, 井号数, 是否三引号, 正文段起点]`，插值态 `["interpolation", 起点, 括号深度]`。
    stack: list[list] = []
    while index < length:
        top = stack[-1] if stack else None
        if top is None or top[0] == "interpolation":
            if text.startswith("//", index):
                stop = text.find("\n", index)
                stop = length if stop < 0 else stop
                tokens.append(("comment", index, stop))
                index = stop
                continue
            if text.startswith("/*", index):
                depth, stop = 1, index + 2
                while stop < length and depth:
                    if text.startswith("/*", stop):
                        depth, stop = depth + 1, stop + 2
                    elif text.startswith("*/", stop):
                        depth, stop = depth - 1, stop + 2
                    else:
                        stop += 1
                tokens.append(("comment", index, stop))
                index = stop
                continue
            opened = _LITERAL_OPEN.match(text, index)
            if opened and opened.group(3):
                stack.append(["regex", index, len(opened.group(3)), False, opened.end()])
                index = opened.end()
                continue
            if opened and (opened.group(1) or text[index] == '"'):
                stack.append(["string", index, len(opened.group(1)), opened.group(2) == '"""', opened.end()])
                index = opened.end()
                continue
            if top is not None:
                if text[index] == "(":
                    top[2] += 1
                elif text[index] == ")":
                    top[2] -= 1
                    if top[2] == 0:
                        stack.pop()
                        tokens.append(("interpolation", top[1], index + 1))
                        stack[-1][4] = index + 1
            index += 1
            continue
        kind, begin, hashes, multiline, run = top
        escape = "\\" + "#" * hashes
        closing = "/" + "#" * hashes if kind == "regex" else ('"""' if multiline else '"') + "#" * hashes
        if kind == "string" and text.startswith(escape + "(", index):
            tokens.append(("text", run, index))
            stack.append(["interpolation", index, 1])
            index += len(escape) + 1
        elif kind == "string" and text.startswith(escape, index):
            index += len(escape) + 1
        elif text.startswith(closing, index):
            tokens.append(("text", run, index))
            index += len(closing)
            tokens.append((kind, begin, index))
            stack.pop()
        elif not multiline and text[index] == "\n":
            tokens.append(("text", run, index))
            tokens.append((kind, begin, index))
            stack.pop()
        else:
            index += 1
    while stack:
        top = stack.pop()
        if top[0] == "interpolation":
            tokens.append(("interpolation", top[1], length))
            continue
        tokens.append(("text", top[4], length))
        tokens.append((top[0], top[1], length))
    return sorted((token for token in tokens if token[2] > token[1]), key=lambda token: (token[1], -token[2]))


def swift_comments(text: str) -> dict[int, str]:
    """`.swift` 的注释正文，取自 `swift_tokens` 的注释记号。行注释去掉 `//`，块注释去掉最外层的 `/*` 与 `*/`。"""
    found: dict[int, list[str]] = {}
    for kind, start, stop in swift_tokens(text):
        if kind != "comment":
            continue
        body = text[start + 2:stop]
        if text.startswith("/*", start) and body.endswith("*/"):
            body = body[:-2]
        number = text.count("\n", 0, start) + 1
        for offset, part in enumerate(body.split("\n")):
            if part.strip().strip("*").strip():
                found.setdefault(number + offset, []).append(part)
    return {number: " ".join(parts) for number, parts in found.items()}


def _char_offset(line: str, byte_offset: int) -> int:
    """`ast` 给的列号是 UTF-8 字节偏移，中文行上要换算成字符下标才切得准。"""
    return len(line.encode("utf-8")[:byte_offset].decode("utf-8", "ignore"))


def python_docstrings(lines: list[str]) -> dict[int, str]:
    """→ 行号到该行 docstring 正文。首尾行剥掉三引号定界符。解不开的文件给空表。"""
    try:
        with warnings.catch_warnings():
            warnings.simplefilter("ignore")  # 串里的无效转义只是告警，与取 docstring 无关
            tree = ast.parse("\n".join(lines))
    except SyntaxError:
        return {}
    found: dict[int, str] = {}
    for node in ast.walk(tree):
        if not isinstance(node, DOCSTRING_HOLDERS):
            continue
        body = getattr(node, "body", [])
        if not body or not isinstance(body[0], ast.Expr):
            continue
        value = body[0].value
        if not isinstance(value, ast.Constant) or not isinstance(value.value, str):
            continue
        if value.end_lineno is None or value.end_col_offset is None:
            continue
        for number in range(value.lineno, value.end_lineno + 1):
            raw = lines[number - 1]
            text = raw
            if number == value.end_lineno:
                text = DOCSTRING_CLOSE.sub("", text[: _char_offset(raw, value.end_col_offset)])
            if number == value.lineno:
                text = DOCSTRING_OPEN.sub("", text[_char_offset(raw, value.col_offset):])
            found[number] = text
    return found


def python_comments(text: str) -> dict[int, str]:
    """`.py` 的注释与 docstring。`tokenize` 解不开的退回井号写法逐行扫。"""
    found: dict[int, str] = {}
    try:
        for token in tokenize.generate_tokens(io.StringIO(text).readline):
            if token.type == tokenize.COMMENT:
                found[token.start[0]] = token.string[1:]
    except (tokenize.TokenError, SyntaxError):
        found = _Scanner(text, STYLES["hash"]).run()
    for number, body in python_docstrings(text.splitlines()).items():
        if body.strip():
            found[number] = f"{body} {found[number]}" if number in found else body
    return found


def generated_rows(lines: list[str], generated: Iterable[tuple[str, str]]) -> set[int]:
    """生成块的行号，起止标记那两行也算。"""
    rows: set[int] = set()
    inside = ""
    for number, line in enumerate(lines, 1):
        stripped = line.strip()
        if not inside:
            inside = next((end for begin, end in generated if stripped == begin), "")
            if inside:
                rows.add(number)
            continue
        rows.add(number)
        if stripped == inside:
            inside = ""
    return rows


def markdown_lines(lines: list[str]) -> Iterator[tuple[int, str]]:
    """围栏代码块与档首元数据块之外的行，原样给出。"""
    start = 0
    if lines and lines[0].strip() == "---":
        start = next((index + 1 for index in range(1, len(lines)) if lines[index].strip() == "---"), 0)
    fence = ""
    for number, line in enumerate(lines[start:], start + 1):
        opened = FENCE.match(line)
        if opened:
            token = opened.group(1)[0]
            fence = "" if fence == token else (fence or token)
            continue
        if not fence:
            yield number, line


def style_of(path: str, config: Config) -> str | None:
    name = path.rsplit("/", 1)[-1]
    return config.comment_styles.get(name) or config.comment_styles.get(Path(name).suffix or name)


def prose_lines(path: str, lines: list[str], config: Config) -> list[tuple[int, str]]:
    """逐行给出这一行里算行文的那一段，已剥行内反引号片段。生成块不在内。"""
    suffix = Path(path).suffix
    if suffix in config.data_suffixes:
        return []
    if suffix in config.whole_line_suffixes:
        return [(number, line) for number, line in enumerate(lines, 1)]
    if suffix == ".md":
        skipped = generated_rows(lines, config.generated)
        return [(number, strip_inline_code(line)) for number, line in markdown_lines(lines) if number not in skipped]
    style = style_of(path, config)
    if style is None:
        return []
    found = comments("\n".join(lines), style)
    rows: list[tuple[int, str]] = []
    fence = ""
    for number in sorted(found):
        opened = FENCE.match(COMMENT_LEAD.sub("", found[number]))
        if opened:
            token = opened.group(1)[0]
            fence = "" if fence == token else (fence or token)
        elif not fence and number <= len(lines):
            rows.append((number, strip_inline_code(found[number])))
    return rows


def message_prose(lines: list[str]) -> list[tuple[int, str]]:
    """commit message 整条都是给人读的字，只剥行内反引号片段。"""
    return [(number, strip_inline_code(line)) for number, line in enumerate(lines, 1)]


# ── 术语表 ──


@dataclass(frozen=True)
class Term:
    word: str
    banned: tuple[str, ...]


def _cells(line: str) -> list[str]:
    return [cell.strip() for cell in line.strip().strip("|").split("|")]


def _clean(cell: str) -> str:
    return cell.replace("`", "").replace("*", "").strip()


def parse_glossary(text: str) -> list[Term] | None:
    """术语表里四列、首列“词”、末列“不写成”的各张表，第二列叫“英文”也算。一张都没有给 None。“不写成”一格用顿号分隔多个词。"""
    terms: list[Term] = []
    found = False
    reading = False
    for line in text.splitlines():
        if not line.lstrip().startswith("|"):
            reading = False
            continue
        cells = _cells(line)
        if len(cells) == len(GLOSSARY_HEADER) and (cells[0], cells[-1]) == (GLOSSARY_HEADER[0], GLOSSARY_HEADER[-1]):
            found = reading = True
            continue
        if not reading or set("".join(cells)) <= set("-: "):
            continue
        cells += [""] * (len(GLOSSARY_HEADER) - len(cells))
        banned = tuple(word for word in (_clean(part) for part in cells[3].split("、")) if word)
        if _clean(cells[0]) and banned:
            terms.append(Term(_clean(cells[0]), banned))
    return terms if found else None


def _blank(match: re.Match[str]) -> str:
    """抹成等长的空字符，后面的列号不错位。"""
    return "\0" * len(match.group())


@dataclass(frozen=True)
class Glossary:
    """术语表编成两条正则。错的写法整个落在一处正确写法里面时不算，例如正确的词里含着错的词。"""

    path: str
    inside: str
    correct: re.Pattern[str] | None
    wrong: re.Pattern[str] | None
    owner: dict[str, str]

    @staticmethod
    def build(path: str, terms: list[Term], inside: str = "") -> Glossary:
        """`path` 是报错里写的路径，`inside` 是术语表在本仓里的仓根相对路径，不在本仓给空串。"""
        def alternation(words: Iterable[str]) -> re.Pattern[str] | None:
            ordered = sorted(set(words), key=len, reverse=True)
            if not ordered:
                return None
            parts = [rf"(?<![A-Za-z0-9_]){re.escape(w)}(?![A-Za-z0-9_])" if w.isascii() else re.escape(w) for w in ordered]
            return re.compile("|".join(parts))
        words = [part for term in terms for part in (_clean(p) for p in term.word.split("、")) if part]
        owner = {bad: term.word for term in terms for bad in term.banned}
        return Glossary(path, inside, alternation(words), alternation(owner), owner)

    def hits(self, text: str) -> Iterator[str]:
        if self.wrong is None:
            return
        masked = QUOTED.sub(_blank, text)
        inside = [found.span() for found in self.correct.finditer(masked)] if self.correct else []
        for match in self.wrong.finditer(masked):
            if any(start <= match.start() and match.end() <= end for start, end in inside):
                continue
            yield f"术语写成“{self.owner[match.group()]}”，不写“{match.group()}”（{self.path}）"


# ── 判据 ──


@dataclass(frozen=True)
class Hit:
    """一处违规：行号加一句说清是哪一条判据、原文长什么样。行号 0 表示整个文件。"""

    line: int
    detail: str


@dataclass(frozen=True)
class Scope:
    """一个文件归哪几条判据管。由 `scope_of` 按配置算。"""

    frozen: bool = False
    narrative: bool = False
    markdown_narrative: bool = False
    terms: bool = False
    sentence_cap: int | None = None


def scope_of(path: str, config: Config, must_read: Iterable[str] = ()) -> Scope:
    if path.startswith(config.frozen_prefixes):
        return Scope(frozen=True)
    living = matches(path, config.living) or matches(path, config.procedural)
    if path.endswith(".md"):
        cap = PROCEDURAL_CAP if matches(path, config.procedural) else LIVING_CAP if living else None
        narrative = living or path in must_read
        return Scope(narrative=narrative, markdown_narrative=narrative, terms=living, sentence_cap=cap)
    code = style_of(path, config) is not None
    return Scope(narrative=code and matches(path, config.narrative_comments), terms=code)


def excerpt(text: str, start: int, end: int, width: int = 16) -> str:
    return text[max(0, start - width):end + width].strip()


def _dash_hits(probe: str) -> Iterator[str]:
    if not CJK.search(probe):
        return
    for match in DASH.finditer(probe):
        left = probe[max(0, match.start() - 1):match.start()]
        right = probe[match.end():match.end() + 2]
        if LETTER.match(left) and LETTER.match(right):
            continue  # 人名与术语的连接号
        if left.isdigit() and NUMBER_START.match(right):
            continue  # 数值与序号区间，右端可以是省掉前导零的小数
        if left and left in "\"'":
            continue  # 字符串开头的装饰横线
        yield f"中文行里的破折号：…{excerpt(probe, match.start(), match.end())}…"


def line_hits(lines: list[str]) -> list[Hit]:
    """前三条，判整行。"""
    hits: list[Hit] = []
    for number, line in enumerate(lines, 1):
        if IGNORE in line:
            continue
        probe = strip_inline_code(line)
        hits.extend(Hit(number, detail) for detail in _dash_hits(probe))
        bad = next((quote for quote in BANNED_QUOTES if quote in probe), None)
        if bad:
            hits.append(Hit(number, f"直角引号 {bad}：中文用国标弯引号 {BANNED_QUOTES[bad]}"))
        if SIGNATURE.search(line):
            hits.append(Hit(number, "第三方署名：产物一律不带署名，整行删掉"))
    return hits


@functools.cache
def narrative_pattern(extra: str) -> re.Pattern[str]:
    return re.compile(f"{NARRATIVE.pattern}|{extra}") if extra else NARRATIVE


def prose_hits(prose: Iterable[tuple[int, str]], lines: list[str], scope: Scope,
               narrative: re.Pattern[str] = NARRATIVE, glossary: Glossary | None = None) -> list[Hit]:
    """第 4 到第 7 条，只判取出来的行文。"""
    hits: list[Hit] = []
    for number, text in prose:
        if IGNORE in lines[number - 1]:
            continue
        if STRAIGHT_QUOTE in text and CJK.search(text):
            column = text.index(STRAIGHT_QUOTE)
            hits.append(Hit(number, f"中文行文里的 ASCII 直引号：…{excerpt(text, column, column + 1)}…"))
        if not scope.frozen and (match := COINED_UNIT.search(text)):
            hits.append(Hit(number, f"自造的计划单位：…{excerpt(text, match.start(), match.end())}…"))
        if scope.narrative:
            match = narrative.search(QUOTED.sub(_blank, text))
            if not match and scope.markdown_narrative:
                match = BRACKET_NOTE.search(text) or HEADING_DATE.match(lines[number - 1])
            if match:
                hits.append(Hit(number, f"叙事“{match.group()[:12]}”：只写现状，经过进 CHANGELOG 与提交说明"))
        if scope.terms and glossary:
            hits.extend(Hit(number, detail) for detail in glossary.hits(text))
    return hits


# 句长：Markdown 段落里哪些行不判、怎么断句、怎么数。
HEADING = re.compile(r"^\s{0,3}#{1,6}(\s|$)")
TABLE_ROW = re.compile(r"^\s*\|")
RULE_LINE = re.compile(r"^\s{0,3}([-*_])(\s*\1){2,}\s*$")
LINK_DEFINITION = re.compile(r"^\s{0,3}\[[^\]]+\]:\s")
LIST_ITEM = re.compile(r"^\s*(?:[-*+]|\d+[.)])\s+")
QUOTE_PREFIX = re.compile(r"^\s*(?:>\s?)+")
INLINE_LINK = re.compile(r"!?\[([^\]]*)\]\([^)]*\)")
REFERENCE_LINK = re.compile(r"\[([^\]]*)\]\[[^\]]*\]")
URL = re.compile(r"<?https?://[^\s>)]*>?")
TAG = re.compile(r"<[^>\n]*>")
TERMINATOR = re.compile(r"[。？！；?!;]|(?<=[A-Za-z])\.(?=\s|$)")
WORD = re.compile("[A-Za-z0-9]+(?:['\u2019][A-Za-z]+)?")


def sentence_length(text: str) -> int:
    """汉字数加英文词数。"""
    return len(HAN.findall(text)) + len(WORD.findall(text))


def _paragraphs(lines: list[str], skipped: set[int]) -> Iterator[list[tuple[int, str]]]:
    """Markdown 的段落与列表项，每段是若干（行号，去掉记号与链接地址的行文）。"""
    paragraph: list[tuple[int, str]] = []
    front = bool(lines) and lines[0].strip() == "---"
    comment = False
    for number, line in markdown_lines(lines):
        if front:
            front = not (number > 1 and line.strip() == "---")
            continue
        if comment or "<!--" in line and "-->" not in line.split("<!--", 1)[1]:
            comment = "-->" not in line if comment else True
            if paragraph:
                yield paragraph
            paragraph = []
            continue
        stripped = QUOTE_PREFIX.sub("", line)
        if (number in skipped or not stripped.strip() or IGNORE in line or HEADING.match(stripped)
                or TABLE_ROW.match(stripped) or RULE_LINE.match(stripped) or LINK_DEFINITION.match(stripped)):
            if paragraph:
                yield paragraph
            paragraph = []
            continue
        item = LIST_ITEM.match(stripped)
        if item:
            if paragraph:
                yield paragraph
            paragraph = []
            stripped = stripped[item.end():]
        text = strip_inline_code(stripped)
        text = TAG.sub(" ", URL.sub(" ", REFERENCE_LINK.sub(r"\1", INLINE_LINK.sub(r"\1", text))))
        paragraph.append((number, text))
    if paragraph:
        yield paragraph


def sentence_hits(lines: list[str], cap: int, generated: Iterable[tuple[str, str]] = ()) -> list[Hit]:
    """第 8 条：超过 `cap` 的句子，报句首所在的行。"""
    hits: list[Hit] = []
    for paragraph in _paragraphs(lines, generated_rows(lines, generated)):
        text = ""
        starts: list[tuple[int, int]] = []
        for number, part in paragraph:
            starts.append((len(text), number))
            text += part + "\n"
        begin = 0
        for end in [match.end() for match in TERMINATOR.finditer(text)] + [len(text)]:
            sentence = text[begin:end]
            length = sentence_length(sentence)
            if length > cap:
                row = max(number for offset, number in starts if offset <= begin + len(sentence) - len(sentence.lstrip()))
                head = sentence.strip().replace("\n", "")
                hits.append(Hit(row, f"句长 {length}，上限 {cap}：{head[:20]}…"))
            begin = end
    return hits


def rule_hits(path: str, lines: list[str], prose: list[tuple[int, str]], rules: Iterable[Rule]) -> list[Hit]:
    """第 9 条。`paths` 规则的命中记在第 0 行。"""
    hits: list[Hit] = []
    for rule in rules:
        if not matches(path, rule.files) or matches(path, rule.exclude):
            continue
        if rule.where == "paths":
            if rule.pattern.search(path):
                hits.append(Hit(0, rule.message))
            continue
        rows = prose if rule.where == "prose" else list(enumerate(lines, 1))
        for number, text in rows:
            if IGNORE in lines[number - 1]:
                continue
            match = rule.pattern.search(text)
            if match:
                hits.append(Hit(number, f"{rule.message}：…{excerpt(text, match.start(), match.end())}…"))
    return hits


def check_file(path: str, text: str, config: Config, scope: Scope, glossary: Glossary | None = None) -> list[Hit]:
    """一个文件的全部违规。`path` 是仓根相对路径。"""
    lines = text.splitlines()
    prose = prose_lines(path, lines, config)
    if glossary and path == glossary.inside:
        glossary = None
    hits = line_hits(lines) + prose_hits(prose, lines, scope, narrative_pattern(config.narrative_extra), glossary)
    if scope.sentence_cap:
        hits += sentence_hits(lines, scope.sentence_cap, config.generated)
    hits += rule_hits(path, lines, prose, config.rules)
    return sorted(hits, key=lambda hit: hit.line)


def check_message(text: str) -> list[Hit]:
    """一条 commit message 的全部违规：前五条。"""
    lines = text.splitlines()
    hits = line_hits(lines) + prose_hits(message_prose(lines), lines, Scope())
    return sorted(hits, key=lambda hit: hit.line)
