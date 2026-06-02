"use client";

import { forwardRef } from "react";
import type { HistoryEntry, LicenseEntry, Resume } from "@/lib/schema";
import { formatDobJp, formatPostalCode } from "@/lib/utils";

/**
 * 厚生労働省 sample-format 履歴書. Introduced by MHLW in 2021 to remove
 * fields prone to discriminatory use — there is no gender, spouse,
 * dependents, or commute section.
 *
 * A4 portrait, single page, single column.
 */

const HISTORY_ROWS = 13;
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

export const MhlwSheet = forwardRef<
  HTMLDivElement,
  { data: Resume; styleVars?: React.CSSProperties }
>(function MhlwSheet({ data, styleVars }, ref) {
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
    <div ref={ref} className="rirekisho-root a4-root mhlw-root" style={styleVars}>
      <section className="page page-a4">
        <header className="page-head">
          <h1>履 歴 書</h1>
          <div className="as-of">{data.documentDate}</div>
        </header>

        <table className="ident">
          <colgroup>
            <col style={{ width: "16mm" }} />
            <col style={{ width: "108mm" }} />
            <col style={{ width: "30mm" }} />
          </colgroup>
          <tbody>
            <tr>
              <td className="lbl">ふりがな</td>
              <td className="ident-name-furi">{p.furiganaName}</td>
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
              <td className="ident-name">
                <span className="name-text">{p.fullName}</span>
              </td>
            </tr>
            <tr>
              <td className="lbl">生年月日</td>
              <td className="cell-dob">{formatDobJp(p.dateOfBirth)}</td>
            </tr>
            <tr>
              <td className="lbl">ふりがな</td>
              <td colSpan={2}>{p.furiganaAddress}</td>
            </tr>
            <tr>
              <td className="lbl" rowSpan={2}>現住所</td>
              <td colSpan={2} className="addr-cell">
                <div className="postal">〒{formatPostalCode(p.postalCode)}</div>
                <div className="addr">{p.address}</div>
              </td>
            </tr>
            <tr>
              <td colSpan={2} className="addr-cell">
                <div className="contact-line">
                  <span className="lbl-sm">電話</span> {p.phone}
                </div>
                <div className="contact-line">
                  <span className="lbl-sm">メール</span> {p.email}
                </div>
              </td>
            </tr>
            <tr>
              <td className="lbl">連絡先</td>
              <td colSpan={2} className="addr-cell">
                {same ? (
                  <div className="same-as-above">同上</div>
                ) : (
                  <div className="addr">
                    〒{formatPostalCode(p.contactPostalCode)} {p.contactAddress}
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
              <td className="lbl center">志望の動機、特技、好きな学科、アピールポイントなど</td>
            </tr>
            <tr>
              <td className="prefs-cell" style={{ height: "38mm" }}>{data.extras.selfPr}</td>
            </tr>
            <tr>
              <td className="lbl center">本人希望記入欄（特に給料・職種・勤務時間・勤務地など）</td>
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
