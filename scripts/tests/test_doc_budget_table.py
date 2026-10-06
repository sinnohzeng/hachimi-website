"""本仓 doc-budget.json 的坏样本：过程产物与按日期堆的目录归不进任何一类，规约目录只收 spec.md 与 plan.md。"""
import importlib.util
import json
from pathlib import Path
import sys
import unittest

ROOT = Path(__file__).resolve().parents[2]
SPEC = importlib.util.spec_from_file_location("doc_budget_gate", ROOT / "scripts" / "doc-budget-gate.py")
gate = importlib.util.module_from_spec(SPEC)
sys.modules["doc_budget_gate"] = gate
SPEC.loader.exec_module(gate)

TABLE = json.loads((ROOT / "doc-budget.json").read_text(encoding="utf-8"))

PROCESS_ARTIFACTS = [
    "specs/010-new-page/review.md",
    "specs/010-new-page/acceptance.md",
    "docs/research/2026-10-07-landing.md",
    "docs/plan/2026-10-07-site-v5.md",
    "docs/review/2026-10-07-ledger.md",
    "evidence/2026-10-07/README.md",
]


class TableTests(unittest.TestCase):
    def test_process_artifacts_are_orphans(self):
        _, orphans = gate.classify(PROCESS_ARTIFACTS, TABLE["categories"])
        self.assertEqual(orphans, PROCESS_ARTIFACTS)

    def test_a_new_numbered_spec_has_a_home(self):
        members, orphans = gate.classify(["specs/010-new-page/spec.md", "specs/010-new-page/plan.md"],
                                         TABLE["categories"])
        self.assertEqual(orphans, [])
        self.assertEqual(members["编号规约"], ["specs/010-new-page/spec.md", "specs/010-new-page/plan.md"])

    def test_an_overlong_spec_is_red(self):
        sizes = {path: 1 for path in gate.markdown_files(ROOT)}
        sizes["specs/010-new-page/spec.md"] = 8_001
        self.assertIn("specs/010-new-page/spec.md：8,001 字，“编号规约”单份上限 8,000", gate.problems(TABLE, sizes))


if __name__ == "__main__":
    unittest.main()
