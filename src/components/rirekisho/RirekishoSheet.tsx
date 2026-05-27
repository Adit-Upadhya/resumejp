"use client";

import { forwardRef } from "react";
import type { Resume, HistoryEntry, LicenseEntry } from "@/lib/schema";
import { formatDobJp, formatPostalCode } from "@/lib/utils";

/**
 * Renders the JIS-style 履歴書 as it appears in the reference template:
 * a single A3 landscape sheet split into two side-by-side columns.
 *
 * LEFT COLUMN (top → bottom):
 *   - 履歴書 header + as-of date
 *   - 氏名 block: ふりがな / 氏名 / 国籍・生年月日・性別  (photo box at right)
 *   - 現住所 + 連絡先 rows (with ふりがな / 〒 / 電話 / メール)
 *   - 学歴・職歴 table (学歴 first, then 職歴, ending with 以上)
 *   - 記入上の注意 footnote
 *
 * RIGHT COLUMN (top → bottom):
 *   - 学歴・職歴 continuation rows
 *   - 免許・資格 table
 *   - 特技・自己PR / 通勤時間 / 扶養家族 / 配偶者 / 配偶者の扶養義務 block
 *   - 本人希望記入欄
 *
 * Sizing uses millimetres so the same component renders identically in the
 * browser preview and in the Puppeteer-printed A3 landscape PDF.
 */

// Row counts matched to the blank coto Japanese Academy reference template:
// LEFT column fills its full height with ~22 lines for 学歴 + 職歴, the RIGHT
// column reserves ~7 lines for overflow, and 免許・資格 reserves ~9 lines.
const LEFT_HISTORY_ROWS = 22;
const RIGHT_HISTORY_ROWS = 7;
const LICENSE_ROWS = 9;

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

interface Props {
  data: Resume;
}

