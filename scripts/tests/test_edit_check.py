"""单文件快检：行文判据逐行回 HARD，改 `.md` 时篇幅、逐字重复与链接只报与它有关的，不在扫描范围与仓外的文件不判，
hachimi-ios 缺席时回一条 WARN。"""
import importlib.util
import json
import sys
import tempfile
import types
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(HERE))
from test_prose_rules import BASE  # noqa: E402


def load():
    spec = importlib.util.spec_from_file_location("edit_check", HERE / "edit-check.py")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


check = load()
SHARED = "这一句足足有十六个汉字以上并且两份文档逐字相同"
DASHED = "中文" + "\u2014" * 2 + "插入语"


class EditCheckTests(unittest.TestCase):
    def setUp(self):
        folder = tempfile.TemporaryDirectory()
        self.addCleanup(folder.cleanup)
        self.root = Path(folder.name)
        overrides = {"on_demand": {"docs/a.md": 60}}
        (self.root / "prose.json").write_text(json.dumps({**BASE, **overrides}), encoding="utf-8")
        (self.root / "docs").mkdir()
        self.missing = False
        real = check.prose_gate()
        stub = types.SimpleNamespace(
            IOS=real.IOS, scanned=real.scanned, ios_missing=lambda root: self.missing,
            listing=lambda root: sorted(p.relative_to(root).as_posix() for p in root.rglob("*") if p.is_file()),
            load_glossary=lambda root, config: (None, []))
        original = check.prose_gate
        check.prose_gate = lambda: stub
        self.addCleanup(setattr, check, "prose_gate", original)

    def write(self, name: str, text: str) -> None:
        (self.root / name).write_text(text, encoding="utf-8")

    def test_clean_file_says_nothing(self):
        self.write("docs/a.md", "# 甲\n\n一句现状。\n")
        self.assertEqual(check.prose_lines(self.root, ["docs/a.md"]), [])

    def test_line_rules_come_back_as_hard_with_file_and_line(self):
        self.write("docs/a.md", f"# 甲\n\n{DASHED}。\n")
        lines = check.prose_lines(self.root, ["docs/a.md"])
        self.assertEqual(len(lines), 1)
        self.assertTrue(lines[0].startswith("HARD\tdocs/a.md:3 "))

    def test_markdown_also_gets_size_duplicate_and_link_checks_about_itself(self):
        self.write("docs/a.md", f"# 甲\n\n{SHARED}。\n\n[链](nowhere.md)\n" + "字" * 40 + "\n")
        self.write("docs/b.md", f"# 乙\n\n{SHARED}。\n")
        joined = "\n".join(check.prose_lines(self.root, ["docs/a.md"]))
        self.assertIn("上限 60", joined)
        self.assertIn("逐字相同", joined)
        self.assertIn("nowhere.md", joined)

    def test_out_of_scope_and_outside_files_are_skipped(self):
        self.write("docs/a.png", DASHED)
        self.assertEqual(check.prose_lines(self.root, ["docs/a.png"]), [])
        self.assertEqual(check.prose_lines(self.root, []), [])

    def test_missing_ios_sibling_is_a_warning(self):
        self.missing = True
        self.write("docs/a.md", f"{DASHED}。\n")
        lines = check.prose_lines(self.root, ["docs/a.md"])
        self.assertEqual(len(lines), 1)
        self.assertTrue(lines[0].startswith("WARN\t"))


if __name__ == "__main__":
    unittest.main()
