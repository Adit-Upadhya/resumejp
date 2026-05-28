"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Edit3,
  Home,
  Loader2,
  Save,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLocalResume } from "@/lib/storage";
import { TEMPLATES } from "@/lib/templates";
import { useTemplate } from "@/lib/templates-hook";
import { PersonalForm } from "./forms/PersonalForm";
import { EducationForm } from "./forms/EducationForm";
import { WorkForm } from "./forms/WorkForm";
import { LicensesForm } from "./forms/LicensesForm";
import { ExtrasForm } from "./forms/ExtrasForm";
import { TemplatePicker } from "./TemplatePicker";
import { Preview } from "./Preview";
import { translateResume } from "@/lib/translate-client";
import { sampleResume } from "@/lib/sample";
import { toast } from "sonner";
import "@/components/rirekisho/sheet.css";

type StepKey =
  | "template"
  | "personal"
  | "education"
  | "work"
  | "licenses"
  | "extras"
  | "preview";

interface Step {
  key: StepKey;
  label: string;
  jp: string;
}

const STEPS: Step[] = [
  { key: "template", label: "Template", jp: "テンプレート" },
  { key: "personal", label: "Personal", jp: "基本情報" },
  { key: "education", label: "Education", jp: "学歴" },
  { key: "work", label: "Work", jp: "職歴" },
  { key: "licenses", label: "Licenses", jp: "免許・資格" },
  { key: "extras", label: "Self PR · Prefs", jp: "自己PR・希望" },
  { key: "preview", label: "Preview", jp: "確認" },
];

