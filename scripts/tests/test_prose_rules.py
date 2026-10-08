"""行文门逐文件的判据：逐行三条、取行文、直引号、计划单位、叙事词、术语、句长与本仓规则。合成文本，不读真文件。"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import prose_rules  # noqa: E402

EM = "\u2014"
CORNER = "\u300c"
OPEN, CLOSE = "“", "”"
BASE = {
    "suffixes": [".md", ".swift", ".kt", ".ts", ".py", ".sh", ".xml", ".txt", ".json"],
    "names": ["Makefile"],
    "skip_dirs": [],
    "skip_prefixes": [],
    "skip_files": {},
    "frozen_prefixes": ["docs/adr/", "CHANGELOG.md"],
    "comment_styles": {".swift": "swift", ".kt": "kotlin", ".ts": "c", ".py": "python", ".sh": "hash",
                       ".xml": "xml", "Makefile": "hash"},
    "data_suffixes": [".json"],
    "whole_line_suffixes": [".txt"],
    "living": ["AGENTS.md", "docs/*.md"],
    "procedural": ["docs/playbooks/*.md"],
    "narrative_comments": ["scripts/**", "Makefile"],
    "narrative_extra": "",
    "narrative_mirrors": [],
    "must_read": {},
    "must_read_total": 1,
    "on_demand": {},
    "uncapped": {},
    "generated": [["<!-- index:begin -->", "<!-- index:end -->"]],
    "canon": "",
    "glossary": "docs/glossary.md",
    "path_mention_files": [],
    "path_mention_roots": [],
    "binary_roots": [],
    "binary_allowed": [],
    "rules": [],
}
GLOSSARY = """# 术语表

| 词 | 英文与代码名 | 指什么 | 不写成 |
| --- | --- | --- | --- |
| 金样 | golden、`Golden` | 对拍用的标准输出 | 金标、黄金样本 |
| 能力规约 | capability spec | 一个能力的现状 | 能力规格 |
| 起卦法 | casting method | 对用户开放的起卦方法 | 起卦法门 |

## 流程

