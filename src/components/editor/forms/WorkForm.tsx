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

export function WorkForm({ data, setData }: Props) {
  const { copy } = useEditorI18n();
  const c = copy.work;
  function setWork(updater: (rows: HistoryEntry[]) => HistoryEntry[]) {
    setData((prev) => ({ ...prev, work: updater(prev.work) }));
  }

  return (
    <FormSection title={c.title} description={c.description}>
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
        addLabel={c.add}
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
