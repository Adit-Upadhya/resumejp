import { randomUUID } from "crypto";

// Server-only module — uses Node.js crypto, never imported by client components.
// The PDF API stores resume JSON here under a short-lived token so Puppeteer
// can navigate to /preview?token=<uuid> without a huge base64 query string.

type Store = Map<string, string>;

function getStore(): Store {
  const g = globalThis as typeof globalThis & { __previewStore?: Store };
  if (!g.__previewStore) g.__previewStore = new Map();
  return g.__previewStore;
}

export function storePreviewData(json: string): string {
  const token = randomUUID();
  getStore().set(token, json);
  return token;
}

export function retrievePreviewData(token: string): string | undefined {
  return getStore().get(token);
}

export function removePreviewData(token: string): void {
  getStore().delete(token);
}