| 词 | 英文 | 指什么 | 不写成 |
| --- | --- | --- | --- |
| 门 | gate | 机器强制的检查 | 门禁 |
"""


def config(**overrides) -> prose_rules.Config:
    return prose_rules.parse_config({**BASE, **overrides})


def details(path: str, text: str, cfg: prose_rules.Config | None = None, must_read=(), glossary=None) -> list[str]:
    cfg = cfg or config()
    scope = prose_rules.scope_of(path, cfg, must_read)
    return [hit.detail for hit in prose_rules.check_file(path, text, cfg, scope, glossary)]


def comment_rows(path: str, text: str) -> dict[int, str]:
    return dict(prose_rules.prose_lines(path, text.splitlines(), config()))


def swift_kinds(text: str) -> list[tuple[str, str]]:
    return [(kind, text[start:stop]) for kind, start, stop in prose_rules.swift_tokens(text)]


class LineRules(unittest.TestCase):
    def test_dash_in_a_chinese_line_is_red(self):
        self.assertEqual(len(details("README.md", f"门{EM}判据\n")), 1)

    def test_ascii_hyphen_ranges_names_and_english_lines_pass(self):
        text = f"区间 3{EM}21，名字 Fliegel{EM}Van，约 .31{EM}.33 秒\nan English line {EM} here\n2-5 天\n"
        self.assertEqual(details("README.md", text), [])
        self.assertEqual(details("App/A.swift", f'let a = "{EM}横线"\n'), [])

    def test_dash_inside_inline_code_passes(self):
        self.assertEqual(details("README.md", f"用 `a{EM}b` 写法\n"), [])

    def test_corner_quote_and_signature_are_red_anywhere(self):
        self.assertEqual(len(details("a.json", f'{{"k": "{CORNER}"}}\n')), 1)
        signature = "Co-Authored-By: " + "Claude <x@example.test>"
        self.assertEqual(len(details("README.md", f"`{signature}`\n")), 1)

    def test_ignore_marker_skips_the_line(self):
        self.assertEqual(details("README.md", f"门{EM}判据 <!-- prose-style-ignore：判据样例 -->\n"), [])


class ProseExtraction(unittest.TestCase):
    def test_markdown_skips_fences_and_inline_code(self):
        rows = comment_rows("docs/a.md", '正文\n```\n代码 "x"\n```\n用 `"x"` 写\n')
        self.assertEqual(rows, {1: "正文", 5: "用  写"})

    def test_markdown_front_matter_is_metadata(self):
        rows = comment_rows("docs/a.md", '---\n{"title": "标题"}\n---\n正文 "x"\n')
        self.assertEqual(rows, {4: '正文 "x"'})
        self.assertEqual(len(details("docs/a.md", f'---\n{{"title": "标{EM}题"}}\n---\n')), 1)

    def test_swift_block_comments_nest_and_span_lines(self):
        text = "/* 外层\n /* 内层 */\n 外层尾 */\nlet a = 1 // 行尾\n"
        self.assertEqual(sorted(comment_rows("App/A.swift", text)), [1, 2, 3, 4])

    def test_swift_strings_hide_comment_markers(self):
        text = 'let a = #"他说"// 不是注释"#\nlet b = """\n// 串里\n"""\nlet c = "x // y" // 真注释\n'
        self.assertEqual(comment_rows("App/A.swift", text), {5: " 真注释"})

    def test_swift_interpolation_is_code_and_its_comments_count(self):
        text = 'let a = "外 \\(f("// 串里")) 尾" // 行尾\nlet b = #"x \\#(g(/* 插值里的注释 */ 1)) y"#\n'
        self.assertEqual(comment_rows("App/A.swift", text), {1: " 行尾", 2: " 插值里的注释 "})

    def test_swift_tokens_frame_literals_text_and_interpolation(self):
        text = 'f(#"甲"#, "乙\\(x)丙") // 注\n'
        self.assertEqual(swift_kinds(text), [("string", '#"甲"#'), ("text", "甲"), ("string", '"乙\\(x)丙"'),
                                             ("text", "乙"), ("interpolation", "\\(x)"), ("text", "丙"),
                                             ("comment", "// 注")])

    def test_swift_tokens_nested_block_comment_is_one_token(self):
        text = "/* 外 /* 内 */ 仍是注释 */ let x = 1\n"
        self.assertEqual(swift_kinds(text), [("comment", "/* 外 /* 内 */ 仍是注释 */")])

    def test_swift_tokens_comment_markers_inside_literals_are_text(self):
        self.assertEqual(swift_kinds('let u = "https://a.b/*c*/"\n'),
                         [("string", '"https://a.b/*c*/"'), ("text", "https://a.b/*c*/")])

    def test_swift_tokens_multiline_string_spans_lines(self):
        text = 'let a = """\n第一行 "引"\n"""\nlet b = 1 // 注释\n'
        self.assertEqual([kind for kind, _ in swift_kinds(text)], ["string", "text", "comment"])

    def test_swift_extended_regex_is_a_literal(self):
        text = 'let r = #/"(\\w+)"//#  // 注释\n'
        self.assertEqual(comment_rows("App/A.swift", text), {1: " 注释"})
        self.assertEqual(swift_kinds(text)[0], ("regex", '#/"(\\w+)"//#'))

    def test_kotlin_kdoc_spans_lines(self):
        text = '/**\n * 第一行\n * 第二行\n */\nval s = """\n// 串\n"""\n'
        self.assertEqual(sorted(comment_rows("a/B.kt", text)), [2, 3])

    def test_javascript_regex_and_template_literals(self):
        text = "const r = /[\"']/g; // 注释一\nconst t = `\n// 串里\n`;\nconst d = a / b; // 注释二\n"
        self.assertEqual(sorted(comment_rows("src/a.ts", text)), [1, 5])

    def test_shell_hash_rules_and_heredoc(self):
        text = 'n=${#arr[@]}  # 注释\necho "#不是"\ncat <<EOF\n# 正文\nEOF\n# 收尾\n'
        self.assertEqual(sorted(comment_rows("scripts/a.sh", text)), [1, 6])

    def test_python_comments_and_docstrings(self):
        text = '"""档头。\n\n第二段。\n"""\nx = "# 不是"  # 注释\n'
        rows = comment_rows("scripts/a.py", text)
        self.assertEqual(sorted(rows), [1, 3, 5])
        self.assertEqual(rows[1], "档头。")

    def test_fenced_code_inside_comments_is_not_prose(self):
        text = '"""输出：\n\n```json\n{"名": "值"}\n```\n收尾。\n"""\n'
        self.assertEqual(sorted(comment_rows("scripts/a.py", text)), [1, 6])
        text = '/**\n * 例：\n * ```ts\n * f("值")\n * ```\n */\n'
        self.assertEqual(sorted(comment_rows("src/a.ts", text)), [2])

    def test_xml_comment_spans_lines(self):
        text = '<a>\n  <!-- 第一行\n  第二行 -->\n  <b c="d"/>\n</a>\n'
        self.assertEqual(sorted(comment_rows("res/a.xml", text)), [2, 3])

    def test_data_files_give_nothing_and_text_files_give_whole_lines(self):
        self.assertEqual(comment_rows("a.json", '{"k": "值"}\n'), {})
        self.assertEqual(comment_rows("notes.txt", '一行 "x"\n'), {1: '一行 "x"'})


