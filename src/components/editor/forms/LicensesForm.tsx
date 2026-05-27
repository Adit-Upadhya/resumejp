"use client";

import { Input } from "@/components/ui/input";
import type { LicenseEntry, Resume } from "@/lib/schema";
import { newId } from "@/lib/schema";
import { FormSection } from "./Field";
import { RowList } from "./RowList";

interface Props {
  data: Resume;
  setData: React.Dispatch<React.SetStateAction<Resume>>;
}

export function LicensesForm({ data, setData }: Props) {
  function setLic(updater: (rows: LicenseEntry[]) => LicenseEntry[]) {
    setData((prev) => ({ ...prev, licenses: updater(prev.licenses) }));
  }
  return (
    <FormSection
      title="Licenses & qualifications · 免許・資格"
      description="JLPT, driving licence, certifications, etc."
    >
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
        addLabel="Add license"
        renderItem={(item, update) => (
          <div className="grid grid-cols-12 gap-2">
            <Input
              className="col-span-3"
              placeholder="2012"
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
