import { ResumeSchema, emptyResume, type Resume } from "./schema";

/**
 * Round-trip resume data through the generated PDF.
 *
 * Every PDF this app creates gets the full resume JSON appended after the
 * trailing %%EOF as `%RESUMEJP1:<base64>` (PDF readers ignore bytes after the
 * final EOF, so the document still opens normally). On import we scan the file
 * bytes for that marker and restore the resume exactly — no AI, no fragile
 * layout parsing. Works for any PDF downloaded from this app.
 */
export const PDF_DATA_MARKER = "%RESUMEJP1:";

/** Coerce arbitrary parsed JSON into a valid Resume, filling any gaps. */
export function normalizeResume(input: unknown): Resume | null {
  if (!input || typeof input !== "object") return null;
  const base = emptyResume();
  const o = input as Partial<Resume>;
  const merged: Resume = {
    ...base,
    ...o,
    personal: { ...base.personal, ...(o.personal ?? {}) },
    extras: { ...base.extras, ...(o.extras ?? {}) },
    education: Array.isArray(o.education) ? o.education : base.education,
    work: Array.isArray(o.work) ? o.work : base.work,
    licenses: Array.isArray(o.licenses) ? o.licenses : base.licenses,
  };
  const parsed = ResumeSchema.safeParse(merged);
  return parsed.success ? parsed.data : null;
}

/** Parse an imported `.json` resume backup. */
export function parseResumeJson(text: string): Resume | null {
  try {
    return normalizeResume(JSON.parse(text));
  } catch {
    return null;
  }
}

/**
 * Look for the embedded `%RESUMEJP1:` marker in the raw PDF bytes and decode
 * the resume. Returns null if the PDF wasn't created by this app.
 */
export function extractResumeFromPdfBytes(bytes: Uint8Array): Resume | null {
  // The marker + base64 payload is ASCII at the tail of the file; decode the
  // bytes as latin1 so the base64 survives regardless of the binary body.
  const text = new TextDecoder("latin1").decode(bytes);
  const idx = text.lastIndexOf(PDF_DATA_MARKER);
  if (idx === -1) return null;
  const after = text.slice(idx + PDF_DATA_MARKER.length);
  const match = after.match(/[A-Za-z0-9+/=]+/);
  if (!match) return null;
  try {
    const b64 = match[0];
    const json = new TextDecoder().decode(Uint8Array.from(atob(b64), (c) => c.charCodeAt(0)));
    return normalizeResume(JSON.parse(json));
  } catch {
    return null;
  }
}
