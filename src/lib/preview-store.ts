import { randomUUID } from "crypto";

// Server-only module — uses Node.js crypto, never imported by client components.
// The PDF API stores resume JSON here under a short-lived token so Puppeteer
// can navigate to /preview?token=<uuid> without a huge base64 query string.
//
// Entries expire after TTL_MS so a token can't be replayed long after the
// render finished and the user's resume JSON isn't retained indefinitely.

const TTL_MS = 5 * 60 * 1000; // 5 minutes

interface Entry {
  json: string;
  expiresAt: number;
}

type Store = Map<string, Entry>;

function getStore(): Store {
  const g = globalThis as typeof globalThis & { __previewStore?: Store };
  if (!g.__previewStore) g.__previewStore = new Map();
  return g.__previewStore;
}

function sweep(store: Store, now: number): void {
  for (const [token, entry] of store) {
    if (entry.expiresAt <= now) store.delete(token);
  }
}

export function storePreviewData(json: string): string {
  const store = getStore();
  const now = Date.now();
  sweep(store, now);
  const token = randomUUID();
  store.set(token, { json, expiresAt: now + TTL_MS });
  return token;
}

export function retrievePreviewData(token: string): string | undefined {
  const store = getStore();
  const entry = store.get(token);
  if (!entry) return undefined;
  if (entry.expiresAt <= Date.now()) {
    store.delete(token);
    return undefined;
  }
  return entry.json;
}

export function removePreviewData(token: string): void {
  getStore().delete(token);
}
