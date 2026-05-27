"use client";

import { Check } from "lucide-react";
import type { TemplateKey } from "@/lib/templates";
import { TEMPLATE_LIST } from "@/lib/templates";
import { FormSection } from "./forms/Field";

interface Props {
  value: TemplateKey;
  onChange: (key: TemplateKey) => void;
}

export function TemplatePicker({ value, onChange }: Props) {
  return (
    <FormSection
      title="Choose a template"
      description="Pick the layout you want. You can change this at any time from the Template step — your form data is preserved."
    >
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {TEMPLATE_LIST.map((t) => {
          const active = t.key === value;
          return (
            <button
              key={t.key}
              type="button"
              onClick={() => onChange(t.key)}
              className={`group relative rounded-lg border p-4 text-left transition-all ${
                active
                  ? "border-zinc-900 ring-1 ring-zinc-900 bg-zinc-50"
                  : "border-zinc-200 hover:border-zinc-400 bg-white"
              }`}
            >
              <div className="flex items-start justify-between gap-3">
                <div>
                  <div className="font-medium text-sm">{t.name}</div>
                  <div className="text-xs font-jp text-muted-foreground mt-0.5">{t.jp}</div>
                </div>
                {active && (
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-900 text-white">
                    <Check className="h-3 w-3" />
                  </span>
                )}
              </div>
              <p className="mt-2 text-xs text-muted-foreground leading-relaxed">
                {t.description}
              </p>
              <div className="mt-3 flex items-center gap-2 text-[10px] uppercase tracking-wider text-muted-foreground">
                <span>{t.paper}</span>
                <span>·</span>
                <span>{t.orientation}</span>
              </div>
              <ThumbPreview templateKey={t.key} />
            </button>
          );
        })}
      </div>
    </FormSection>
  );
}

/**
 * Tiny visual hint of each template's structure. Pure CSS — no real
 * Resume render — so the picker stays light.
 */
function ThumbPreview({ templateKey }: { templateKey: TemplateKey }) {
  return (
    <div className="mt-3 rounded border border-zinc-200 bg-white p-2 h-20 overflow-hidden">
      {templateKey === "jis-a3" && (
        <div className="h-full grid grid-cols-2 gap-1">
          <div className="space-y-0.5">
            <div className="h-2 bg-zinc-200 rounded-sm" />
            <div className="h-1 bg-zinc-100 rounded-sm w-2/3" />
            <div className="h-1 bg-zinc-100 rounded-sm" />
            <div className="h-1 bg-zinc-100 rounded-sm" />
            <div className="h-1 bg-zinc-100 rounded-sm" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 bg-zinc-100 rounded-sm" />
            <div className="h-1 bg-zinc-100 rounded-sm" />
            <div className="h-1 bg-zinc-100 rounded-sm" />
            <div className="h-3 bg-zinc-100 rounded-sm mt-1" />
          </div>
        </div>
      )}
      {templateKey === "jis-a4" && (
        <div className="h-full flex flex-col gap-0.5">
          <div className="h-2 bg-zinc-200 rounded-sm w-1/3" />
          <div className="flex gap-1">
            <div className="flex-1 space-y-0.5">
              <div className="h-1 bg-zinc-100 rounded-sm" />
              <div className="h-1 bg-zinc-100 rounded-sm" />
              <div className="h-1 bg-zinc-100 rounded-sm w-3/4" />
            </div>
            <div className="w-6 h-7 bg-zinc-100 rounded-sm" />
          </div>
          <div className="h-1 bg-zinc-100 rounded-sm mt-1" />
          <div className="h-1 bg-zinc-100 rounded-sm" />
        </div>
      )}
      {templateKey === "mhlw-a4" && (
        <div className="h-full flex flex-col gap-0.5">
          <div className="h-2 bg-zinc-200 rounded-sm w-1/3" />
          <div className="flex gap-1">
            <div className="flex-1 space-y-0.5">
              <div className="h-1 bg-zinc-100 rounded-sm w-2/3" />
              <div className="h-1 bg-zinc-100 rounded-sm" />
            </div>
            <div className="w-5 h-6 bg-zinc-100 rounded-sm" />
          </div>
          <div className="grid grid-cols-3 gap-0.5 mt-1">
            <div className="h-1 bg-zinc-100 rounded-sm" />
            <div className="h-1 bg-zinc-100 rounded-sm col-span-2" />
            <div className="h-1 bg-zinc-100 rounded-sm" />
            <div className="h-1 bg-zinc-100 rounded-sm col-span-2" />
          </div>
        </div>
      )}
      {templateKey === "modern-a4" && (
        <div className="h-full flex flex-col gap-1">
          <div className="flex gap-1 items-start border-b border-zinc-300 pb-1">
            <div className="flex-1 space-y-0.5">
              <div className="h-2 bg-zinc-300 rounded-sm w-1/2" />
              <div className="h-1 bg-zinc-100 rounded-sm w-2/3" />
            </div>
            <div className="w-5 h-6 bg-zinc-100 rounded-sm" />
          </div>
          <div className="space-y-0.5">
            <div className="h-1 bg-zinc-300 rounded-sm w-1/4" />
            <div className="h-1 bg-zinc-100 rounded-sm" />
            <div className="h-1 bg-zinc-100 rounded-sm w-5/6" />
          </div>
        </div>
      )}
    </div>
  );
}
