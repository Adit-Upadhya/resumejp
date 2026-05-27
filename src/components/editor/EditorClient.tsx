"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  Download,
  FileJson,
  FileText,
  Loader2,
  Save,
  Upload,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useLocalResume } from "@/lib/storage";
import { PersonalForm } from "./forms/PersonalForm";
import { EducationForm } from "./forms/EducationForm";
import { WorkForm } from "./forms/WorkForm";
import { LicensesForm } from "./forms/LicensesForm";
import { ExtrasForm } from "./forms/ExtrasForm";
import { Preview } from "./Preview";
import { translateResume } from "@/lib/translate-client";
import { sampleResume } from "@/lib/sample";
import { toast } from "sonner";
import "@/components/rirekisho/sheet.css";

type SectionKey = "personal" | "education" | "work" | "licenses" | "extras";

export function EditorClient() {
  const [data, setData, hydrated] = useLocalResume();
  const [section, setSection] = useState<SectionKey>("personal");
  const [busy, setBusy] = useState<null | "translate" | "pdf" | "tex">(null);

  if (!hydrated) {
    return (
      <div className="flex h-screen items-center justify-center">
        <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
      </div>
    );
  }

  async function downloadPdf() {
    setBusy("pdf");
    try {
      const res = await fetch("/api/pdf", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resume: data }),
      });
      if (!res.ok) throw new Error(`PDF generation failed (${res.status})`);
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

  async function downloadTex() {
    setBusy("tex");
    try {
      const res = await fetch("/api/tex", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ resume: data }),
      });
      if (!res.ok) throw new Error("TeX export failed");
      const blob = await res.blob();
      saveBlob(blob, "rirekisho.tex");
      toast.success("XeLaTeX source downloaded");
    } catch (e) {
      console.error(e);
      toast.error(e instanceof Error ? e.message : "Failed to export TeX");
    } finally {
      setBusy(null);
    }
  }

  function downloadJson() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
    saveBlob(blob, "rirekisho.json");
    toast.success("JSON backup downloaded");
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
    <div className="flex h-screen flex-col bg-zinc-50">
      <Header
        onTranslate={translateAll}
        onPdf={downloadPdf}
        onTex={downloadTex}
        onJson={downloadJson}
        onImport={importJson}
        onSample={loadSample}
        busy={busy}
      />

      <div className="flex flex-1 overflow-hidden">
        {/* Left rail */}
        <aside className="hidden lg:flex w-56 flex-col border-r bg-white">
          <div className="p-4 border-b">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Sections
            </p>
          </div>
          <nav className="p-2 space-y-0.5 text-sm">
            <NavItem active={section === "personal"} onClick={() => setSection("personal")}>
              Personal info
            </NavItem>
            <NavItem active={section === "education"} onClick={() => setSection("education")}>
              Education · 学歴
            </NavItem>
            <NavItem active={section === "work"} onClick={() => setSection("work")}>
              Work · 職歴
            </NavItem>
            <NavItem active={section === "licenses"} onClick={() => setSection("licenses")}>
              Licenses · 免許・資格
            </NavItem>
            <NavItem active={section === "extras"} onClick={() => setSection("extras")}>
              Self-PR · Preferences
            </NavItem>
          </nav>
          <div className="mt-auto p-3 text-[11px] text-muted-foreground">
            Autosaved locally. Nothing leaves your browser unless you click <em>Translate</em> or{" "}
            <em>Download PDF</em>.
          </div>
        </aside>

        {/* Center form */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8">
          <div className="mx-auto max-w-2xl">
            {/* Mobile tabs */}
            <div className="lg:hidden mb-4">
              <Tabs value={section} onValueChange={(v) => setSection(v as SectionKey)}>
                <TabsList className="w-full grid grid-cols-5">
                  <TabsTrigger value="personal">Info</TabsTrigger>
                  <TabsTrigger value="education">Edu</TabsTrigger>
                  <TabsTrigger value="work">Work</TabsTrigger>
                  <TabsTrigger value="licenses">License</TabsTrigger>
                  <TabsTrigger value="extras">Extra</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={section}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -6 }}
                transition={{ duration: 0.2 }}
              >
                {section === "personal" && <PersonalForm data={data} setData={setData} />}
                {section === "education" && <EducationForm data={data} setData={setData} />}
                {section === "work" && <WorkForm data={data} setData={setData} />}
                {section === "licenses" && <LicensesForm data={data} setData={setData} />}
                {section === "extras" && <ExtrasForm data={data} setData={setData} />}
              </motion.div>
            </AnimatePresence>
          </div>
        </main>

        {/* Right preview */}
        <aside className="hidden xl:flex w-[720px] 2xl:w-[860px] flex-col border-l bg-zinc-100">
          <div className="px-4 py-3 border-b bg-white flex items-center justify-between">
            <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
              Live preview · A3 landscape
            </span>
            <Link
              href="/preview"
              target="_blank"
              className="text-xs text-muted-foreground hover:text-foreground"
            >
              Open full size →
            </Link>
          </div>
          <div className="flex-1 overflow-auto p-4">
            <Preview data={data} fitWidth />
          </div>
        </aside>
      </div>
    </div>
  );
}

function Header({
  onTranslate,
  onPdf,
  onTex,
  onJson,
  onImport,
  onSample,
  busy,
}: {
  onTranslate: () => void;
  onPdf: () => void;
  onTex: () => void;
  onJson: () => void;
  onImport: () => void;
  onSample: () => void;
  busy: null | "translate" | "pdf" | "tex";
}) {
  return (
    <header className="flex h-14 items-center justify-between border-b bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground">
          <ArrowLeft className="h-3.5 w-3.5" />
          Home
        </Link>
        <span className="text-muted-foreground">·</span>
        <span className="font-medium tracking-tight">
          <span className="font-jp mr-2">履歴書</span>Editor
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
        <Button size="sm" variant="outline" onClick={onJson}>
          <FileJson className="h-3.5 w-3.5" /> JSON
        </Button>
        <Button size="sm" variant="outline" onClick={onTex} disabled={busy === "tex"}>
          {busy === "tex" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <FileText className="h-3.5 w-3.5" />}
          .tex
        </Button>
        <Button size="sm" variant="secondary" onClick={onTranslate} disabled={busy === "translate"}>
          {busy === "translate" ? (
            <Loader2 className="h-3.5 w-3.5 animate-spin" />
          ) : (
            <span className="font-jp text-[11px]">あ→日</span>
          )}
          Translate
        </Button>
        <Button size="sm" onClick={onPdf} disabled={busy === "pdf"}>
          {busy === "pdf" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Download className="h-3.5 w-3.5" />}
          PDF
        </Button>
      </div>
    </header>
  );
}

function NavItem({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left rounded-md px-3 py-2 transition-colors ${
        active ? "bg-zinc-900 text-white" : "text-muted-foreground hover:bg-zinc-100 hover:text-foreground"
      }`}
    >
      {children}
    </button>
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
