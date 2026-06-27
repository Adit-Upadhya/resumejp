import type { Metadata } from "next";
import { EditorClient } from "@/components/editor/EditorClient";

export const metadata: Metadata = {
  title: "Resume Editor — Build Your 履歴書",
  description:
    "Fill in your details and build a Japanese resume (履歴書 rirekisho) step by step. Choose JIS, MHLW, mid-career, new-grad, part-time, or English CV templates and download a print-ready PDF.",
  alternates: { canonical: "/editor" },
  // The editor is an interactive tool with no article content. Keep it out of
  // the search index (and out of AdSense's content evaluation) so the site is
  // judged on its guides and landing pages, not a content-less app shell.
  robots: { index: false, follow: true },
};

export default function EditorPage() {
  return <EditorClient />;
}
