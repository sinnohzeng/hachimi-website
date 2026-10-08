"""commit message 入口：前五条各判一次红，叙事词、术语与句长不判，git 的井号注释行与行内反引号片段不判，缺参数报用法。"""
import contextlib
import importlib.util
import io
import subprocess
import sys
import tempfile
import unittest
from pathlib import Path

HERE = Path(__file__).resolve().parents[1]
SCRIPT = HERE / "commit-msg-style-gate.py"
EM = "\u2014"
CORNER = "\u300c"


def load():
    spec = importlib.util.spec_from_file_location("commit_msg_style_gate", SCRIPT)
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)
    return module


gate = load()


class CommitMessageGateTests(unittest.TestCase):
    def run_gate(self, text: str) -> tuple[int, str]:
        err = io.StringIO()
        with tempfile.TemporaryDirectory() as folder, contextlib.redirect_stderr(err):
            path = Path(folder) / "COMMIT_EDITMSG"
            path.write_text(text, encoding="utf-8")
            code = gate.main(["commit-msg-style-gate.py", str(path)])
        return code, err.getvalue()

    def test_clean_message_passes(self):
        self.assertEqual(self.run_gate("feat: 按首字母分节\n\n正文写清为什么。\n")[0], 0)

    def test_each_of_the_first_five_rules_is_red(self):
        signature = "Co-Authored-By: " + "Claude <x@example.test>"
        for body in (f"列表{EM}分节", f"按{CORNER}首字母分节", signature, '按 "首字母" 分节', "这一刀做完"):
            with self.subTest(body=body):
                code, out = self.run_gate(f"feat: 分节\n\n{body}\n")
                self.assertEqual(code, 1)
                self.assertIn("第 3 行", out)

    def test_narrative_terms_and_sentence_length_are_not_judged(self):
        long_sentence = "按首字母分节" * 20 + "。"
        self.assertEqual(self.run_gate(f"fix: 此前按笔画排序\n\n{long_sentence}\n")[0], 0)

    def test_git_comment_lines_and_inline_code_are_skipped(self):
        text = 'feat: 按 `buttons["下一个"]` 分节\n\n# 井号行是 git 加的说明 "x"\n'
        self.assertEqual(self.run_gate(text)[0], 0)

    def test_ignore_marker_skips_the_line(self):
        self.assertEqual(self.run_gate(f"docs: 判据样例 列表{EM}分节 prose-style-ignore\n")[0], 0)

    def test_missing_argument_is_a_usage_error(self):
        with contextlib.redirect_stderr(io.StringIO()):
            self.assertEqual(gate.main(["commit-msg-style-gate.py"]), 2)

    def test_runs_as_a_hook_outside_the_repo(self):
        with tempfile.TemporaryDirectory() as folder:
            path = Path(folder) / "COMMIT_EDITMSG"
            path.write_text(f"feat: 列表{EM}分节\n", encoding="utf-8")
            red = subprocess.run([sys.executable, str(SCRIPT), str(path)], cwd=folder, capture_output=True, text=True)
            path.write_text("feat: 按首字母分节\n", encoding="utf-8")
            green = subprocess.run([sys.executable, str(SCRIPT), str(path)], cwd=folder, capture_output=True, text=True)
        self.assertEqual((red.returncode, green.returncode), (1, 0), red.stderr + green.stderr)


if __name__ == "__main__":
    unittest.main()
