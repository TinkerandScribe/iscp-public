"""Call budget: remaining > 0 is the binary allow-call check."""

from __future__ import annotations


class Budget:
    def __init__(self, remaining: int) -> None:
        if remaining < 0:
            raise ValueError("remaining must be >= 0")
        self.remaining = int(remaining)

    def allow(self) -> bool:
        return self.remaining > 0

    def consume(self, n: int = 1) -> bool:
        if n < 1 or not self.allow():
            return False
        self.remaining -= n
        return True
