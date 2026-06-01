import type { Resume } from "./schema";

/** Sample data for the landing-page preview and dev seeding. */
export function sampleResume(): Resume {
  return {
    documentDate: "2025年 1月 1日現在",
    personal: {
      furiganaName: "ラム バハドゥル",
      fullName: "RAM BAHADUR",
      dateOfBirth: "1990-01-01",
      age: "35",
      gender: "male",
      nationality: "アメリカ",
      photoDataUrl: "",
      furiganaAddress: "とうきょうとちよだくいいだばし",
      postalCode: "1020072",
      address: "東京都千代田区飯田橋４丁目９−４",
      phone: "090-0000-0000",
      email: "rambahadur@example.com",
      furiganaContact: "",
      contactPostalCode: "",
      contactAddress: "",
      contactPhone: "",
      contactEmail: "",
      contactSameAsAbove: true,
    },
    education: [
      { id: "1", year: "2005", month: "3", content: "○○中学校 卒業" },
      { id: "2", year: "2005", month: "4", content: "○○高等学校 入学" },
      { id: "3", year: "2008", month: "3", content: "○○高等学校 卒業" },
      { id: "4", year: "2008", month: "4", content: "○○大学 ○○学部 入学" },
      { id: "5", year: "2012", month: "3", content: "○○大学 ○○学部 卒業" },
    ],
    work: [
      { id: "w1", year: "2010", month: "4", content: "○○に○○職のインターンとして入社（2011年6月まで）" },
      { id: "w2", year: "2012", month: "4", content: "株式会社○○ 入社" },
      { id: "w3", year: "", month: "", content: "○○事業部 ○○職" },
      { id: "w4", year: "2016", month: "8", content: "一身上の都合により退社" },
      { id: "w5", year: "2016", month: "9", content: "○○ Inc, 入社" },
      { id: "w6", year: "", month: "", content: "○○事業部 ○○職" },
      { id: "w7", year: "", month: "", content: "現在に至る" },
    ],
    licenses: [{ id: "l1", year: "2012", month: "4", name: "JLPT N2試験合格" }],
    extras: {
      selfPr:
        "フロントエンドからバックエンドまでフルスタックエンジニアとして開発経験、プロジェクトやプロダクトのマネジメント経験までの幅広い経験を御社でも発揮したいと持っております。\n2012年4月に日本語N2試験に合格しており、社内のコミュニケーションにおいては日本語は問題ございません。",
      commuteTime: "約45分",
      dependents: "2 人",
      hasSpouse: "yes",
      spouseSupport: "no",
      preferences: "貴社の規定に従います。",
    },
  };
}
