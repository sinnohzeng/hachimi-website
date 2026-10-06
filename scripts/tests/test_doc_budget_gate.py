"""文档预算门：按类归属与白名单、类别合计、带起始阈值的单份上限、空转的类、节上限、--tighten 只降不升。"""
import importlib.util
import json
from pathlib import Path
import sys
import tempfile
import unittest

SOURCE = Path(__file__).resolve().parents[1] / "doc-budget-gate.py"
SPEC = importlib.util.spec_from_file_location("doc_budget_gate", SOURCE)
gate = importlib.util.module_from_spec(SPEC)
sys.modules["doc_budget_gate"] = gate
SPEC.loader.exec_module(gate)


def table():
    return {"categories": [
        {"name": "入口", "globs": ["AGENTS.md", "README.md"], "total": 100},
        {"name": "ADR", "globs": ["docs/adr/*.md"], "total": 1_000,
         "files": [{"glob": "docs/adr/[0-9]*.md", "max": 60, "since": {"key": r"^docs/adr/(\d+)-", "from": "0070"}}]},
        {"name": "调研", "globs": ["docs/research/*.md"], "total": 1_000,
         "files": [{"max": 50, "since": {"key": r"^docs/research/(\d{4}-\d{2}-\d{2})-", "from": "2026-10-07"}}]},
        {"name": "能力规约", "globs": ["specs/capabilities/*/spec.md"], "total": 1_000, "files": [{"max": 80}]},
        {"name": "编号规约", "globs": ["specs/[0-9][0-9][0-9]-*/*.md"], "total": 1_000, "headroom": 2_345,
         "files": [{"glob": "specs/*/spec.md", "max": 40, "since": {"key": r"^specs/(\d+)-", "from": "128"}}]},
        {"name": "常驻文档", "globs": ["docs/*.md"], "total": 1_000},
    ]}


SIZES = {
    "AGENTS.md": 50, "README.md": 40,
    "docs/adr/README.md": 100, "docs/adr/0069-old.md": 500, "docs/adr/0070-new.md": 60,
    "docs/research/README.md": 70, "docs/research/2026-10-06-old.md": 400, "docs/research/2026-10-07-new.md": 50,
    "specs/capabilities/cast/spec.md": 80,
    "specs/127-old/spec.md": 300, "specs/127-old/plan.md": 300, "specs/128-new/spec.md": 40,
    "docs/roadmap.md": 30,
}


class GlobTests(unittest.TestCase):
    def test_star_stays_inside_one_directory(self):
        self.assertTrue(gate.matches("docs/roadmap.md", ["docs/*.md"]))
        self.assertFalse(gate.matches("docs/adr/0001-a.md", ["docs/*.md"]))

    def test_double_star_crosses_any_depth_including_none(self):
        self.assertTrue(gate.matches("design/a.md", ["design/**/*.md"]))
        self.assertTrue(gate.matches("design/x/y/z.md", ["design/**/*.md"]))

    def test_character_class_and_negation(self):
        self.assertTrue(gate.matches("specs/128-x/spec.md", ["specs/[0-9][0-9][0-9]-*/*.md"]))
        self.assertFalse(gate.matches("specs/_TEMPLATE/spec.md", ["specs/[0-9][0-9][0-9]-*/*.md"]))
        self.assertTrue(gate.matches("specs/_TEMPLATE/spec.md", ["specs/[!0-9]*/spec.md"]))


class ProblemTests(unittest.TestCase):
    def problems(self, sizes=None, budget=None):
        return gate.problems(budget or table(), dict(SIZES if sizes is None else sizes))

    def test_tree_within_budget_passes(self):
        self.assertEqual(self.problems(), [])

    def test_a_file_outside_every_category_is_red(self):
        sizes = {**SIZES, "docs/review/2026-10-05-ledger.md": 10}
        self.assertEqual(self.problems(sizes), [
            "docs/review/2026-10-05-ledger.md：归不进 doc-budget.json 的任何一类。放到该放的目录，或在表里给它立一类"])

    def test_first_matching_category_wins(self):
        budget = table()
        budget["categories"].insert(0, {"name": "README 先收", "globs": ["**/README.md"], "total": 1_000})
        members, _ = gate.classify(sorted(SIZES), budget["categories"])
        self.assertEqual(members["README 先收"], ["README.md", "docs/adr/README.md", "docs/research/README.md"])

    def test_category_total_over_cap_is_red(self):
        sizes = {**SIZES, "docs/roadmap.md": 1_001}
        self.assertEqual(self.problems(sizes), ["“常驻文档”合计 1,001 字，上限 1,000"])

    def test_numbered_threshold_caps_only_new_specs(self):
        sizes = {**SIZES, "specs/127-old/spec.md": 41, "specs/128-new/spec.md": 41}
        self.assertEqual(self.problems(sizes), ["specs/128-new/spec.md：41 字，“编号规约”单份上限 40"])

    def test_zero_padded_adr_threshold(self):
        sizes = {**SIZES, "docs/adr/0070-new.md": 61}
        self.assertEqual(self.problems(sizes), ["docs/adr/0070-new.md：61 字，“ADR”单份上限 60"])

    def test_dated_threshold_and_files_without_a_key(self):
        sizes = {**SIZES, "docs/research/2026-10-07-new.md": 51}
        self.assertEqual(self.problems(sizes), ["docs/research/2026-10-07-new.md：51 字，“调研”单份上限 50"])
        self.assertEqual(self.problems({**SIZES, "docs/research/README.md": 500}), [])

    def test_cap_without_threshold_covers_the_whole_category(self):
        sizes = {**SIZES, "specs/capabilities/cast/spec.md": 81}
        self.assertEqual(self.problems(sizes), ["specs/capabilities/cast/spec.md：81 字，“能力规约”单份上限 80"])

    def test_an_empty_category_is_red(self):
        sizes = {path: size for path, size in SIZES.items() if not path.startswith("specs/capabilities/")}
        self.assertEqual(self.problems(sizes), ["“能力规约”一类一份都没有：glob 写错了或目录删了，改 glob 或删掉这一类"])


