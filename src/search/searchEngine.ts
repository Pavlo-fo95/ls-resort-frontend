// src/search/searchEngine.ts
import Fuse from "fuse.js";
import type { SearchDoc } from "./searchIndex";

export type SearchHit = {
  doc: SearchDoc;
  score: number;
  snippet: string;
};

function normalizeSpace(s: string): string {
  return (s || "").replace(/\s+/g, " ").trim();
}

function makeSnippet(text: string, query: string, maxLen = 140): string {
  const q = query.trim().toLowerCase();
  const t = normalizeSpace(text);
  if (!q || !t) return "";

  const idx = t.toLowerCase().indexOf(q);
  if (idx === -1) return t.slice(0, maxLen) + (t.length > maxLen ? "…" : "");

  const start = Math.max(0, idx - Math.floor(maxLen / 2));
  const chunk = t.slice(start, start + maxLen);
  return (start > 0 ? "…" : "") + chunk + (start + maxLen < t.length ? "…" : "");
}

export function createFuse(docs: SearchDoc[]) {
  return new Fuse(docs, {
    includeScore: true,
    threshold: 0.35,
    ignoreLocation: true,
    keys: [
      { name: "title", weight: 0.55 },
      { name: "tags", weight: 0.30 },
      { name: "body", weight: 0.15 },
    ],
  });
}

export function searchDocs(fuse: Fuse<SearchDoc>, query: string, limit = 10): SearchHit[] {
  const q = query.trim();
  if (!q) return [];

  return fuse.search(q, { limit }).map((r) => ({
    doc: r.item,
    score: r.score ?? 1,
    snippet: makeSnippet(r.item.body, q),
  }));
}