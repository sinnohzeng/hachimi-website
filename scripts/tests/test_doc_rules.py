"""文档治理的判据：篇幅与读序对账、活文档逐字重复、链接、路径提及与二进制。合成仓，不读真文档。"""
import sys
import unittest
from pathlib import Path

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import doc_rules  # noqa: E402
import prose_rules  # noqa: E402
from test_prose_rules import BASE  # noqa: E402

AGENTS = """# 入口

## 开工前按序读

1. [宪法](docs/constitution.md)：原则。
2. [能力规约](specs/capabilities/README.md)，跨仓见 [别仓](../other/AGENTS.md)。

一件事写在哪见 [docs/README.md](docs/README.md)。

## 按任务再读

| 要做的事 | 再读 |
| --- | --- |
| 发版 | [版本](docs/versioning.md#发版) |
"""
# 十六个汉字一段，两份里各放一次即红。
SIXTEEN = "门抓逐字照抄改写过的复述它抓不到"
assert len(SIXTEEN) == doc_rules.RUN
CAPS = {"must_read": {"CLAUDE.md": 100, "AGENTS.md": 1_000, "docs/constitution.md": 100},
        "on_demand": {"docs/versioning.md": 100}, "must_read_total": 2_000}


class Repo(unittest.TestCase):
    def setUp(self):
        self.files = {"AGENTS.md": AGENTS, "CLAUDE.md": "@AGENTS.md\n", "docs/constitution.md": "# 宪法\n\n原则。\n",
                      "docs/versioning.md": "# 版本\n", "docs/README.md": "# 索引\n"}

    def config(self, **overrides) -> prose_rules.Config:
        return prose_rules.parse_config({**BASE, **CAPS, **overrides})

    def read(self, name: str) -> str | None:
        return self.files.get(name)


class SizeTests(Repo):
    def test_must_read_set_is_entry_pair_plus_numbered_links_outside_specs_and_other_repos(self):
        self.assertEqual(doc_rules.must_read_set(self.read), ["CLAUDE.md", "AGENTS.md", "docs/constitution.md"])

    def test_repo_without_agents_reads_claude_only(self):
        del self.files["AGENTS.md"]
        self.assertEqual(doc_rules.must_read_set(self.read), ["CLAUDE.md"])

    def test_green_when_budgets_match_read_order(self):
        self.assertEqual(doc_rules.size_problems(self.config(), self.read), [])

    def test_file_over_its_cap_is_red_and_generated_blocks_do_not_count(self):
        self.files["docs/constitution.md"] = "字" * 101
        self.assertEqual(doc_rules.size_problems(self.config(), self.read), ["docs/constitution.md：101 字符，上限 100"])
        self.files["docs/constitution.md"] = "<!-- index:begin -->\n" + "字" * 101 + "\n<!-- index:end -->\n"
        self.assertEqual(doc_rules.size_problems(self.config(), self.read), [])

    def test_total_over_cap_is_red(self):
        found = doc_rules.size_problems(self.config(must_read_total=50), self.read)
        self.assertTrue(found[-1].startswith("必读集合计"), found)

    def test_read_order_and_must_read_mismatch_is_red(self):
        self.files["AGENTS.md"] = AGENTS.replace("1. [宪法]", "1. [约定](docs/working-agreement.md)、[宪法]")
        self.files["docs/working-agreement.md"] = "约定\n"
        self.assertIn("docs/working-agreement.md：在读序里，prose.json 的 must_read 缺这一行",
                      doc_rules.size_problems(self.config(), self.read))
        self.files["AGENTS.md"] = AGENTS.replace("1. [宪法](docs/constitution.md)：原则。\n", "")
        self.assertIn("docs/constitution.md：prose.json 的 must_read 有这一行，读序里没有",
                      doc_rules.size_problems(self.config(), self.read))

    def test_trigger_table_link_needs_a_cap_or_a_reason(self):
        self.assertEqual(len(doc_rules.size_problems(self.config(on_demand={}), self.read)), 1)
        reasoned = self.config(on_demand={}, uncapped={"docs/versioning.md": "生成的索引"})
        self.assertEqual(doc_rules.size_problems(reasoned, self.read), [])

    def test_capped_or_uncapped_file_that_is_gone_is_red(self):
        del self.files["docs/versioning.md"]
        self.assertIn("docs/versioning.md：上限表里有，文件不在", doc_rules.size_problems(self.config(), self.read))
        found = doc_rules.size_problems(self.config(uncapped={"docs/gone.md": "理由"}), self.read)
        self.assertIn("docs/gone.md：uncapped 里有，文件不在", found)


