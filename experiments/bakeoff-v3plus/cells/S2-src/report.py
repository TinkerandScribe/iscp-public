"""Verification report for one bounded-retry run."""

from __future__ import annotations

from dataclasses import dataclass, field
from typing import List, Literal

Outcome = Literal["success", "failure", "pivot"]


@dataclass
class Report:
    attempts: int
    outcome: Outcome
    failed_criteria: List[str] = field(default_factory=list)

    def to_dict(self) -> dict:
        return {
            "attempts": self.attempts,
            "outcome": self.outcome,
            "failed_criteria": list(self.failed_criteria),
        }
