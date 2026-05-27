"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import { Sheet } from "@/components/rirekisho/Sheet";
import { emptyResume, type Resume } from "@/lib/schema";
import { loadResume } from "@/lib/storage";
import { TEMPLATES, type TemplateKey, loadTemplate } from "@/lib/templates";
import "@/components/rirekisho/sheet.css";
import "@/components/rirekisho/print.css";

/**
 * Renders the resume at real size with print CSS applied.
 *
 * Puppeteer fetches `/preview?data=<base64-json>&template=<key>`. If `data`
 * is absent we fall back to localStorage so users can open this page
 * directly for a full-size browser preview.
 */
export function PrintPreviewClient() {
  const params = useSearchParams();
  const [data, setData] = useState<Resume | null>(null);
  const [template, setTemplate] = useState<TemplateKey>("jis-a3");

  useEffect(() => {
    const t = (params.get("template") as TemplateKey | null) ?? loadTemplate();
    setTemplate(t in TEMPLATES ? t : "jis-a3");

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
  }, [data, template]);

  if (!data) return null;
  const meta = TEMPLATES[template];
  const pageSize = `${meta.paper} ${meta.orientation}`;
  return (
    <>
      <style>{`@page { size: ${pageSize}; margin: 0; }`}</style>
      <Sheet template={template} data={data} />
    </>
  );
}