class DuplicateTests(Repo):
    def problems(self, first, second, **overrides):
        self.files.update({"docs/a.md": first, "docs/b.md": second})
        return doc_rules.duplicate_problems(self.config(**overrides), self.read, ["docs/a.md", "docs/b.md"])

    def test_sixteen_identical_han_across_two_files_is_red(self):
        found = self.problems(f"# 甲\n\n{SIXTEEN}。\n", f"# 乙\n\n前文\n\n{SIXTEEN}\n")
        self.assertEqual(found, [f"docs/a.md:3 与 docs/b.md:5 有 16 字逐字相同“{SIXTEEN}”"])

    def test_fifteen_is_green(self):
        self.assertEqual(self.problems(SIXTEEN[:15], SIXTEEN[:15]), [])

    def test_punctuation_whitespace_and_link_targets_do_not_hide_a_copy(self):
        linked = "门抓逐字照抄，[改写过的复述](https://example.com/x)它\n抓不到"
        self.assertEqual(len(self.problems(SIXTEEN, linked)), 1)

    def test_letters_digits_code_ignored_lines_and_generated_blocks_break_a_run(self):
        self.assertEqual(self.problems(SIXTEEN, SIXTEEN[:8] + " `make` " + SIXTEEN[8:]), [])
        self.assertEqual(self.problems(SIXTEEN, f"{SIXTEEN} <!-- prose-style-ignore：定稿句 -->"), [])
        self.assertEqual(self.problems(SIXTEEN, f"<!-- index:begin -->\n{SIXTEEN}\n<!-- index:end -->\n"), [])
        self.assertEqual(self.problems(SIXTEEN, f"```\n{SIXTEEN}\n```\n"), [])
        self.assertEqual(self.problems(SIXTEEN, f"{SIXTEEN[:8]}\n\n```\nx\n```\n{SIXTEEN[8:]}"), [])

    def test_one_long_copy_is_reported_once(self):
        longer = SIXTEEN + "再接一段不重样的话凑成一句更长的"
        self.assertEqual(len(self.problems(longer, longer)), 1)

    def test_canon_sentence_is_masked(self):
        self.files["docs/copy-canon.md"] = ("## 句子\n\n| 编号 | 名字 | 简体 | 繁體 | English |\n"
                                            "| --- | --- | --- | --- | --- |\n"
                                            "| C1 | 口号 | 慌的时候，先起一卦。 | 慌的時候，先起一卦。 | x |\n")
        quoted = "首屏写八字“慌的时候，先起一卦。”再写六个"
        self.assertEqual(self.problems(quoted, quoted, canon="docs/copy-canon.md"), [])
        self.assertEqual(len(self.problems(quoted, quoted)), 1)


class LinkTests(unittest.TestCase):
    KNOWN = doc_rules.known_paths(["docs/a.md", "docs/adr/0001-x.md", "specs/001-a/spec.md"])

    def problems(self, text: str) -> list[str]:
        return doc_rules.link_problems("docs/a.md", text, self.KNOWN)

    def test_tracked_files_and_directories_resolve(self):
        text = "[甲](adr/0001-x.md#决策) [乙](../specs/001-a/) [丙](./a.md) ![图](adr/0001-x.md)\n[定义]: adr/0001-x.md\n"
        self.assertEqual(self.problems(text), [])

    def test_missing_target_is_red_with_its_line(self):
        self.assertEqual(self.problems("前文\n[甲](adr/0002-y.md)\n"), ["docs/a.md:2 链接指不到入库的文件：adr/0002-y.md"])

    def test_anchors_urls_absolute_cross_repo_and_code_are_skipped(self):
        text = ("[a](#小节) [b](https://x.example) [c](/abs) [d](../../hachimi-engine/x.md) [e](mailto:a@b.c)\n"
                "`[f](nope.md)`\n```\n[g](nope.md)\n```\n[^1]: 脚注\n")
        self.assertEqual(self.problems(text), [])

    def test_path_mentions_must_be_tracked(self):
        text = "跑 `docs/adr/0001-x.md`、`docs/adr/`、`specs/<编号>/` 与 `docs/gone.md`；`docs/x.md`](a) 是链接文字\n"
        found = doc_rules.mention_problems("AGENTS.md", text, ("docs/", "specs/"), self.KNOWN)
        self.assertEqual(found, ["AGENTS.md:1 提到的路径不在库里：docs/gone.md"])


class BinaryTests(Repo):
    def test_binaries_under_roots_are_red_except_allowed(self):
        blobs = {"docs/shot.png": b"\x89PNG\r\n\x1a\n\0", "docs/legal/signed.pdf": b"%PDF\0\xff",
                 "docs/a.md": "正文".encode(), "App/icon.png": b"\0"}
        cfg = self.config(binary_roots=["docs/", "specs/"], binary_allowed=["docs/legal/"])
        found = doc_rules.binary_problems(cfg, sorted(blobs), blobs.__getitem__)
        self.assertEqual(found, ["docs/shot.png 是二进制：截图与录屏看过即删，结论写进文字"])


if __name__ == "__main__":
    unittest.main()
