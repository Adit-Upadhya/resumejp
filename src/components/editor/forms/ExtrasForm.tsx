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
import { Field, FormSection } from "./Field";

interface Props {
  data: Resume;
  setData: React.Dispatch<React.SetStateAction<Resume>>;
}

export function ExtrasForm({ data, setData }: Props) {
  const e = data.extras;
  function update<K extends keyof Resume["extras"]>(key: K, value: Resume["extras"][K]) {
    setData((prev) => ({ ...prev, extras: { ...prev.extras, [key]: value } }));
  }
  return (
    <div className="space-y-6">
      <FormSection
        title="Self PR · 特技・自己PR"
        description="Strengths, motivation, why you want to join. 3–4 sentences in business Japanese."
      >
        <Field label="特技、自己PRなど">
          <Textarea
            rows={6}
            value={e.selfPr}
            onChange={(ev) => update("selfPr", ev.target.value)}
            placeholder="フロントエンドからバックエンドまでフルスタックエンジニアとして開発経験..."
          />
        </Field>
      </FormSection>

      <FormSection title="Commute & family">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Field label="Commute time (通勤時間)">
            <Input
              value={e.commuteTime}
              onChange={(ev) => update("commuteTime", ev.target.value)}
              placeholder="約45分"
            />
          </Field>
          <Field label="Dependents excl. spouse (扶養家族)">
            <Input
              value={e.dependents}
              onChange={(ev) => update("dependents", ev.target.value)}
              placeholder="2 人"
            />
          </Field>
          <Field label="Spouse (配偶者)">
            <Select value={e.hasSpouse || undefined} onValueChange={(v) => update("hasSpouse", v as "yes" | "no")}>
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">有 / Yes</SelectItem>
                <SelectItem value="no">無 / No</SelectItem>
              </SelectContent>
            </Select>
          </Field>
          <Field label="Spouse support obligation (配偶者の扶養義務)">
            <Select
              value={e.spouseSupport || undefined}
              onValueChange={(v) => update("spouseSupport", v as "yes" | "no")}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="yes">有 / Yes</SelectItem>
                <SelectItem value="no">無 / No</SelectItem>
              </SelectContent>
            </Select>
          </Field>
        </div>
      </FormSection>

      <FormSection
        title="Personal preference · 本人希望記入欄"
        description="Salary, location, hours, etc. Many candidates simply write 「貴社の規定に従います。」"
      >
        <Field label="本人希望記入欄">
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
