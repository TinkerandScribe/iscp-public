"""Seed S2 cases — run: python -m unittest test_bounded_retry.py"""

from __future__ import annotations

import unittest

from bounded_retry import run
from budget import Budget
from report import Report


class Flaky:
    def __init__(self, fails: int, *, identical: bool = False, exc_type=RuntimeError) -> None:
        self.fails = fails
        self.identical = identical
        self.exc_type = exc_type
        self.calls = 0

    def __call__(self) -> str:
        self.calls += 1
        if self.calls <= self.fails:
            msg = "boom" if self.identical else f"boom-{self.calls}"
            raise self.exc_type(msg)
        return "ok"



class Seq:
    """Raises the next exception in `errors`, then returns 'ok'."""

    def __init__(self, errors: list[BaseException]) -> None:
        self.errors = list(errors)
        self.calls = 0

    def __call__(self) -> str:
        self.calls += 1
        if self.errors:
            raise self.errors.pop(0)
        return "ok"


class TestBoundedRetry(unittest.TestCase):
    def test_success_first_try(self) -> None:
        val, rep = run(lambda: 7, n=3)
        self.assertEqual(val, 7)
        self.assertEqual(rep.outcome, "success")
        self.assertEqual(rep.attempts, 1)

    def test_success_after_one_fail(self) -> None:
        val, rep = run(Flaky(1), n=3)
        self.assertEqual(val, "ok")
        self.assertEqual(rep.outcome, "success")
        self.assertEqual(rep.attempts, 2)

    def test_identical_exception_pivot(self) -> None:
        val, rep = run(Flaky(5, identical=True), n=5)
        self.assertIsNone(val)
        self.assertEqual(rep.outcome, "pivot")
        self.assertEqual(rep.attempts, 2)
        self.assertIn("identical", " ".join(rep.failed_criteria))

    def test_budget_exhaustion(self) -> None:
        fn = Flaky(10)
        val, rep = run(fn, n=10, budget=Budget(2))
        self.assertIsNone(val)
        self.assertEqual(rep.outcome, "failure")
        self.assertEqual(rep.attempts, 2)
        self.assertTrue(any("budget" in c for c in rep.failed_criteria))
        self.assertEqual(fn.calls, 2)

    def test_n_equals_1(self) -> None:
        val, rep = run(Flaky(1), n=1)
        self.assertIsNone(val)
        self.assertEqual(rep.outcome, "failure")
        self.assertEqual(rep.attempts, 1)

    def test_mixed_exceptions_not_pivoted(self) -> None:
        fn = Seq([ValueError("a"), RuntimeError("b"), TypeError("c")])
        val, rep = run(fn, n=4)
        self.assertEqual(val, "ok")
        self.assertEqual(rep.outcome, "success")
        self.assertEqual(rep.attempts, 4)

    def test_success_on_last_allowed_try(self) -> None:
        val, rep = run(Flaky(2), n=3)
        self.assertEqual(val, "ok")
        self.assertEqual(rep.outcome, "success")
        self.assertEqual(rep.attempts, 3)

    def test_report_fields_present(self) -> None:
        _, rep = run(lambda: None, n=2)
        self.assertIsInstance(rep, Report)
        d = rep.to_dict()
        self.assertIn("attempts", d)
        self.assertIn("outcome", d)
        self.assertIn("failed_criteria", d)
        self.assertEqual(d["outcome"], "success")
        self.assertIsInstance(d["failed_criteria"], list)

    def test_n_less_than_one_rejected(self) -> None:
        with self.assertRaises(ValueError):
            run(lambda: 1, n=0)


if __name__ == "__main__":
    unittest.main()
