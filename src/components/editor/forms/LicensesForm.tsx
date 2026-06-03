"use client";

import { Input } from "@/components/ui/input";
import type { LicenseEntry, Resume } from "@/lib/schema";
import { newId } from "@/lib/schema";
import { useEditorI18n } from "@/lib/i18n";
import { FormSection } from "./Field";
import { RowList } from "./RowList";

interface Props {
  data: Resume;
  setData: React.Dispatch<React.SetStateAction<Resume>>;
}

export function LicensesForm({ data, setData }: Props) {
  const { copy } = useEditorI18n();
  const c = copy.licenses;
  function setLic(updater: (rows: LicenseEntry[]) => LicenseEntry[]) {
    setData((prev) => ({ ...prev, licenses: updater(prev.licenses) }));
  }
  return (
    <FormSection title={c.title} description={c.description}>
      <RowList<LicenseEntry>
        items={data.licenses}
        onAdd={() => setLic((r) => [...r, { id: newId(), year: "", month: "", name: "" }])}
        onRemove={(id) => setLic((r) => r.filter((x) => x.id !== id))}
        onUpdate={(id, patch) =>
          setLic((r) => r.map((x) => (x.id === id ? { ...x, ...patch } : x)))
        }
        onMove={(from, to) =>
          setLic((r) => {
            const next = [...r];
            const [m] = next.splice(from, 1);
            next.splice(to, 0, m);
            return next;
          })
        }
        addLabel={c.add}
        renderItem={(item, update) => (
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Input
                className="w-24 shrink-0"
                placeholder="2012"
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
              placeholder="JLPT N2試験合格"
              value={item.name}
              onChange={(e) => update({ name: e.target.value })}
            />
          </div>
        )}
      />
    </FormSection>
  );
}
