/**
 * Pure-CSS preview thumbnail of a rirekisho layout. Renders a stylised mini
 * form (name lines, photo cell, ruled rows) so every template card shows a
 * recognisable "picture" without shipping image assets. The accent hue and
 * paper aspect ratio come from the catalog entry.
 */
export function TemplateThumb({
  orientation,
  hue,
  paper,
}: {
  orientation: "portrait" | "landscape";
  hue: number;
  paper: "A3" | "A4";
}) {
  const accent = `hsl(${hue} 68% 46%)`;
  const soft = `hsl(${hue} 45% 94%)`;
  const aspectRatio = orientation === "landscape" ? "420 / 297" : "210 / 297";

  return (
    <div
      className="w-full overflow-hidden rounded-md border bg-gradient-to-b from-white to-zinc-50"
      style={{ aspectRatio }}
    >
      <div className="flex h-full w-full flex-col gap-[5%] p-[7%]">
        {/* Header: name lines + photo cell */}
        <div className="flex items-start justify-between gap-[6%]">
          <div className="flex-1 space-y-[7px]">
            <div className="h-[6px] w-1/2 rounded" style={{ background: accent }} />
            <div className="h-[4px] w-3/4 rounded bg-zinc-200" />
            <div className="h-[4px] w-2/3 rounded bg-zinc-200" />
          </div>
          <div
            className="rounded-[2px] border"
            style={{ width: "22%", aspectRatio: "3 / 4", background: soft, borderColor: accent }}
          />
        </div>

        {/* Ruled rows with section ticks */}
        <div className="flex flex-1 flex-col justify-between pt-[3%]">
          {Array.from({ length: 7 }).map((_, i) => (
            <div key={i} className="flex items-center gap-[4%]">
              <div
                className="h-[4px] rounded"
                style={{ width: i % 3 === 0 ? "20%" : "12%", background: i % 3 === 0 ? accent : "#d4d4d8" }}
              />
              <div className="h-px flex-1 bg-zinc-200" />
            </div>
          ))}
        </div>

        {/* Paper tag */}
        <div className="flex justify-end">
          <span
            className="rounded-sm px-[6px] py-[2px] text-[8px] font-semibold leading-none text-white"
            style={{ background: accent }}
          >
            {paper}
          </span>
        </div>
      </div>
    </div>
  );
}
