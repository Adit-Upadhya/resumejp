"use client";

import type { Resume } from "@/lib/schema";
import type { TemplateKey } from "@/lib/templates";
import {
  DEFAULT_SHEET_STYLE,
  sheetStyleVars,
  type SheetStyle,
} from "@/lib/sheet-style";
import { RirekishoSheet } from "./RirekishoSheet";
import { JisA4Sheet } from "./JisA4Sheet";
import { MhlwSheet } from "./MhlwSheet";
import { ModernSheet } from "./ModernSheet";

/**
 * Dispatches to the right sheet component for the selected template.
 * Used by the preview pane and by the headless print page.
 *
 * The optional `style` (font + boldness) is converted to inline CSS custom
 * properties and handed to whichever sheet renders, so the user's typography
 * choice applies to both the preview and the captured PDF.
 */
export function Sheet({
  template,
  data,
  style = DEFAULT_SHEET_STYLE,
}: {
  template: TemplateKey;
  data: Resume;
  style?: SheetStyle;
}) {
  const styleVars = sheetStyleVars(style);
  switch (template) {
    case "jis-a4":
      return <JisA4Sheet data={data} styleVars={styleVars} />;
    case "mhlw-a4":
      return <MhlwSheet data={data} styleVars={styleVars} />;
    case "modern-a4":
      return <ModernSheet data={data} styleVars={styleVars} />;
    case "jis-a3":
    default:
      return <RirekishoSheet data={data} styleVars={styleVars} />;
  }
}
