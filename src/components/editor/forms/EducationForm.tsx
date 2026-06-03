"use client";

import { Input } from "@/components/ui/input";
import type { HistoryEntry, Resume } from "@/lib/schema";
import { newId } from "@/lib/schema";
import { useEditorI18n } from "@/lib/i18n";
import { FormSection } from "./Field";
import { RowList } from "./RowList";

interface Props {
  data: Resume;
  setData: React.Dispatch<React.SetStateAction<Resume>>;
}

export function EducationForm({ data, setData }: Props) {
  const { copy } = useEditorI18n();
  const c = copy.education;
  function setEdu(updater: (rows: HistoryEntry[]) => HistoryEntry[]) {
    setData((prev) => ({ ...prev, education: updater(prev.education) }));
  }
  return (
    <FormSection title={c.title} description={c.description}>
      <RowList<HistoryEntry>
        items={data.education}
        onAdd={() =>
          setEdu((r) => [...r, { id: newId(), year: "", month: "", content: "" }])
        }
        onRemove={(id) => setEdu((r) => r.filter((x) => x.id !== id))}
        onUpdate={(id, patch) =>
          setEdu((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)))
        }
        onMove={(from, to) =>
          setEdu((r) => {
            const next = [...r];
            const [m] = next.splice(from, 1);
            next.splice(to, 0, m);
            return next;
          })
        }
        addLabel={c.add}
        empty={<EmptyHint>{c.empty}</EmptyHint>}
        renderItem={(item, update) => (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                className="w-24 shrink-0"
                placeholder="2008"
                inputMode="numeric"
                value={item.year}
                onChange={(e) => update({ year: e.target.value })}
              />
              <Input
                className="w-16 shrink-0"
                placeholder="4"
                inputMode="numeric"
                value={item.month}
                onChange={(e) => update({ month: e.target.value })}
              />
            </div>
            <Input
              placeholder="○○高等学校 卒業"
              value={item.content}
              onChange={(e) => update({ content: e.target.value })}
            />
          </div>
        )}
      />
    </FormSection>
  );
}

function EmptyHint({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-md border border-dashed bg-zinc-50 p-4 text-center text-sm text-muted-foreground">
      {children}
    </div>
  );
}
