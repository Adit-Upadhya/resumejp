import type { Metadata } from "next";
import { EditorClient } from "@/components/editor/EditorClient";

export const metadata: Metadata = {
  title: "Resume Editor — Build Your 履歴書",
  description:
    "Fill in your details and build a Japanese resume (履歴書 rirekisho) step by step. Choose JIS, MHLW, mid-career, new-grad, part-time, or English CV templates and download a print-ready PDF.",
  alternates: { canonical: "/editor" },
};

export default function EditorPage() {
  return <EditorClient />;
}
