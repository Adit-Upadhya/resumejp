"use client";

import type { Resume } from "@/lib/schema";
import type { TemplateKey } from "@/lib/templates";
import { RirekishoSheet } from "./RirekishoSheet";
import { JisA4Sheet } from "./JisA4Sheet";
import { MhlwSheet } from "./MhlwSheet";
import { ModernSheet } from "./ModernSheet";

/**
 * Dispatches to the right sheet component for the selected template.
 * Used by the preview pane and by the headless print page.
 */
export function Sheet({ template, data }: { template: TemplateKey; data: Resume }) {
  switch (template) {
    case "jis-a4":
      return <JisA4Sheet data={data} />;
    case "mhlw-a4":
      return <MhlwSheet data={data} />;
    case "modern-a4":
      return <ModernSheet data={data} />;
    case "jis-a3":
    default:
      return <RirekishoSheet data={data} />;
  }
}
