"use client";

import { forwardRef } from "react";
import type { Resume } from "@/lib/schema";
import { formatDobJp, formatPostalCode } from "@/lib/utils";

/**
 * Minimal modern A4 layout. Drops the JIS table grid in favour of an
 * accent-bar / list-of-items presentation that reads more like a
 * Western CV while preserving the rirekisho data model.
 */

export const ModernSheet = forwardRef<HTMLDivElement, { data: Resume }>(function ModernSheet(
  { data },
  ref,
) {
  const p = data.personal;
  const same = p.contactSameAsAbove;

  return (
    <div ref={ref} className="rirekisho-root modern-root">
      <section className="page page-a4 modern-page">
        <header className="modern-header">
          <div className="modern-header-text">
            <div className="modern-furi">{p.furiganaName}</div>
            <h1 className="modern-name">{p.fullName || "氏名"}</h1>
            <div className="modern-meta">
              {formatDobJp(p.dateOfBirth) && <span>{formatDobJp(p.dateOfBirth)}</span>}
              {p.nationality && <span>{p.nationality}</span>}
              {p.gender && <span>{p.gender === "male" ? "男性" : "女性"}</span>}
            </div>
            <div className="modern-contact">
              {p.address && (
                <span>〒{formatPostalCode(p.postalCode)} {p.address}</span>
              )}
              {p.phone && <span>TEL: {p.phone}</span>}
              {p.email && <span>{p.email}</span>}
              {!same && p.contactAddress && (
                <span className="modern-alt">連絡先: {p.contactAddress}</span>
              )}
            </div>
          </div>
          {p.photoDataUrl ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={p.photoDataUrl} alt="" className="modern-photo" />
          ) : (
            <div className="modern-photo placeholder">写真</div>
          )}
        </header>

        {data.extras.selfPr && (
          <Block title="自己PR" jpSubtitle="Profile">
            <div className="modern-text">{data.extras.selfPr}</div>
          </Block>
        )}

        {data.education.length > 0 && (
          <Block title="学歴" jpSubtitle="Education">
            <ul className="modern-list">
              {data.education.map((e) => (
                <li key={e.id}>
                  <span className="modern-date">{e.year}.{e.month}</span>
                  <span>{e.content}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {data.work.length > 0 && (
          <Block title="職歴" jpSubtitle="Work experience">
            <ul className="modern-list">
              {data.work.map((w) => (
                <li key={w.id}>
                  <span className="modern-date">{w.year}.{w.month}</span>
                  <span>{w.content}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {data.licenses.length > 0 && (
          <Block title="免許・資格" jpSubtitle="Licenses & qualifications">
            <ul className="modern-list">
              {data.licenses.map((l) => (
                <li key={l.id}>
                  <span className="modern-date">{l.year}.{l.month}</span>
                  <span>{l.name}</span>
                </li>
              ))}
            </ul>
          </Block>
        )}

        {data.extras.preferences && (
          <Block title="本人希望記入欄" jpSubtitle="Preferences">
            <div className="modern-text">{data.extras.preferences}</div>
          </Block>
        )}
      </section>
    </div>
  );
});

function Block({
  title,
  jpSubtitle,
  children,
}: {
  title: string;
  jpSubtitle: string;
  children: React.ReactNode;
}) {
  return (
    <section className="modern-block">
      <header className="modern-block-head">
        <h2>{title}</h2>
        <span>{jpSubtitle}</span>
      </header>
      <div className="modern-block-body">{children}</div>
    </section>
  );
}