CHANGELOG = """# Changelog

## [Unreleased]

- 一条用户看得见的变化。

### 修复

- 小节不截断这一节。

## [2.1.0] - 2026-10-06

- 已发版的不算。
"""


class SectionTests(unittest.TestCase):
    RULE = {"sections": [{"file": "CHANGELOG.md", "heading": "## [Unreleased]", "cap": 40}]}

    def problems(self, files, rule=None):
        return gate.section_problems(rule or self.RULE, files.get)

    def test_section_runs_to_the_next_heading_of_the_same_level(self):
        body = CHANGELOG.split("## [Unreleased]\n", 1)[1].split("\n## [2.1.0]", 1)[0]
        self.assertEqual(gate.section_size(CHANGELOG, "## [Unreleased]"), len(body))

    def test_within_cap_passes(self):
        self.assertEqual(self.problems({"CHANGELOG.md": CHANGELOG}), [])

    def test_overlong_unreleased_section_is_red(self):
        text = CHANGELOG.replace("- 一条用户看得见的变化。", "- " + "事" * 40)
        self.assertEqual(len(self.problems({"CHANGELOG.md": text})), 1)
        self.assertIn("CHANGELOG.md 的“## [Unreleased]”一节", self.problems({"CHANGELOG.md": text})[0])

    def test_missing_heading_or_file_counts_as_zero(self):
        renamed = {"sections": [{"file": "CHANGELOG.md", "heading": "## [未发布]", "cap": 1}]}
        self.assertEqual(self.problems({"CHANGELOG.md": CHANGELOG}, renamed), [])
        self.assertEqual(self.problems({}), [])


class TightenTests(unittest.TestCase):
    def test_lowers_to_measured_plus_headroom_rounded_up_to_thousands(self):
        budget = table()
        for category in budget["categories"]:
            category["total"] = 10_000
        gate.tighten(budget, SIZES)
        totals = {category["name"]: category["total"] for category in budget["categories"]}
        # 编号规约实测 640，余量写死 2,345，合 2,985 取整到 3,000；其余缺省一成，取整到 1,000。
        self.assertEqual(totals, {"入口": 1_000, "ADR": 1_000, "调研": 1_000, "能力规约": 1_000,
                                  "编号规约": 3_000, "常驻文档": 1_000})

    def test_never_raises(self):
        budget = table()
        gate.tighten(budget, SIZES)
        self.assertEqual(budget["categories"][0]["total"], 100)

    def test_rewrite_keeps_key_order_and_indent(self):
        text = gate.dump(table(), 4)
        self.assertEqual(gate.indent_of(text), 4)
        self.assertEqual(gate.dump(json.loads(text), gate.indent_of(text)), text)
        self.assertEqual(list(json.loads(text)["categories"][1]), ["name", "globs", "total", "files"])


class CopyTests(unittest.TestCase):
    def test_a_sibling_copy_that_drifted_is_red_and_absent_ones_are_skipped(self):
        with tempfile.TemporaryDirectory() as folder:
            parent = Path(folder)
            own = parent / "hachimi-ios" / "scripts" / "doc-budget-gate.py"
            same = parent / "hachimi-android" / "scripts" / "doc-budget-gate.py"
            drifted = parent / "hachimi-orb" / "tools" / "doc-budget-gate.py"
            for path, body in ((own, "a"), (same, "a"), (drifted, "b")):
                path.parent.mkdir(parents=True)
                path.write_text(body, encoding="utf-8")
            self.assertEqual(gate.copy_problems(own, parent),
                             ["hachimi-orb/tools/doc-budget-gate.py：与本份字节不同，七份要同批改"])


if __name__ == "__main__":
    unittest.main()
