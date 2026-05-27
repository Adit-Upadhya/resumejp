"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { RirekishoSheet } from "@/components/rirekisho/RirekishoSheet";
import { emptyResume, type Resume } from "@/lib/schema";
import { loadResume } from "@/lib/storage";
import "@/components/rirekisho/sheet.css";
import "@/components/rirekisho/print.css";

/**
 * Renders the resume at real size (210mm wide) with print CSS applied.
 *
 * Puppeteer fetches `/preview?data=<base64-json>`; if the param is present we
 * decode it. Otherwise we read the user's autosaved data from localStorage,
 * which lets people open this page directly to see a full-size preview.
 */
export function PrintPreviewClient() {
  const params = useSearchParams();
  const [data, setData] = useState<Resume | null>(null);

  useEffect(() => {
    const encoded = params.get("data");
    if (encoded) {
      try {
        const decoded = decodeURIComponent(escape(atob(encoded)));
        setData(JSON.parse(decoded) as Resume);
      } catch {
        setData(emptyResume());
      }
    } else {
      setData(loadResume());
    }
  }, [params]);

  useEffect(() => {
    if (data) {
      // Signal to Puppeteer that render is done. waitForFunction polls this.
      (window as unknown as { __rirekishoReady?: boolean }).__rirekishoReady = true;
    }
  }, [data]);

  if (!data) return null;
  return <RirekishoSheet data={data} />;
}
