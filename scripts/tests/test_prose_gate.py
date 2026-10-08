"""行文门的入口：hachimi-ios 在场、配置的字段与类型、配置空转、扫哪些文件、各仓副本逐字节比对、术语表在不在。"""
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

    def make(self, folder: str, body: str) -> Path:
        where = self.parent / folder
        for name in gate.KIT:
            (where / name).parent.mkdir(parents=True, exist_ok=True)
            (where / name).write_text(body, encoding="utf-8")
        return where

    def test_identical_copies_and_absent_repos_pass(self):
        self.make("hachimi-orb/tools", "同一份")
        self.assertEqual(gate.copy_problems(self.own, self.parent), [])

    def test_a_different_or_missing_file_is_red(self):
        other = self.make("hachimi-android/scripts", "同一份")
        (other / "doc_rules.py").write_text("改过的", encoding="utf-8")
        (other / "tests/test_doc_rules.py").unlink()
        self.assertEqual(gate.copy_problems(self.own, self.parent),
                         ["hachimi-android/scripts/doc_rules.py：与本份字节不同，各仓要同批改",
                          "hachimi-android/scripts/tests/test_doc_rules.py：缺这一份，各仓要同批改"])

    def test_a_present_sibling_without_the_kit_is_red(self):
        (self.parent / "hachimi-backend").mkdir()
        self.assertEqual(len(gate.copy_problems(self.own, self.parent)), len(gate.KIT))

    def test_a_linked_worktree_compares_the_ios_checkout_too(self):
        worktree = self.make("wave/ios-wt/scripts", "改了一半")
        (worktree.parents[1] / "hachimi-ios").symlink_to(self.parent / "hachimi-ios")
        self.assertEqual(len(gate.copy_problems(worktree, worktree.parents[1])), len(gate.KIT))


class IosTests(unittest.TestCase):
    def setUp(self):
        temporary = tempfile.TemporaryDirectory()
        self.addCleanup(temporary.cleanup)
        self.parent = Path(temporary.name)

    def test_ios_running_itself_is_present(self):
        (self.parent / "hachimi-ios").mkdir()
        self.assertFalse(gate.ios_missing(self.parent / "hachimi-ios"))

    def test_a_sibling_or_worktree_needs_ios_beside_it(self):
        (self.parent / "hachimi-backend").mkdir()
        (self.parent / "ios-wt").mkdir()
        self.assertTrue(gate.ios_missing(self.parent / "hachimi-backend"))
        self.assertTrue(gate.ios_missing(self.parent / "ios-wt"))
        (self.parent / "hachimi-ios").mkdir()
        self.assertFalse(gate.ios_missing(self.parent / "hachimi-backend"))
        self.assertFalse(gate.ios_missing(self.parent / "ios-wt"))

    def test_main_exits_2_without_ios_with_or_without_paths(self):
        root = self.parent / "hachimi-backend"
        root.mkdir()
        original = gate.repo_root
        gate.repo_root = lambda: root
        self.addCleanup(setattr, gate, "repo_root", original)
        for argv in ([], ["docs/a.md"]):
            with self.subTest(argv=argv), contextlib.redirect_stderr(io.StringIO()) as err:
                self.assertEqual(gate.main(argv), 2)
            self.assertIn("hachimi-ios 不在场", err.getvalue())


class GlossaryTests(unittest.TestCase):
    def test_absent_glossary_is_red(self):
        with tempfile.TemporaryDirectory() as folder:
            glossary, problems = gate.load_glossary(Path(folder), config(glossary="../nope/glossary.md"))
        self.assertIsNone(glossary)
        self.assertEqual(problems, ["glossary 指的 ../nope/glossary.md 不在：改名就改 prose.json"])

    def test_glossary_without_the_table_is_red(self):
        with tempfile.TemporaryDirectory() as folder:
            (Path(folder) / "docs").mkdir()
            (Path(folder) / "docs/glossary.md").write_text("# 术语表\n", encoding="utf-8")
            glossary, problems = gate.load_glossary(Path(folder), config())
        self.assertIsNone(glossary)
        self.assertEqual(len(problems), 1)


if __name__ == "__main__":
    unittest.main()
