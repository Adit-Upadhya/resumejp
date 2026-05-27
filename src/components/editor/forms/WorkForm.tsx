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

export function WorkForm({ data, setData }: Props) {
  function setWork(updater: (rows: HistoryEntry[]) => HistoryEntry[]) {
    setData((prev) => ({ ...prev, work: updater(prev.work) }));
  }

  return (
    <FormSection
      title="Work history · 職歴"
      description="Each row is one line in the 職歴 table. Use entries like '株式会社○○ 入社' and '一身上の都合により退社'. End with '現在に至る'."
    >
      <RowList<HistoryEntry>
        items={data.work}
        onAdd={() => setWork((r) => [...r, { id: newId(), year: "", month: "", content: "" }])}
        onRemove={(id) => setWork((r) => r.filter((x) => x.id !== id))}
        onUpdate={(id, patch) =>
          setWork((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)))
        }
        onMove={(from, to) =>
          setWork((r) => {
            const next = [...r];
            const [m] = next.splice(from, 1);
            next.splice(to, 0, m);
            return next;
          })
        }
        addLabel="Add work row"
        renderItem={(item, update) => (
          <div className="grid grid-cols-12 gap-2">
            <Input
              className="col-span-3"
              placeholder="2016"
              value={item.year}
              onChange={(e) => update({ year: e.target.value })}
            />
            <Input
              className="col-span-2"
              placeholder="9"
              value={item.month}
              onChange={(e) => update({ month: e.target.value })}
            />
            <Input
              className="col-span-7"
              placeholder="株式会社○○ 入社"
              value={item.content}
              onChange={(e) => update({ content: e.target.value })}
            />
          </div>
        )}
      />
    </FormSection>
  );
}