export const RirekishoSheet = forwardRef<HTMLDivElement, Props>(function RirekishoSheet(
  { data },
  ref,
) {
  // 学歴 header + entries, 職歴 header + entries, end marker.
  const rows: HistoryEntry[] = [];
  rows.push({ id: "h-edu", year: "", month: "", content: "__HEADER__学歴" });
  for (const e of data.education) rows.push(e);
  rows.push({ id: "h-work", year: "", month: "", content: "__HEADER__職歴" });
  for (const w of data.work) rows.push(w);
  rows.push({ id: "h-end", year: "", month: "", content: "__END__" });

  const padded = pad(rows, LEFT_HISTORY_ROWS + RIGHT_HISTORY_ROWS, emptyHistory);
  const leftRows = padded.slice(0, LEFT_HISTORY_ROWS);
  const rightRows = padded.slice(LEFT_HISTORY_ROWS);

  const licenses = pad(data.licenses, LICENSE_ROWS, emptyLicense);

  const p = data.personal;
  const contactSame = p.contactSameAsAbove;

  return (
    <div ref={ref} className="rirekisho-root">
      <section className="page">
        <div className="columns">
          {/* ============= LEFT COLUMN ============= */}
          <div className="col col-left">
            <header className="page-head">
              <h1>履 歴 書</h1>
              <div className="as-of">{data.documentDate}</div>
            </header>

            <table className="ident">
              <colgroup>
                <col style={{ width: "18mm" }} />
                <col style={{ width: "22mm" }} />
                <col style={{ width: "32mm" }} />
                <col style={{ width: "30mm" }} />
                <col style={{ width: "22mm" }} />
                <col style={{ width: "40mm" }} />
                <col style={{ width: "30mm" }} />
              </colgroup>
              <tbody>
                <tr>
                  <td className="lbl">ふりがな</td>
                  <td className="ident-name-furi" colSpan={5}>{p.furiganaName}</td>
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
                  <td className="ident-name" colSpan={5}>
                    <span className="name-text">{p.fullName}</span>
                  </td>
                </tr>
                <tr>
                  <td className="lbl">国籍</td>
                  <td className="cell-nat">{p.nationality}</td>
                  <td className="lbl">生年月日（年齢）</td>
                  <td className="cell-dob" colSpan={2}>{formatDobJp(p.dateOfBirth)}</td>
                  <td className="lbl-gender">
                    性別 <GenderMark value={p.gender} />
                  </td>
                </tr>
                <tr>
                  <td className="lbl">ふりがな</td>
                  <td colSpan={6}>{p.furiganaAddress}</td>
                </tr>
                <tr>
                  <td className="lbl" rowSpan={2}>現住所</td>
                  <td colSpan={4} className="addr-cell">
                    <div className="postal">〒{formatPostalCode(p.postalCode)}</div>
                    <div className="addr">{p.address}</div>
                  </td>
                  <td className="lbl-sm">電話</td>
                  <td className="cell-phone">{p.phone}</td>
                </tr>
                <tr>
                  <td colSpan={4} />
                  <td className="lbl-sm">メールアドレス</td>
                  <td className="cell-mail">{p.email}</td>
                </tr>
                <tr>
                  <td className="lbl">ふりがな</td>
                  <td colSpan={6}>{contactSame ? "" : p.furiganaContact}</td>
                </tr>
                <tr>
                  <td className="lbl" rowSpan={2}>連絡先</td>
                  <td colSpan={4} className="addr-cell">
                    {contactSame ? (
                      <div className="same-as-above">同上</div>
                    ) : (
                      <>
                        <div className="postal">〒{formatPostalCode(p.contactPostalCode)}</div>
                        <div className="addr">{p.contactAddress}</div>
                        <div className="hint">（現住所以外に連絡を希望する場合のみ記入）</div>
                      </>
                    )}
                  </td>
                  <td className="lbl-sm">電話</td>
                  <td className="cell-phone">{contactSame ? "" : p.contactPhone}</td>
                </tr>
                <tr>
                  <td colSpan={4} />
                  <td className="lbl-sm">メールアドレス</td>
                  <td className="cell-mail">{contactSame ? "" : p.contactEmail}</td>
                </tr>
              </tbody>
            </table>

            <HistoryTable rows={leftRows} />

            <div className="footnote">
              <span className="footnote-label">記入上の注意</span>
              <span>
                1．鉛筆以外の黒又は青の筆記具で記入。 2．数字はアラビア数字で、文字はくずさず正確に書く。
                3．※印のところは、該当するものを○で囲む。
              </span>
            </div>
          </div>

          {/* ============= RIGHT COLUMN ============= */}
          <div className="col col-right">
            <HistoryTable rows={rightRows} compact />

            <LicensesTable rows={licenses} />

            <table className="extras">
              <colgroup>
                <col />
                <col style={{ width: "22.5mm" }} />
                <col style={{ width: "22.5mm" }} />
              </colgroup>
              <tbody>
                <tr>
                  <td className="lbl center">特技、自己PRなど</td>
                  <td className="lbl center" colSpan={2}>通勤時間</td>
                </tr>
                <tr>
                  <td className="selfpr-cell" rowSpan={5}>
                    <div className="selfpr-text">{data.extras.selfPr}</div>
                  </td>
                  <td className="commute-cell" colSpan={2}>{data.extras.commuteTime}</td>
                </tr>
                <tr>
                  <td className="lbl center" colSpan={2}>扶養家族（配偶者を除く）</td>
                </tr>
                <tr>
                  <td className="dependents-cell" colSpan={2}>{data.extras.dependents}</td>
                </tr>
                <tr>
                  <td className="lbl center">配偶者</td>
                  <td className="lbl center">配偶者の扶養義務</td>
                </tr>
                <tr>
                  <td className="spouse-cell">
                    <SpouseMark value={data.extras.hasSpouse} />
                  </td>
                  <td className="spouse-cell">
                    <SpouseMark value={data.extras.spouseSupport} />
                  </td>
                </tr>
              </tbody>
            </table>

            <table className="prefs">
              <tbody>
                <tr>
                  <td className="lbl center">
                    本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入）
                  </td>
                </tr>
                <tr>
                  <td className="prefs-cell">{data.extras.preferences}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
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

function SpouseMark({
  value,
  labelYes = "有",
  labelNo = "無",
}: {
  value: "" | "yes" | "no";
  labelYes?: string;
  labelNo?: string;
}) {
  return (
    <span className="spouse">
      <span className={value === "yes" ? "circled" : ""}>{labelYes}</span>
      <span className="dot">・</span>
      <span className={value === "no" ? "circled" : ""}>{labelNo}</span>
    </span>
  );
}

function HistoryTable({ rows, compact }: { rows: HistoryEntry[]; compact?: boolean }) {
  return (
    <table className={`history ${compact ? "compact" : ""}`}>
      <thead>
        <tr>
          <th className="col-year">年</th>
          <th className="col-month">月</th>
          <th>学 歴 ・ 職 歴 （各別にまとめて書く）</th>
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
