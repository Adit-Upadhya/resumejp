"use client";

import { forwardRef } from "react";
import type { HistoryEntry, LicenseEntry, Resume } from "@/lib/schema";
import { formatDobJp, formatPostalCode } from "@/lib/utils";

/**
 * JIS-style 履歴書 condensed onto a single A4 portrait page.
 * Same fields as the A3 landscape sheet, but stacked vertically with
 * tighter row counts so everything fits in 210×297mm.
 */

const HISTORY_ROWS = 14;
const LICENSE_ROWS = 5;

function pad<T>(arr: T[], n: number, blank: () => T): T[] {
  const out = [...arr];
  while (out.length < n) out.push(blank());
  return out.slice(0, n);
}
function emptyHistory(): HistoryEntry {
  return { id: "_", year: "", month: "", content: "" };
}
function emptyLicense(): LicenseEntry {
  return { id: "_", year: "", month: "", name: "" };
}

export const JisA4Sheet = forwardRef<
  HTMLDivElement,
  { data: Resume; styleVars?: React.CSSProperties }
>(function JisA4Sheet({ data, styleVars }, ref) {
  const p = data.personal;
  const same = p.contactSameAsAbove;

  const rows: HistoryEntry[] = [];
  rows.push({ id: "h-edu", year: "", month: "", content: "__HEADER__学歴" });
  for (const e of data.education) rows.push(e);
  rows.push({ id: "h-work", year: "", month: "", content: "__HEADER__職歴" });
  for (const w of data.work) rows.push(w);
  rows.push({ id: "h-end", year: "", month: "", content: "__END__" });
  const history = pad(rows, HISTORY_ROWS, emptyHistory);
  const licenses = pad(data.licenses, LICENSE_ROWS, emptyLicense);

  return (
    <div ref={ref} className="rirekisho-root a4-root" style={styleVars}>
      <section className="page page-a4">
        <header className="page-head">
          <h1>履 歴 書</h1>
          <div className="as-of">{data.documentDate}</div>
        </header>

        <table className="ident">
          <colgroup>
            <col style={{ width: "16mm" }} />
            <col style={{ width: "30mm" }} />
            <col style={{ width: "32mm" }} />
            <col style={{ width: "22mm" }} />
            <col style={{ width: "44mm" }} />
            <col style={{ width: "30mm" }} />
          </colgroup>
          <tbody>
            <tr>
              <td className="lbl">ふりがな</td>
              <td className="ident-name-furi" colSpan={4}>{p.furiganaName}</td>
              <td rowSpan={3} className="photo-cell">
                {p.photoDataUrl ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={p.photoDataUrl} alt="" className="photo-img" />
                ) : (
                  <div className="photo-placeholder">
                    <span>写真貼付欄</span>
                  </div>
                )}
              </td>
            </tr>
            <tr>
              <td className="lbl">氏名</td>
              <td className="ident-name" colSpan={4}>
                <span className="name-text">{p.fullName}</span>
              </td>
            </tr>
            <tr>
              <td className="lbl">生年月日</td>
              <td className="cell-dob" colSpan={2}>{formatDobJp(p.dateOfBirth)}</td>
              <td className="lbl">性別</td>
              <td>
                <GenderMark value={p.gender} />
              </td>
            </tr>
            <tr>
              <td className="lbl">ふりがな</td>
              <td colSpan={5}>{p.furiganaAddress}</td>
            </tr>
            <tr>
              <td className="lbl" rowSpan={2}>現住所</td>
              <td colSpan={2} className="addr-cell">
                <div className="postal">〒{formatPostalCode(p.postalCode)}</div>
                <div className="addr">{p.address}</div>
              </td>
              <td className="lbl-sm">電話</td>
              <td className="cell-phone" colSpan={2}>{p.phone}</td>
            </tr>
            <tr>
              <td colSpan={2} />
              <td className="lbl-sm">メール</td>
              <td className="cell-mail" colSpan={2}>{p.email}</td>
            </tr>
            <tr>
              <td className="lbl">連絡先</td>
              <td colSpan={5} className="addr-cell">
                {same ? (
                  <div className="same-as-above">同上</div>
                ) : (
                  <div className="addr">
                    〒{formatPostalCode(p.contactPostalCode)} {p.contactAddress}
                    {p.contactPhone && <span className="ml-3">TEL: {p.contactPhone}</span>}
                  </div>
                )}
              </td>
            </tr>
          </tbody>
        </table>

        <HistoryTable rows={history} />
        <LicensesTable rows={licenses} />

        <table className="prefs">
          <tbody>
            <tr>
              <td className="lbl center">特技・自己PR</td>
            </tr>
            <tr>
              <td className="prefs-cell" style={{ height: "32mm" }}>{data.extras.selfPr}</td>
            </tr>
            <tr>
              <td className="lbl center">本人希望記入欄</td>
            </tr>
            <tr>
              <td className="prefs-cell" style={{ height: "26mm" }}>{data.extras.preferences}</td>
            </tr>
          </tbody>
        </table>
      </section>
    </div>
  );
});

function GenderMark({ value }: { value: "" | "male" | "female" }) {
  return (
    <span className="gender">
      <span className={value === "male" ? "circled" : ""}>男</span>
      <span className="dot">・</span>
      <span className={value === "female" ? "circled" : ""}>女</span>
    </span>
  );
}

function HistoryTable({ rows }: { rows: HistoryEntry[] }) {
  return (
    <table className="history">
      <thead>
        <tr>
          <th className="col-year">年</th>
          <th className="col-month">月</th>
          <th>学 歴 ・ 職 歴</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => {
          const isHeader = r.content.startsWith("__HEADER__");
          const isEnd = r.content === "__END__";
          return (
            <tr key={`${r.id}-${i}`}>
              <td className="cell-year">{r.year}</td>
              <td className="cell-month">{r.month}</td>
              <td className={`cell-content ${isHeader ? "section-header" : ""} ${isEnd ? "end" : ""}`}>
                {isHeader ? r.content.replace("__HEADER__", "") : isEnd ? "以上" : r.content}
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

function LicensesTable({ rows }: { rows: LicenseEntry[] }) {
  return (
    <table className="licenses">
      <thead>
        <tr>
          <th className="col-year">年</th>
          <th className="col-month">月</th>
          <th>免 許 ・ 資 格</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={`${r.id}-${i}`}>
            <td className="cell-year">{r.year}</td>
            <td className="cell-month">{r.month}</td>
            <td className="cell-content">{r.name}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
