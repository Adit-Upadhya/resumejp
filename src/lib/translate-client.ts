import type { Resume } from "./schema";

/**
 * Posts the whole resume to /api/translate. The server returns a Resume with
 * each user-supplied field rewritten as natural business Japanese.
 *
 * Throws if ANTHROPIC_API_KEY is missing on the server, or on any network /
 * shape error so the editor can surface the cause to the user.
 */
export async function translateResume(resume: Resume): Promise<Resume> {
  const res = await fetch("/api/translate", {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify({ resume }),
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(body || `Translation failed (${res.status})`);
  }
  const json = (await res.json()) as { resume: Resume };
  return json.resume;
}
