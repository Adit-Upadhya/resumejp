import { NextResponse } from "next/server";
import { ResumeSchema, type Resume } from "@/lib/schema";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Translates every user-supplied text field of the resume into Japanese using
 * Google Translate's free public endpoint (the same one that powers the
 * translate.google.com widget). No API key required.
 *
 * Strategy: send each field as its own request in parallel. Google's free
 * endpoint handles concurrent small requests well; a typical resume completes
 * in ~1–2s. Empty strings short-circuit, and a field that's already Japanese
 * is detected as `ja` and returned unchanged.
 */

const GOOGLE_URL =
  "https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=ja&dt=t";

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = ResumeSchema.safeParse((body as { resume?: unknown }).resume);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid resume shape" }, { status: 400 });
  }

  try {
    const translated = await translateResume(parsed.data);
    return NextResponse.json({ resume: translated });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Translation request failed";
    return NextResponse.json({ error: msg }, { status: 502 });
  }
}

async function translateResume(r: Resume): Promise<Resume> {
  // Collect every translatable string with a stable path so we can splice
  // results back in after the parallel batch resolves.
  type Path =
    | { kind: "personal"; key: keyof Resume["personal"] }
    | { kind: "extras"; key: keyof Resume["extras"] }
    | { kind: "education"; id: string }
    | { kind: "work"; id: string }
    | { kind: "license"; id: string };

  const jobs: { path: Path; text: string }[] = [];

  const personalKeys: (keyof Resume["personal"])[] = [
    "fullName",
    "furiganaName",
    "nationality",
    "address",
    "furiganaAddress",
    "contactAddress",
    "furiganaContact",
  ];
  for (const k of personalKeys) {
    const v = r.personal[k];
    if (typeof v === "string" && v.trim()) {
      jobs.push({ path: { kind: "personal", key: k }, text: v });
    }
  }

  const extrasKeys: (keyof Resume["extras"])[] = [
    "selfPr",
    "commuteTime",
    "dependents",
    "preferences",
  ];
  for (const k of extrasKeys) {
    const v = r.extras[k];
    if (typeof v === "string" && v.trim()) {
      jobs.push({ path: { kind: "extras", key: k }, text: v });
    }
  }

  for (const e of r.education) {
    if (e.content.trim()) jobs.push({ path: { kind: "education", id: e.id }, text: e.content });
  }
  for (const w of r.work) {
    if (w.content.trim()) jobs.push({ path: { kind: "work", id: w.id }, text: w.content });
  }
  for (const l of r.licenses) {
    if (l.name.trim()) jobs.push({ path: { kind: "license", id: l.id }, text: l.name });
  }

  const results = await Promise.all(jobs.map((j) => translateOne(j.text)));

  const next: Resume = {
    ...r,
    personal: { ...r.personal },
    education: r.education.map((e) => ({ ...e })),
    work: r.work.map((e) => ({ ...e })),
    licenses: r.licenses.map((l) => ({ ...l })),
    extras: { ...r.extras },
  };

  jobs.forEach((job, i) => {
    const translated = results[i];
    switch (job.path.kind) {
      case "personal":
        // keep type-safe assignment; all listed keys are string-valued
        (next.personal as Record<string, unknown>)[job.path.key as string] = translated;
        break;
      case "extras":
        (next.extras as Record<string, unknown>)[job.path.key as string] = translated;
        break;
      case "education": {
        const item = next.education.find((x) => x.id === (job.path as { id: string }).id);
        if (item) item.content = translated;
        break;
      }
      case "work": {
        const item = next.work.find((x) => x.id === (job.path as { id: string }).id);
        if (item) item.content = translated;
        break;
      }
      case "license": {
        const item = next.licenses.find((x) => x.id === (job.path as { id: string }).id);
        if (item) item.name = translated;
        break;
      }
    }
  });

  return next;
}

/**
 * Calls the Google Translate single endpoint. The response shape is a deeply
 * nested array where `result[0]` is a list of sentence chunks, each chunk
 * being `[translatedText, originalText, ...]`. We join the chunks back.
 */
async function translateOne(text: string): Promise<string> {
  // Preserve paragraph breaks by translating each line separately.
  const lines = text.split("\n");
  const translated = await Promise.all(lines.map(translateLine));
  return translated.join("\n");
}

async function translateLine(line: string): Promise<string> {
  if (!line.trim()) return line;
  const url = `${GOOGLE_URL}&q=${encodeURIComponent(line)}`;
  const res = await fetch(url, {
    headers: {
      // Google's free endpoint serves a generic JS payload without a UA;
      // setting a browser-ish UA improves reliability noticeably.
      "user-agent":
        "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/123.0 Safari/537.36",
      accept: "*/*",
    },
    // Don't follow caches; this is a one-shot call.
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Google Translate returned ${res.status}`);
  }
  const json = (await res.json()) as unknown;
  // Shape: [ [ [ "translated", "original", ... ], ... ], detectedSrc?, ... ]
  if (!Array.isArray(json) || !Array.isArray(json[0])) {
    throw new Error("Unexpected translator response shape");
  }
  const segments = json[0] as unknown[];
  return segments
    .map((seg) => (Array.isArray(seg) ? String(seg[0] ?? "") : ""))
    .join("");
}
