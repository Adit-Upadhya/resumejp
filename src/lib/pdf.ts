import type { TemplateMeta } from "./templates";

/**
 * Rasterises an on-screen sheet element to a single-page PDF sized to the
 * given template and triggers a download. Shared by the editor's "Download
 * PDF" / "Download template" actions and the landing-page template gallery.
 *
 * The element is captured at its natural (un-transformed) size so the output
 * matches the real form dimensions regardless of any preview scaling.
 */
export async function downloadSheetPdf(
  el: HTMLElement,
  meta: TemplateMeta,
  filename: string,
): Promise<void> {
  const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
    import("html2canvas"),
    import("jspdf"),
  ]);

  const savedTransform = el.style.transform;
  el.style.transform = "none";

  let canvas: HTMLCanvasElement;
  try {
    canvas = await html2canvas(el, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: "#ffffff",
    });
  } finally {
    el.style.transform = savedTransform;
  }

  const pdf = new jsPDF({
    orientation: meta.orientation === "landscape" ? "landscape" : "portrait",
    unit: "mm",
    format: meta.paper.toLowerCase() as "a3" | "a4",
  });

  const imgData = canvas.toDataURL("image/jpeg", 0.97);
  pdf.addImage(imgData, "JPEG", 0, 0, meta.widthMm, meta.heightMm);

  const blob = pdf.output("blob");
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
