"""
Optional Vector / Quantized backend for Hierarchical Experience Memory.

Ideal State Criteria for this layer:
- Fully optional; hierarchical JSONL path remains the default with zero extra deps.
- Abstract interface so pure-Python, FAISS, Lance, or Mojo can implement it.
- Hot paths clearly marked for Mojo acceleration.
- Retrieval can blend metadata filters + quantized similarity while still
  returning hierarchical leaf + parent context.
- Verified-write, audit, and quarantine invariants are preserved by the caller.
"""

from __future__ import annotations

from abc import ABC, abstractmethod
from typing import List, Optional, Tuple, Dict, Any
import struct
import math
import hashlib


class VectorBackend(ABC):
    """Abstract interface for quantized / dense retrieval backends."""

    @abstractmethod
    def add(self, id: str, vector: List[float], metadata: Optional[Dict[str, Any]] = None) -> None:
        """Add a vector (or its quantized form) under the given id."""
        ...

    @abstractmethod
    def search(
        self,
        query: List[float],
        k: int = 5,
        filter_metadata: Optional[Dict[str, Any]] = None,
    ) -> List[Tuple[str, float]]:
        """Return list of (id, similarity_score) sorted by descending similarity."""
        ...

    @abstractmethod
    def quantize(self, vector: List[float]) -> bytes:
        """Return quantized representation (SQ8-style)."""
        ...

    def dequantize(self, data: bytes) -> List[float]:
        """Optional reverse for inspection / debugging."""
        raise NotImplementedError("dequantize not implemented for this backend")


def quantize_sq8(vector: List[float]) -> bytes:
    """
    Simple scalar quantization to uint8.

    Layout: <f32 min><f32 scale><uint8 values...>

    --- Mojo acceleration candidate ---
    This entire function (min/max reduction + scale + pack) is a natural
    Mojo / SIMD kernel. Replace with an ownership-safe Mojo implementation
    when moving hot paths out of pure Python.
    """
    if not vector:
        return b""
    vmin = min(vector)
    vmax = max(vector)
    scale = (vmax - vmin) / 255.0 if vmax > vmin else 1.0
    header = struct.pack("<ff", vmin, scale)
    body = bytes(
        max(0, min(255, int(round((x - vmin) / scale))))
        for x in vector
    )
    return header + body


def dequantize_sq8(data: bytes) -> List[float]:
    if len(data) < 8:
        return []
    vmin, scale = struct.unpack("<ff", data[:8])
    return [vmin + b * scale for b in data[8:]]


def l2_distance(a: List[float], b: List[float]) -> float:
    """
    Euclidean distance.

    --- Mojo acceleration candidate ---
    Batched L2 (or inner-product) is the classic first kernel to move to
    Mojo with SIMD / GPU targeting.
    """
    return math.sqrt(sum((x - y) ** 2 for x, y in zip(a, b)))


def simple_text_embedding(text: str, dim: int = 32) -> List[float]:
    """
    Deterministic, zero-dependency bag-of-hashes embedding.
    Good enough for first-slice semantic filtering of notes / criteria.
    Real sentence-transformer or Mojo-accelerated embeddings can replace this.
    """
    vec = [0.0] * dim
    if not text:
        return vec
    tokens = text.lower().split()
    for tok in tokens:
        h = int(hashlib.md5(tok.encode()).hexdigest(), 16)
        idx = h % dim
        sign = 1.0 if (h & 1) else -1.0
        vec[idx] += sign
    # L2 normalize
    norm = math.sqrt(sum(x * x for x in vec)) or 1.0
    return [x / norm for x in vec]


class PurePythonSQ8Backend(VectorBackend):
    """
    Zero-dependency reference implementation using scalar quantization ideas
    and brute-force search. Suitable for correctness tests and small collections.

    Hot paths are explicitly marked for future Mojo replacement.
    """

    def __init__(self):
        self._ids: List[str] = []
        self._vectors: List[List[float]] = []
        self._meta: List[Dict[str, Any]] = []

    def quantize(self, vector: List[float]) -> bytes:
        return quantize_sq8(vector)

    def dequantize(self, data: bytes) -> List[float]:
        return dequantize_sq8(data)

    def add(self, id: str, vector: List[float], metadata: Optional[Dict[str, Any]] = None) -> None:
        self._ids.append(id)
        # For v0 we keep the float vector for simplicity.
        # A production path would store the SQ8 bytes and dequantize on the fly
        # or keep a Mojo-owned buffer.
        self._vectors.append(list(vector))
        self._meta.append(metadata or {})

    def search(
        self,
        query: List[float],
        k: int = 5,
        filter_metadata: Optional[Dict[str, Any]] = None,
    ) -> List[Tuple[str, float]]:
        """
        Brute-force top-k by L2 similarity.

        --- Mojo acceleration candidate ---
        Replace this loop with a Mojo HNSW / IVF-PQ or even a simple
        parallel top-k kernel. The interface stays identical.
        """
        scores: List[Tuple[str, float]] = []
        for i, vec in enumerate(self._vectors):
            if filter_metadata:
                meta = self._meta[i]
                if any(meta.get(key) != val for key, val in filter_metadata.items()):
                    continue
            dist = l2_distance(query, vec)
            sim = 1.0 / (1.0 + dist)
            scores.append((self._ids[i], sim))
        scores.sort(key=lambda x: x[1], reverse=True)
        return scores[:k]


# ---------------------------------------------------------------------------
# Future Mojo backend sketch (not implemented — interface only)
# ---------------------------------------------------------------------------

class MojoAcceleratedBackend(VectorBackend):
    """
    Placeholder for a future Mojo implementation.

    Expected ownership-safe kernels:
    - quantize_sq8_kernel(vector: Tensor) -> bytes
    - batched_l2_or_ip(query, db) -> scores
    - hnsw_search / ivf_search
    - hierarchical_expand (leaf → parent) fused with ranking

    The Python side would only hold handles / buffers and call into the
    compiled Mojo shared library via the C ABI or a thin ctypes/cython bridge.
    """

    def add(self, id: str, vector: List[float], metadata: Optional[Dict[str, Any]] = None) -> None:
        raise NotImplementedError("MojoAcceleratedBackend is a future extension point")

    def search(
        self,
        query: List[float],
        k: int = 5,
        filter_metadata: Optional[Dict[str, Any]] = None,
    ) -> List[Tuple[str, float]]:
        raise NotImplementedError("MojoAcceleratedBackend is a future extension point")

    def quantize(self, vector: List[float]) -> bytes:
        raise NotImplementedError("MojoAcceleratedBackend is a future extension point")