class StraightQuoteAndCoinedUnit(unittest.TestCase):
    def test_straight_quote_in_comment_is_red_and_in_code_is_not(self):
        self.assertEqual(details("App/A.swift", 'let a = "按钮" // 点 "确定"\n'), [details("App/A.swift", '// 点 "确定"\n')[0]])
        self.assertEqual(details("App/A.swift", 'let a = "按钮"\n'), [])

    def test_coined_unit_is_red_except_in_frozen_files(self):
        unit = "刀"
        self.assertEqual(len(details("docs/a.md", f"这一{unit}做完\n")), 1)
        self.assertEqual(details("docs/adr/0001-a.md", f"这一{unit}做完\n"), [])

    def test_words_that_only_contain_the_coined_unit_pass(self):
        self.assertEqual(details("docs/a.md", "重排回标准排法，退回标签栏。\n"), [])


class Narrative(unittest.TestCase):
    WORD = "此前"

    def test_comments_in_scope_are_red_and_out_of_scope_are_not(self):
        self.assertEqual(len(details("scripts/a.sh", f"# {self.WORD}这样跑\n")), 1)
        self.assertEqual(len(details("Makefile", f"# {self.WORD}这样跑\nall:\n")), 1)
        self.assertEqual(details("App/A.swift", f"// {self.WORD}这样跑\n"), [])

    def test_living_and_must_read_markdown_are_red(self):
        self.assertEqual(len(details("docs/a.md", f"{self.WORD}写在别处。\n")), 1)
        self.assertEqual(len(details("docs/claude-memory/handoff.md", f"{self.WORD}写在别处。\n",
                                     must_read={"docs/claude-memory/handoff.md"})), 1)
        self.assertEqual(details("specs/001-a/spec.md", f"{self.WORD}写在别处。\n"), [])

    def test_bracket_note_and_dated_heading_in_markdown(self):
        text = "## 发版（2026-10-04）\n\n正文\u3014注\u3015。\n"
        self.assertEqual(len(details("docs/a.md", text)), 2)

    def test_present_tense_and_direction_words_pass(self):
        self.assertEqual(details("docs/a.md", "不再涨就算画稳了，原来的值留着，从前往后扫，下一轮查询再建。\n"), [])
        self.assertEqual(details("docs/a.md", "语言换过就重跑，2.1 及以前那一格照读，已存的那一版留着。\n"), [])

    def test_quoted_ui_text_is_not_judged(self):
        self.assertEqual(details("docs/a.md", f"页末一节叫{OPEN}这一位{self.WORD}问过的同类事{CLOSE}。\n"), [])

    def test_incident_words_are_red(self):
        for word in ("实测过", "教训", "后续可", "0.4 那版", "踩过"):
            with self.subTest(word=word):
                self.assertEqual(len(details("scripts/a.py", f"# {word}这样\n")), 1)

    def test_extra_words_apply_where_narrative_applies(self):
        cfg = config(narrative_extra="口径已变")
        self.assertEqual(len(details("docs/a.md", "口径已变。\n", cfg)), 1)
        self.assertEqual(details("specs/001-a/spec.md", "口径已变。\n", cfg), [])

    def test_commit_message_is_not_judged_on_narrative(self):
        self.assertEqual(prose_rules.check_message(f"fix: {self.WORD}漏了一格\n"), [])


class Terms(unittest.TestCase):
    def setUp(self):
        self.glossary = prose_rules.Glossary.build("docs/glossary.md", prose_rules.parse_glossary(GLOSSARY),
                                                   "docs/glossary.md")

    def test_parse_reads_the_table_with_the_fixed_header(self):
        terms = prose_rules.parse_glossary(GLOSSARY)
        self.assertEqual([(t.word, t.banned) for t in terms],
                         [("金样", ("金标", "黄金样本")), ("能力规约", ("能力规格",)), ("起卦法", ("起卦法门",)), ("门", ("门禁",))])
        self.assertIsNone(prose_rules.parse_glossary("| 词 | 释义 |\n| --- | --- |\n| a | b |\n"))

    def test_banned_word_in_living_doc_and_comment_is_red(self):
        found = details("docs/a.md", "对一下金标。\n", glossary=self.glossary)
        self.assertEqual(found, [f"术语写成{OPEN}金样{CLOSE}，不写{OPEN}金标{CLOSE}（docs/glossary.md）"])
        self.assertEqual(len(details("App/A.swift", "// 能力规格\n", glossary=self.glossary)), 1)

    def test_correct_word_code_frozen_and_the_glossary_itself_pass(self):
        self.assertEqual(details("docs/a.md", "金样与能力规约。用 `金标` 举例。\n", glossary=self.glossary), [])
        self.assertEqual(details("docs/adr/0001-a.md", "金标。\n", glossary=self.glossary), [])
        self.assertEqual(details("specs/001-a/spec.md", "金标。\n", glossary=self.glossary), [])
        self.assertEqual(details("docs/glossary.md", GLOSSARY, glossary=self.glossary), [])
        self.assertEqual(details("App/A.swift", 'let a = "金标"\n', glossary=self.glossary), [])

    def test_quoted_words_pass_and_a_banned_word_holding_a_correct_one_is_red(self):
        self.assertEqual(details("docs/a.md", f"界面上写着{OPEN}金标{CLOSE}两个字。\n", glossary=self.glossary), [])
        self.assertEqual(len(details("docs/a.md", "起卦法门只有一个。\n", glossary=self.glossary)), 1)


