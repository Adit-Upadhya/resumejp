"use client";

import { Input } from "@/components/ui/input";
import type { HistoryEntry, Resume } from "@/lib/schema";
import { newId } from "@/lib/schema";
import { FormSection } from "./Field";
import { RowList } from "./RowList";

interface Props {
  data: Resume;
  setData: React.Dispatch<React.SetStateAction<Resume>>;
}

export function EducationForm({ data, setData }: Props) {
  function setEdu(updater: (rows: HistoryEntry[]) => HistoryEntry[]) {
    setData((prev) => ({ ...prev, education: updater(prev.education) }));
  }
  return (
    <FormSection
      title="Education · 学歴"
      description="Add one row per milestone. Enter dates and a single line of free text. Order matches the rendered table (oldest at top)."
    >
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
        addLabel="Add education row"
        empty={<EmptyHint>No education yet — add your first school.</EmptyHint>}
        renderItem={(item, update) => (
          <div className="grid grid-cols-12 gap-2">
            <Input
              className="col-span-3"
              placeholder="2008"
              value={item.year}
              onChange={(e) => update({ year: e.target.value })}
            />
            <Input
              className="col-span-2"
              placeholder="4"
              value={item.month}
              onChange={(e) => update({ month: e.target.value })}
            />
            <Input
              className="col-span-7"
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
