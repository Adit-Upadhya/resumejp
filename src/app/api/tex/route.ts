import { NextResponse } from "next/server";
import { ResumeSchema } from "@/lib/schema";
import { renderTex } from "@/lib/tex";

export const runtime = "nodejs";

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

  const tex = renderTex(parsed.data);
  return new NextResponse(tex, {
    status: 200,
    headers: {
      "content-type": "application/x-tex; charset=utf-8",
      "content-disposition": 'attachment; filename="rirekisho.tex"',
    },
  });
}
