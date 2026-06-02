"use client";

import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { Resume } from "@/lib/schema";
import { useEditorI18n } from "@/lib/i18n";
import { Field, FormSection } from "./Field";

interface Props {
  data: Resume;
  setData: React.Dispatch<React.SetStateAction<Resume>>;
}

export function ExtrasForm({ data, setData }: Props) {
  const e = data.extras;
  const { copy } = useEditorI18n();
  const c = copy.extras;
  function update<K extends keyof Resume["extras"]>(key: K, value: Resume["extras"][K]) {
    setData((prev) => ({ ...prev, extras: { ...prev.extras, [key]: value } }));
  }
  return (
    <div className="space-y-6">
      <FormSection title={c.selfPrSection} description={c.selfPrDesc}>
        <Field label={c.selfPrLabel}>
          <Textarea
            rows={6}
            value={e.selfPr}
            onChange={(ev) => update("selfPr", ev.target.value)}
            placeholder="フロントエンドからバックエンドまでフルスタックエンジニアとして開発経験..."
          />
        </Field>
      </FormSection>

      <FormSection title={c.commuteSection}>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label={c.commuteTime}>
            <Input
              value={e.commuteTime}
              onChange={(ev) => update("commuteTime", ev.target.value)}
              placeholder="約45分"
            />
          </Field>
          <Field label={c.dependents}>
            <Input
              value={e.dependents}
              onChange={(ev) => update("dependents", ev.target.value)}
              placeholder="2 人"
            />
          </Field>
          <Field label={c.spouse}>
            <Select value={e.hasSpouse || undefined} onValueChange={(v) => update("hasSpouse", v as "yes" | "no")}>
              <SelectTrigger>
                <SelectValue placeholder={c.select} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">{c.yes}</SelectItem>
                <SelectItem value="no">{c.no}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label={c.spouseSupport}>
            <Select
              value={e.spouseSupport || undefined}
              onValueChange={(v) => update("spouseSupport", v as "yes" | "no")}
            >
              <SelectTrigger>
                <SelectValue placeholder={c.select} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">{c.yes}</SelectItem>
                <SelectItem value="no">{c.no}</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FormSection>

      <FormSection title={c.prefSection} description={c.prefDesc}>
        <Field label={c.prefLabel}>
          <Textarea
            rows={5}
            value={e.preferences}
            onChange={(ev) => update("preferences", ev.target.value)}
            placeholder="貴社の規定に従います。"
          />
        </Field>
      </FormSection>
    </div>
  );
}
