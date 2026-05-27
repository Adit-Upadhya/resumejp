import { NextResponse } from "next/server";
import puppeteer, { type Browser } from "puppeteer";
import { ResumeSchema } from "@/lib/schema";

export const runtime = "nodejs";
export const maxDuration = 60;

/**
 * Generates a PDF of the rirekisho by:
 *   1. Encoding the resume into a base64 query param
 *   2. Loading /preview?data=<...> in headless Chromium
 *   3. Waiting for the client to mark window.__rirekishoReady
 *   4. Printing to PDF at A4 portrait, no margin (the sheet supplies its own)
 *
 * Browser instance is reused across requests for warm starts.
 */

declare global {
  var __pup_browser: Browser | undefined;
}

async function getBrowser(): Promise<Browser> {
  if (global.__pup_browser && global.__pup_browser.connected) {
    return global.__pup_browser;
  }
  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox", "--font-render-hinting=none"],
  });
  global.__pup_browser = browser;
  return browser;
}

export async function POST(req: Request) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const parsed = ResumeSchema.safeParse((body as { resume?: unknown }).resume);
  if (!parsed.success) {
    return NextResponse.json({ error: "Invalid resume shape" }, { status: 400 });
  }

  const json = JSON.stringify(parsed.data);
  const encoded = Buffer.from(json, "utf-8").toString("base64");

  const origin = originFromRequest(req);
  const url = `${origin}/preview?data=${encodeURIComponent(encoded)}`;

  const browser = await getBrowser();
  const page = await browser.newPage();

  try {
    // A3 landscape ≈ 1587×1123 CSS pixels at 96dpi.
    await page.setViewport({ width: 1587, height: 1123, deviceScaleFactor: 2 });
    await page.goto(url, { waitUntil: "networkidle0", timeout: 30_000 });
    await page.waitForFunction(
      "window.__rirekishoReady === true",
      { timeout: 10_000 },
    );
    // Give Noto Sans JP a beat to actually paint after fonts.ready resolves.
    await page.evaluateHandle("document.fonts.ready");

    const pdf = await page.pdf({
      format: "A3",
      landscape: true,
      printBackground: true,
      margin: { top: "0", right: "0", bottom: "0", left: "0" },
      preferCSSPageSize: true,
    });

    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: {
        "content-type": "application/pdf",
        "content-disposition": 'attachment; filename="rirekisho.pdf"',
        "cache-control": "no-store",
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "PDF render failed";
    return NextResponse.json({ error: msg }, { status: 500 });
  } finally {
    await page.close().catch(() => {});
  }
}

function originFromRequest(req: Request): string {
  const url = new URL(req.url);
  // In dev/prod we hit ourselves on the same host:port.
  return `${url.protocol}//${url.host}`;
}
