"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  Download,
  Edit3,
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
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resume: data, template }),
      });
      if (!res.ok) {
        const msg = await res.text().catch(() => `PDF generation failed (${res.status})`);
        throw new Error(msg || `PDF generation failed (${res.status})`);
      }
      const blob = await res.blob();
      saveBlob(blob, "rirekisho.pdf");
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
      <div className="flex items-center gap-3">
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <span className="text-muted-foreground">·</span>
        <span className="font-medium tracking-tight">
          <span className="font-jp mr-2">履歴書</span>Builder
        </span>
        <span className="ml-2 hidden sm:inline-flex items-center gap-1 text-[11px] text-muted-foreground">
          <Save className="h-3 w-3" /> Autosaved
        </span>
      </div>
      <div className="flex items-center gap-2">
        <Button size="sm" variant="ghost" onClick={onSample}>
          Load sample
        </Button>
        <Button size="sm" variant="outline" onClick={onImport}>
          <Upload className="h-3.5 w-3.5" /> Import
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
          Translate
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

      <div className="mx-auto max-w-6xl px-3 lg:px-6 py-3 flex items-center gap-3">
        {/* Quick prev button */}
        <button
          onClick={() => prevStep && onJump(prevStep.key)}
          disabled={!prevStep}
          aria-label="Previous step"
          className="hidden sm:flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowLeft className="h-4 w-4" />
        </button>

        {/* Steps */}
        <div className="flex-1 overflow-x-auto">
          <ol className="flex items-center gap-1 min-w-max">
            {STEPS.map((s, i) => {
              const isDone = i < currentIndex;
              const isActive = i === currentIndex;
              return (
                <li key={s.key} className="flex items-center">
                  <button
                    onClick={() => onJump(s.key)}
                    title={`${s.label} · ${s.jp}`}
                    className={`group flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all ${
                      isActive
                        ? "bg-zinc-900 text-white shadow-sm"
                        : isDone
                          ? "text-zinc-700 hover:bg-emerald-50 hover:text-emerald-900"
                          : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
                    }`}
                  >
                    <span
                      className={`flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-[11px] font-semibold ${
                        isActive
                          ? "bg-white text-zinc-900"
                          : isDone
                            ? "bg-emerald-500 text-white"
                            : "bg-zinc-200 text-zinc-500 group-hover:bg-zinc-300"
                      }`}
                    >
                      {isDone ? <Check className="h-3.5 w-3.5" strokeWidth={3} /> : i + 1}
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
                    <ChevronRight className="h-3.5 w-3.5 text-zinc-300 mx-0.5 flex-shrink-0" />
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
          className="hidden sm:flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-lg border bg-white text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
        >
          <ArrowRight className="h-4 w-4" />
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
}: {
  data: import("@/lib/schema").Resume;
  template: import("@/lib/templates").TemplateKey;
  onBack: () => void;
  onEdit: () => void;
  onDownloadPdf: () => void;
  busy: null | "translate" | "pdf" | "tex";
}) {
  const meta = TEMPLATES[template];
  return (
    <div className="flex flex-col">
      <div className="border-b bg-white px-4 lg:px-8 py-4">
        <div className="mx-auto max-w-6xl flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-lg font-semibold">Review your resume</h1>
            <p className="text-sm text-muted-foreground">
              Using <span className="font-medium">{meta.name}</span>
              <span className="font-jp ml-1">({meta.jp})</span> · {meta.paper}{" "}
              {meta.orientation}. Check the details below — if anything&apos;s off,
              click <em>Edit</em>.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" onClick={onBack} className="gap-2">
              <ArrowLeft className="h-4 w-4" /> Back
            </Button>
            <Button variant="outline" onClick={onEdit} className="gap-2">
              <Edit3 className="h-4 w-4" /> Edit
            </Button>
            <Button onClick={onDownloadPdf} disabled={busy === "pdf"} className="gap-2">
              {busy === "pdf" ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Download className="h-4 w-4" />
              )}
              Download PDF
            </Button>
          </div>
        </div>
      </div>

      <div className="flex-1 bg-zinc-200 py-8 px-4 lg:px-8">
        <div className="mx-auto max-w-6xl">
          <Preview data={data} template={template} />
        </div>
      </div>

      <div className="border-t bg-white px-4 lg:px-8 py-4">
        <div className="mx-auto max-w-6xl flex items-center justify-between">
          <Button variant="outline" onClick={onBack} className="gap-2">
            <ArrowLeft className="h-4 w-4" /> Back to editing
          </Button>
          <Button onClick={onDownloadPdf} disabled={busy === "pdf"} className="gap-2">
            {busy === "pdf" ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Download className="h-4 w-4" />
            )}
            Download PDF
          </Button>
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
