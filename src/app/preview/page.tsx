import { Suspense } from "react";
import { PrintPreviewClient } from "./PrintPreviewClient";

/**
 * Standalone page used by Puppeteer (and also accessible to users for
 * full-size browsing). Reads the resume payload from the `data` query
 * parameter when invoked headlessly; otherwise falls back to localStorage
 * via the client component.
 */
export const dynamic = "force-dynamic";

export default function PreviewPage() {
  return (
    <Suspense fallback={null}>
      <PrintPreviewClient />
    </Suspense>
  );
}
