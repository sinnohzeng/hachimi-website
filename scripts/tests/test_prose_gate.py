"""行文门的入口：配置的字段与类型、配置空转、扫哪些文件、七份副本逐字节比对、术语表在不在、commit message 入口。"""
import contextlib
import importlib.util
import io
import json
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(HERE))
import prose_rules  # noqa: E402
from test_prose_rules import BASE, config, details  # noqa: E402


def load(name: str):
    spec = importlib.util.spec_from_file_location(name.replace("-", "_"), HERE / f"{name}.py")
    module = importlib.util.module_from_spec(spec)
    sys.modules[spec.name] = module
    spec.loader.exec_module(module)
    return module


gate = load("check-prose-style")
commit_gate = load("commit-msg-style-gate")


class ConfigTests(unittest.TestCase):
    def test_every_field_is_required_and_no_other(self):
        for name in ("rules", "glossary", "must_read"):
            with self.subTest(name=name), self.assertRaises(prose_rules.ConfigError):
                prose_rules.parse_config({key: value for key, value in BASE.items() if key != name})
        with self.assertRaises(prose_rules.ConfigError):
            prose_rules.parse_config({**BASE, "extra": 1})

    def test_types_styles_and_rules_are_checked(self):
        bad = [{"suffixes": ".md"}, {"must_read": {"a.md": 0}}, {"comment_styles": {".x": "nope"}},
               {"skip_files": {"a": ""}}, {"generated": [["only-one"]]},
               {"rules": [{"pattern": "x", "in": "everywhere", "files": ["**"], "except": [], "message": "m"}]},
               {"rules": [{"pattern": "x", "in": "prose", "files": [], "except": [], "message": "m"}]}]
        for override in bad:
            with self.subTest(override=override), self.assertRaises(prose_rules.ConfigError):
                prose_rules.parse_config({**BASE, **override})

    def test_this_repo_config_parses(self):
        root = gate.repo_root()
        self.assertIsInstance(prose_rules.load_config(root), prose_rules.Config)
        self.assertEqual(list(json.loads((root / prose_rules.CONFIG).read_text(encoding="utf-8"))), list(BASE))


class ScanTests(unittest.TestCase):
    LISTED = ["App/A.swift", "App/build/x.swift", "docs/a.md", "docs/a.png", "Makefile", "content/a.md", "data/raw.md"]

    def test_suffix_names_dirs_prefixes_and_files(self):
        cfg = config(skip_dirs=["build"], skip_prefixes=["content/"], skip_files={"data/raw.md": "外来语料"})
        self.assertEqual(gate.scanned(self.LISTED, cfg), ["App/A.swift", "docs/a.md", "Makefile"])

    def test_a_dotfile_in_names_is_scanned_and_its_comments_judged(self):
        cfg = config(names=["Makefile", ".env.example"], narrative_comments=[".env.example"],
                     comment_styles={**BASE["comment_styles"], ".env.example": "hash"})
        self.assertIn(".env.example", gate.scanned([*self.LISTED, ".env.example"], cfg))
        text = f"# 上限按档位定{chr(0x2014)}见部署文档\nLIMIT=3\n# 此前是 5\n"
        self.assertEqual(len(details(".env.example", text, cfg)), 2)

    def test_config_entries_that_match_nothing_are_red(self):
        cfg = config(names=["Makefile", "pre-push"], skip_dirs=["build", "DerivedData"], skip_prefixes=["gone/"],
                     skip_files={"gone.md": "理由"},
                     frozen_prefixes=[], living=["docs/*.md", "guides/*.md"], procedural=[],
                     narrative_comments=["Makefile"],
                     rules=[{"pattern": "x", "in": "prose", "files": ["**/*.kt"], "except": [], "message": "m"}])
        self.assertEqual(gate.stale_problems(cfg, self.LISTED), [
            "skip_files 的 gone.md 不是入库文件：改名就改键，删了就连理由一起删",
            "names 的 pre-push 没有入库文件叫这个名字",
            "skip_prefixes 的 gone/ 底下没有入库文件",
            "skip_dirs 的 DerivedData 没有入库文件在它底下",
            "living 的 guides/*.md 对不上任何入库文件",
            "rules 第 1 条的 files 的 **/*.kt 对不上任何入库文件",
        ])


class CopyTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.parent = Path(temporary.name)
        self.own = self.make("hachimi-ios/scripts", "同一份")

    def make(self, folder: str, body: str, config_file: bool = True) -> Path:
        where = self.parent / folder
        for name in gate.KIT:
            (where / name).parent.mkdir(parents=True, exist_ok=True)
            (where / name).write_text(body, encoding="utf-8")
        if config_file:
            (self.parent / folder.split("/")[0] / prose_rules.CONFIG).write_text("{}", encoding="utf-8")
        return where

    def test_identical_copies_and_absent_repos_pass(self):
        self.make("hachimi-orb/tools", "同一份")
        self.assertEqual(gate.copy_problems(self.own, self.parent), [])

    def test_a_different_or_missing_file_is_red(self):
        other = self.make("hachimi-android/scripts", "同一份")
        (other / "doc_rules.py").write_text("改过的", encoding="utf-8")
        (other / "tests/test_doc_rules.py").unlink()
        self.assertEqual(gate.copy_problems(self.own, self.parent),
                         ["hachimi-android/scripts/doc_rules.py：与本份字节不同，七份要同批改",
                          "hachimi-android/scripts/tests/test_doc_rules.py：缺这一份，七份要同批改"])

    def test_sibling_without_config_is_not_compared(self):
        self.make("hachimi-backend/scripts", "旧的一套", config_file=False)
        self.assertEqual(gate.copy_problems(self.own, self.parent), [])


class GlossaryTests(unittest.TestCase):
    def test_absent_glossary_prints_one_line_and_is_not_judged(self):
        with tempfile.TemporaryDirectory() as folder, contextlib.redirect_stdout(io.StringIO()) as out:
            glossary, problems = gate.load_glossary(Path(folder), config(glossary="../nope/glossary.md"))
        self.assertIsNone(glossary)
        self.assertEqual(problems, [])
        self.assertIn("不判", out.getvalue())

    def test_glossary_without_the_table_is_red(self):
        with tempfile.TemporaryDirectory() as folder:
            (Path(folder) / "docs").mkdir()
            (Path(folder) / "docs/glossary.md").write_text("# 术语表\n", encoding="utf-8")
            glossary, problems = gate.load_glossary(Path(folder), config())
        self.assertIsNone(glossary)
        self.assertEqual(len(problems), 1)


class CommitMessageTests(unittest.TestCase):
    def run_gate(self, text: str) -> int:
        with tempfile.TemporaryDirectory() as folder, contextlib.redirect_stderr(io.StringIO()):
            path = Path(folder) / "COMMIT_EDITMSG"
            path.write_text(text, encoding="utf-8")
            return commit_gate.main(["commit-msg-style-gate.py", str(path)])

    def test_clean_message_passes_and_git_comments_are_skipped(self):
        self.assertEqual(self.run_gate("feat: 按首字母分节\n\n# Please enter the “message” \"x\"\n"), 0)

    def test_red_message_and_usage_error(self):
        self.assertEqual(self.run_gate("feat: 列表\u2014分节\n"), 1)
        with contextlib.redirect_stderr(io.StringIO()):
            self.assertEqual(commit_gate.main(["commit-msg-style-gate.py"]), 2)


if __name__ == "__main__":
    unittest.main()
