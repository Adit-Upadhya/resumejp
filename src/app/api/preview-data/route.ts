import { NextResponse } from "next/server";
import { retrievePreviewData } from "@/lib/preview-store";

export const runtime = "nodejs";

/**
 * Called by PrintPreviewClient when Puppeteer passes ?token=<uuid>.
 * Returns the resume JSON stored by the /api/pdf route.
 */
export async function GET(req: Request) {
  const token = new URL(req.url).searchParams.get("token");
  if (!token) {
    return NextResponse.json({ error: "Missing token" }, { status: 400 });
  }
  const json = retrievePreviewData(token);
  if (!json) {
    return NextResponse.json({ error: "Not found or expired" }, { status: 404 });
  }
  return new NextResponse(json, {
    status: 200,
    headers: { "content-type": "application/json", "cache-control": "no-store" },
  });
}