export function EditorClient() {
  const [data, setData, hydrated] = useLocalResume();
  const [template, setTemplate, tHydrated] = useTemplate();
  const [stepKey, setStepKey] = useState<StepKey>("template");
  const [busy, setBusy] = useState<null | "translate" | "pdf" | "tex">(null);
  const [downloaded, setDownloaded] = useState(false);

  if (!hydrated || !tHydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  const stepIndex = STEPS.findIndex((s) => s.key === stepKey);
  const isFirst = stepIndex === 0;
  const isLast = stepIndex === STEPS.length - 1;
  const isPreview = stepKey === "preview";

  function go(delta: number) {
    const next = Math.max(0, Math.min(STEPS.length - 1, stepIndex + delta));
    setStepKey(STEPS[next].key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  function jumpTo(key: StepKey) {
    setStepKey(key);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  async function downloadPdf() {
    setBusy("pdf");
    try {
      const el = document.querySelector<HTMLElement>("[data-sheet-capture]");
      if (!el) throw new Error("Sheet element not found — open the Preview step first.");

      const [{ default: html2canvas }, { jsPDF }] = await Promise.all([
        import("html2canvas"),
        import("jspdf"),
      ]);

      const meta = TEMPLATES[template];

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
      const filename = "rirekisho.pdf";
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = filename;
      document.body.appendChild(a);
      a.click();
      a.remove();
      URL.revokeObjectURL(url);

      setDownloaded(true);
      toast.success("PDF downloaded");
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Failed to generate PDF");
    } finally {
      setBusy(null);
    }
  }

  function importJson() {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "application/json";
    input.onchange = async () => {
      const file = input.files?.[0];
      if (!file) return;
      try {
        const json = JSON.parse(await file.text());
        setData(json);
        toast.success("Imported");
      } catch {
        toast.error("Invalid JSON file");
      }
    };
    input.click();
  }

  async function translateAll() {
    setBusy("translate");
    try {
      const translated = await translateResume(data);
      setData(translated);
      toast.success("Translated to Japanese");
    } catch (e) {
      console.error(e);
      toast.error(
        e instanceof Error ? e.message : "Translation failed — check ANTHROPIC_API_KEY",
      );
    } finally {
      setBusy(null);
    }
  }

  function loadSample() {
    setData(sampleResume());
    toast.success("Sample data loaded");
  }

  return (
    <div className="min-h-screen flex flex-col bg-zinc-50">
      <AnimatePresence>{busy === "pdf" && <PdfLoadingOverlay />}</AnimatePresence>
      <Header
        onImport={importJson}
        onSample={loadSample}
        onTranslate={translateAll}
        busy={busy}
      />

      <Stepper currentIndex={stepIndex} onJump={jumpTo} />

      <main className={`flex-1 ${isPreview ? "" : "px-4 lg:px-8 py-8"}`}>
        {isPreview ? (
          <PreviewStep
            data={data}
            template={template}
            onBack={() => jumpTo("extras")}
            onEdit={() => jumpTo("personal")}
            onDownloadPdf={downloadPdf}
            busy={busy}
            downloaded={downloaded}
            onResetDownload={() => setDownloaded(false)}
          />
        ) : (
          <div className="mx-auto max-w-3xl">
            <AnimatePresence mode="wait">
              <motion.div
                key={stepKey}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18 }}
              >
                {stepKey === "template" && (
                  <TemplatePicker value={template} onChange={setTemplate} />
                )}
                {stepKey === "personal" && <PersonalForm data={data} setData={setData} />}
                {stepKey === "education" && <EducationForm data={data} setData={setData} />}
                {stepKey === "work" && <WorkForm data={data} setData={setData} />}
                {stepKey === "licenses" && <LicensesForm data={data} setData={setData} />}
                {stepKey === "extras" && <ExtrasForm data={data} setData={setData} />}
              </motion.div>
            </AnimatePresence>

            <div className="mt-8 flex items-center justify-between">
              <Button
                variant="outline"
                onClick={() => go(-1)}
                disabled={isFirst}
                className="gap-2"
              >
                <ArrowLeft className="h-4 w-4" />
                Back
              </Button>

              <div className="text-xs text-muted-foreground">
                Step {stepIndex + 1} of {STEPS.length}
              </div>

              <Button onClick={() => go(1)} disabled={isLast} className="gap-2">
                {stepIndex === STEPS.length - 2 ? "Review" : "Next"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

function Header({
  onImport,
  onSample,
  onTranslate,
  busy,
}: {
  onImport: () => void;
  onSample: () => void;
  onTranslate: () => void;
  busy: null | "translate" | "pdf" | "tex";
}) {
  return (
    <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b bg-white px-4 lg:px-6">
      <div className="flex items-center gap-2 sm:gap-3 min-w-0">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground shrink-0"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          <span className="hidden xs:inline">Home</span>
        </Link>
        <span className="text-muted-foreground hidden sm:inline">·</span>
        <span className="font-medium tracking-tight text-sm hidden sm:inline truncate">
          <span className="font-jp mr-1.5">履歴書</span>Builder
        </span>
        <span className="ml-1 hidden lg:inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Save className="h-3 w-3" /> Autosaved
        </span>
      </div>
      <div className="flex items-center gap-1.5 sm:gap-2">
        <Button size="sm" variant="ghost" onClick={onSample} className="hidden sm:flex">
          Load sample
        </Button>
        <Button size="sm" variant="outline" onClick={onImport} className="hidden sm:flex">
          <Upload className="h-3.5 w-3.5" />
          <span className="hidden md:inline">Import</span>
        </Button>
        <Button
          size="sm"
          variant="secondary"
          onClick={onTranslate}
          disabled={busy === "translate"}
        >
          {busy === "translate" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <span className="font-jp text-[11px]">あ→日</span>
          )}
          <span className="hidden sm:inline">Translate</span>
        </Button>
      </div>
    </header>
  );
}

function Stepper({
  currentIndex,
  onJump,
}: {
  currentIndex: number;
  onJump: (key: StepKey) => void;
}) {
  const prevStep = currentIndex > 0 ? STEPS[currentIndex - 1] : null;
  const nextStep = currentIndex < STEPS.length - 1 ? STEPS[currentIndex + 1] : null;
  const progress = ((currentIndex + 1) / STEPS.length) * 100;

  return (
    <nav className="sticky top-14 z-20 bg-white border-b">
      {/* Progress bar */}
      <div className="h-1 w-full bg-zinc-100">
        <div
          className="h-full bg-zinc-900 transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      <div className="mx-auto max-w-6xl px-2 sm:px-3 lg:px-6 py-2 sm:py-3 flex items-center gap-2 sm:gap-3">
        {/* Quick prev button */}
        <button
          onClick={() => prevStep && onJump(prevStep.key)}
          disabled={!prevStep}
          aria-label="Previous step"
          className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg border bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>

        {/* Steps — scrollable on mobile */}
        <div className="flex-1 overflow-x-auto scrollbar-none">
          <ol className="flex items-center gap-0.5 sm:gap-1 min-w-max">
            {STEPS.map((s, i) => {
              const isDone = i < currentIndex;
              const isActive = i === currentIndex;
              return (
                <li key={s.key} className="flex items-center">
                  <button
                    onClick={() => onJump(s.key)}
                    title={`${s.label} · ${s.jp}`}
                    className={`group flex items-center gap-1.5 sm:gap-2 rounded-lg px-2 sm:px-3 py-1.5 sm:py-2 text-xs sm:text-sm transition-all ${
                      isActive
                        ? "bg-zinc-900 text-white shadow-sm"
                        : isDone
                          ? "text-zinc-700 hover:bg-emerald-50 hover:text-emerald-900"
                          : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
                    }`}
                  >
                    <span
                      className={`flex h-5 w-5 sm:h-6 sm:w-6 flex-shrink-0 items-center justify-center rounded-full text-[10px] sm:text-[11px] font-semibold ${
                        isActive
                          ? "bg-white text-zinc-900"
                          : isDone
                            ? "bg-emerald-500 text-white"
                            : "bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300"
                      }`}
                    >
                      {isDone ? <Check className="h-3 w-3 sm:h-3.5 sm:w-3.5" strokeWidth={3} /> : i + 1}
                    </span>
                    <span className="font-medium whitespace-nowrap">{s.label}</span>
                    <span
                      className={`font-jp text-[10px] hidden xl:inline ${
                        isActive ? "opacity-80" : "opacity-60"
                      }`}
                    >
                      {s.jp}
                    </span>
                  </button>
                  {i < STEPS.length - 1 && (
                    <ChevronRight className="h-3 w-3 sm:h-3.5 sm:w-3.5 text-zinc-300 mx-0 sm:mx-0.5 flex-shrink-0" />
                  )}
                </li>
              );
            })}
          </ol>
        </div>

        {/* Quick next button */}
        <button
          onClick={() => nextStep && onJump(nextStep.key)}
          disabled={!nextStep}
          aria-label="Next step"
          className="flex h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0 items-center justify-center rounded-lg border bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="h-3.5 w-3.5 sm:h-4 sm:w-4" />
        </button>
      </div>
    </nav>
  );
}

function PreviewStep({
  data,
  template,
  onBack,
  onEdit,
  onDownloadPdf,
  busy,
  downloaded,
  onResetDownload,
}: {
  data: import("@/lib/schema").Resume;
  template: import("@/lib/templates").TemplateKey;
  onBack: () => void;
  onEdit: () => void;
  onDownloadPdf: () => void;
  busy: null | "translate" | "pdf" | "tex";
  downloaded: boolean;
  onResetDownload: () => void;
}) {
  const meta = TEMPLATES[template];
  return (
    <div className="flex flex-col">
      {/* Top bar */}
      <div className="border-b bg-white px-4 lg:px-8 py-4">
        <div className="mx-auto max-w-6xl flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="min-w-0">
            <h1 className="text-base sm:text-lg font-semibold">Review your resume</h1>
            <p className="text-xs sm:text-sm text-muted-foreground">
              <span className="font-medium">{meta.name}</span>
              <span className="font-jp ml-1">({meta.jp})</span> · {meta.paper}{" "}
              {meta.orientation}
            </p>
          </div>
          <div className="flex items-center gap-2 flex-wrap">
            <Button variant="outline" size="sm" onClick={onBack} className="gap-1.5">
              <ArrowLeft className="h-3.5 w-3.5" /> Back
            </Button>
            <Button variant="outline" size="sm" onClick={onEdit} className="gap-1.5">
              <Edit3 className="h-3.5 w-3.5" /> Edit
            </Button>
            <Button
              size="sm"
              onClick={onDownloadPdf}
              disabled={busy === "pdf"}
              className="gap-1.5"
            >
              {busy === "pdf" ? (
                <Loader2 className="h-3.5 w-3.5 animate-spin" />
              ) : (
                <Download className="h-3.5 w-3.5" />
              )}
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      {/* Preview area */}
      <div className="flex-1 bg-zinc-200 py-6 px-3 sm:py-8 sm:px-4 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Preview data={data} template={template} />
        </div>
      </div>

      {/* Bottom action bar */}
      <div className="border-t bg-white px-4 lg:px-8 py-4">
        <div className="mx-auto max-w-6xl">
          <AnimatePresence mode="wait">
            {downloaded ? (
              <motion.div
                key="downloaded"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
              >
                <div className="flex items-center gap-2 text-emerald-600 text-sm font-medium">
                  <Check className="h-4 w-4" strokeWidth={3} />
                  PDF downloaded successfully
                </div>
                <div className="flex items-center gap-2 sm:ml-auto flex-wrap">
                  <Button
                    variant="outline"
                    onClick={() => { onResetDownload(); onDownloadPdf(); }}
                    disabled={busy === "pdf"}
                    className="gap-2 flex-1 sm:flex-none"
                  >
                    {busy === "pdf" ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Download className="h-4 w-4" />
                    )}
                    Download again
                  </Button>
                  <Button asChild className="gap-2 flex-1 sm:flex-none">
                    <Link href="/">
                      <Home className="h-4 w-4" />
                      Return to Home
                    </Link>
                  </Button>
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="actions"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
                className="flex items-center justify-between gap-3"
              >
                <Button variant="outline" onClick={onBack} className="gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  <span className="hidden sm:inline">Back to editing</span>
                  <span className="sm:hidden">Back</span>
                </Button>
                <Button
                  onClick={onDownloadPdf}
                  disabled={busy === "pdf"}
                  className="gap-2"
                >
                  {busy === "pdf" ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Download className="h-4 w-4" />
                  )}
                  Download PDF
                </Button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

function saveBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}

const PDF_MESSAGES = [
  "Rendering your resume…",
  "Loading Japanese fonts…",
  "Laying out your 履歴書…",
  "Generating PDF…",
  "Almost ready…",
];

function PdfLoadingOverlay() {
  const [msgIdx, setMsgIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setMsgIdx((i) => (i + 1) % PDF_MESSAGES.length), 2200);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm"
    >
      <motion.div
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.88, opacity: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 25 }}
        className="bg-white rounded-2xl p-8 shadow-2xl flex flex-col items-center gap-5 w-72"
      >
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ repeat: Infinity, duration: 1.4, ease: "easeInOut" }}
          className="text-5xl select-none"
        >
          📄
        </motion.div>

        <div className="text-center space-y-1.5">
          <p className="font-semibold text-base">Generating PDF</p>
          <AnimatePresence mode="wait">
            <motion.p
              key={msgIdx}
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.25 }}
              className="text-sm text-muted-foreground min-h-[1.25rem]"
            >
              {PDF_MESSAGES[msgIdx]}
            </motion.p>
          </AnimatePresence>
        </div>

        <div className="w-full h-1.5 bg-zinc-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-zinc-900 rounded-full"
            initial={{ width: "4%" }}
            animate={{ width: "88%" }}
            transition={{ duration: 14, ease: "easeOut" }}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
