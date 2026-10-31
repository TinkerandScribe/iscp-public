"""Retry a callable up to N times with a hard ceiling and anti-loop pivot."""

from __future__ import annotations

from typing import Callable, Optional, TypeVar

from budget import Budget
from report import Report

T = TypeVar("T")


def _exc_key(exc: BaseException) -> tuple[type, str]:
    return (type(exc), str(exc))


def run(
    fn: Callable[[], T],
    n: int,
    budget: Optional[Budget] = None,
) -> tuple[Optional[T], Report]:
    """
    Attempt `fn` at most `n` times (n >= 1).

    - Two consecutive exceptions with the same type and message → PIVOT (stop).
    - Mixed exceptions continue until n, then FAILURE.
    - Budget remaining == 0 before an attempt → FAILURE (distinct from pivot).
    """
    if n < 1:
        raise ValueError("n must be >= 1")

    attempts = 0
    prev_key: Optional[tuple[type, str]] = None

    while attempts < n:
        if budget is not None and not budget.allow():
            return None, Report(
                attempts=attempts,
                outcome="failure",
                failed_criteria=["budget remaining > 0 before attempt"],
            )
        if budget is not None:
            budget.consume()
        attempts += 1
        try:
            value = fn()
            return value, Report(attempts=attempts, outcome="success", failed_criteria=[])
        except Exception as exc:
            key = _exc_key(exc)
            if prev_key is not None and key == prev_key:
                return None, Report(
                    attempts=attempts,
                    outcome="pivot",
                    failed_criteria=["two consecutive identical exceptions"],
                )
            prev_key = key

    return None, Report(
        attempts=attempts,
        outcome="failure",
        failed_criteria=["hard ceiling n reached without success"],
    )