class SentenceLength(unittest.TestCase):
    def sentence(self, length: int) -> str:
        return "字" * length + "。"

    def test_living_cap(self):
        self.assertEqual(details("docs/a.md", self.sentence(prose_rules.LIVING_CAP) + "\n"), [])
        found = details("docs/a.md", self.sentence(prose_rules.LIVING_CAP + 1) + "\n")
        self.assertEqual(found, [f"句长 {prose_rules.LIVING_CAP + 1}，上限 {prose_rules.LIVING_CAP}：{'字' * 20}…"])

    def test_procedural_cap(self):
        self.assertEqual(details("docs/playbooks/a.md", self.sentence(prose_rules.PROCEDURAL_CAP) + "\n"), [])
        self.assertEqual(len(details("docs/playbooks/a.md", self.sentence(prose_rules.PROCEDURAL_CAP + 1) + "\n")), 1)

    def test_english_words_count_and_code_links_do_not(self):
        text = "字" * 60 + " one two three four five six seven eight nine ten eleven"
        self.assertEqual(len(details("docs/a.md", text + "\n")), 1)
        text = "字" * 60 + " `one two three four five six seven eight nine ten eleven` [链](https://a.example/b/c/d)"
        self.assertEqual(details("docs/a.md", text + "\n"), [])

    def test_lines_join_into_a_paragraph_and_list_items_split_it(self):
        self.assertEqual(len(details("docs/a.md", "字" * 40 + "\n" + "字" * 40 + "。\n")), 1)
        self.assertEqual(details("docs/a.md", "- " + "字" * 40 + "\n- " + "字" * 40 + "\n"), [])

    def test_headings_tables_frozen_generated_and_non_living_are_not_judged(self):
        long = "字" * 100
        self.assertEqual(details("docs/a.md", f"# {long}\n\n| {long} | x |\n"), [])
        self.assertEqual(details("docs/adr/0001-a.md", long + "\n"), [])
        self.assertEqual(details("docs/a.md", f"<!-- index:begin -->\n{long}\n<!-- index:end -->\n"), [])
        self.assertEqual(details("specs/001-a/spec.md", long + "\n"), [])


class RepoRules(unittest.TestCase):
    def rule(self, where: str, files: list[str], exclude: list[str] | None = None) -> prose_rules.Config:
        return config(rules=[{"pattern": r"(?<![\w.-])r\d{2}(?!\d)", "in": where, "files": files,
                              "except": exclude or [], "message": "退场的计划编号"}])

    def test_prose_rule_judges_comments_only(self):
        cfg = self.rule("prose", ["**/*.kt"])
        self.assertEqual(details("a/A.kt", "// 见 r05\nval r05 = 1\n", cfg), [f"退场的计划编号：…见 r05…"])

    def test_lines_rule_judges_code_too_and_except_wins(self):
        cfg = self.rule("lines", ["**/*.kt"], ["a/Skip.kt"])
        self.assertEqual(len(details("a/A.kt", "val r05 = 1\n", cfg)), 1)
        self.assertEqual(details("a/Skip.kt", "val r05 = 1\n", cfg), [])

    def test_paths_rule_judges_the_path(self):
        cfg = config(rules=[{"pattern": "(^|/)_archive/", "in": "paths", "files": ["**"], "except": [],
                             "message": "归档目录不入库"}])
        self.assertEqual(details("specs/_archive/a.md", "正文\n", cfg), ["归档目录不入库"])

    def test_ignore_marker_skips_rule_hits(self):
        cfg = self.rule("prose", ["**/*.kt"])
        self.assertEqual(details("a/A.kt", "// r05  prose-style-ignore：判据样例\n", cfg), [])


class CommitMessage(unittest.TestCase):
    def test_first_five_rules_apply(self):
        self.assertEqual(len(prose_rules.check_message(f"feat: 列表{EM}分节\n")), 1)
        self.assertEqual(len(prose_rules.check_message('feat: 按 "首字母" 分节\n')), 1)
        self.assertEqual(len(prose_rules.check_message("feat: 这一刀做完\n")), 1)
        self.assertEqual(prose_rules.check_message("feat: 按首字母分节\n\n正文写清为什么。\n"), [])


if __name__ == "__main__":
    unittest.main()
