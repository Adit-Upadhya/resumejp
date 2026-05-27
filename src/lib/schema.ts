import { z } from "zod";

/**
 * Data model for a Japanese 履歴書 (rirekisho).
 * Field names mirror the labels on the JIS-style template so the form,
 * preview, PDF, and .tex exporters all share one source of truth.
 */

export const YearMonthSchema = z.object({
  year: z.string().regex(/^\d{0,4}$/u, "西暦4桁").optional().or(z.literal("")),
  month: z.string().regex(/^(?:|[1-9]|1[0-2])$/u, "1-12").optional().or(z.literal("")),
});
export type YearMonth = z.infer<typeof YearMonthSchema>;

export const HistoryEntrySchema = z.object({
  id: z.string(),
  year: z.string().default(""),
  month: z.string().default(""),
  /** 学歴 or 職歴 — free-form Japanese line, e.g. "○○大学 ○○学部 入学". */
  content: z.string().default(""),
});
export type HistoryEntry = z.infer<typeof HistoryEntrySchema>;

export const LicenseEntrySchema = z.object({
  id: z.string(),
  year: z.string().default(""),
  month: z.string().default(""),
  name: z.string().default(""),
});
export type LicenseEntry = z.infer<typeof LicenseEntrySchema>;

export const PersonalInfoSchema = z.object({
  furiganaName: z.string().default(""),
  fullName: z.string().default(""),
  dateOfBirth: z.string().default(""), // ISO date string
  age: z.string().default(""),
  gender: z.enum(["male", "female", ""]).default(""),
  nationality: z.string().default(""),
  photoDataUrl: z.string().default(""), // base64 data URL

  furiganaAddress: z.string().default(""),
  postalCode: z.string().default(""),
  address: z.string().default(""),
  phone: z.string().default(""),
  email: z.string().default(""),

  furiganaContact: z.string().default(""),
  contactPostalCode: z.string().default(""),
  contactAddress: z.string().default(""),
  contactPhone: z.string().default(""),
  contactEmail: z.string().default(""),
  /** When true, render "同上" in the 連絡先 row. */
  contactSameAsAbove: z.boolean().default(true),
});
export type PersonalInfo = z.infer<typeof PersonalInfoSchema>;

export const ExtrasSchema = z.object({
  /** 特技、自己PRなど */
  selfPr: z.string().default(""),
  /** 通勤時間 */
  commuteTime: z.string().default(""),
  /** 扶養家族（配偶者を除く） */
  dependents: z.string().default(""),
  /** 配偶者 有/無 */
  hasSpouse: z.enum(["yes", "no", ""]).default(""),
  /** 配偶者の扶養義務 有/無 */
  spouseSupport: z.enum(["yes", "no", ""]).default(""),
  /** 本人希望記入欄 */
  preferences: z.string().default(""),
});
export type Extras = z.infer<typeof ExtrasSchema>;

export const ResumeSchema = z.object({
  /** date printed in the header — e.g. "2025年 5月 27日現在" */
  documentDate: z.string().default(""),
  personal: PersonalInfoSchema,
  /** 学歴 entries */
  education: z.array(HistoryEntrySchema).default([]),
  /** 職歴 entries */
  work: z.array(HistoryEntrySchema).default([]),
  /** 免許・資格 */
  licenses: z.array(LicenseEntrySchema).default([]),
  extras: ExtrasSchema,
});
export type Resume = z.infer<typeof ResumeSchema>;

export function emptyResume(): Resume {
  const today = new Date();
  return {
    documentDate: formatJpDate(today),
    personal: {
      furiganaName: "",
      fullName: "",
      dateOfBirth: "",
      age: "",
      gender: "",
      nationality: "",
      photoDataUrl: "",
      furiganaAddress: "",
      postalCode: "",
      address: "",
      phone: "",
      email: "",
      furiganaContact: "",
      contactPostalCode: "",
      contactAddress: "",
      contactPhone: "",
      contactEmail: "",
      contactSameAsAbove: true,
    },
    education: [],
    work: [],
    licenses: [],
    extras: {
      selfPr: "",
      commuteTime: "",
      dependents: "",
      hasSpouse: "",
      spouseSupport: "",
      preferences: "",
    },
  };
}

export function formatJpDate(d: Date): string {
  return `${d.getFullYear()}年 ${d.getMonth() + 1}月 ${d.getDate()}日現在`;
}

export function newId(): string {
  return Math.random().toString(36).slice(2, 10);
}
