import type { HistoryEntry, Resume } from "./schema";
import { formatDobJp, formatPostalCode } from "./utils";

/**
 * Serialises a Resume into an XeLaTeX document that, when compiled with
 *   xelatex rirekisho.tex
 * produces a 2-page JIS-style 履歴書 closely matching the on-screen sheet.
 *
 * Requires a TeX Live install with `xeCJK`, `fontspec`, `geometry`, `array`,
 * `tabularx`, `tabu`, `enumitem`. Font defaults to "Noto Sans JP" — change
 * the \setCJKmainfont line if you use a different font.
 */
export function renderTex(r: Resume): string {
  const photoBlock = r.personal.photoDataUrl
    ? "% Photo: paste image manually; data URLs cannot be embedded in TeX as-is."
    : "\\fbox{\\begin{minipage}[c][35mm][c]{27mm}\\centering\\small 写真貼付欄\\end{minipage}}";

  const eduRows = historyRows(r.education, "学歴");
  const workRows = historyRows(r.work, "職歴");
  const licenseRows = r.licenses
    .map((l) => `${esc(l.year)} & ${esc(l.month)} & ${esc(l.name)} \\\\`)
    .join("\n      \\hline\n      ");

  const dob = formatDobJp(r.personal.dateOfBirth);

  return `% !TEX program = xelatex
\\documentclass[a4paper,10pt]{article}
\\usepackage[margin=10mm]{geometry}
\\usepackage{xeCJK}
\\usepackage{array, tabularx}
\\usepackage{graphicx}
\\usepackage{fancyhdr}
\\usepackage{enumitem}
\\setCJKmainfont{Noto Sans JP}
\\setCJKsansfont{Noto Sans JP}
\\renewcommand{\\arraystretch}{1.35}
\\pagestyle{empty}

\\begin{document}

% ============== PAGE 1 ==============

\\noindent
\\begin{minipage}[c]{0.7\\textwidth}
  {\\Huge\\bfseries 履\\,歴\\,書}
\\end{minipage}\\hfill
\\begin{minipage}[c]{0.3\\textwidth}\\raggedleft
  ${esc(r.documentDate)}
\\end{minipage}

\\vspace{2mm}
\\noindent
\\begin{tabularx}{\\textwidth}{|p{18mm}|X|p{30mm}|p{28mm}|}
  \\hline
  ふりがな & \\multicolumn{2}{l|}{${esc(r.personal.furiganaName)}} & \\multirow{4}{*}{${photoBlock}} \\\\
  \\cline{1-3}
  氏\\,名 & \\multicolumn{2}{l|}{\\Large ${esc(r.personal.fullName)}} & \\\\
  \\cline{1-3}
  国籍 & ${esc(r.personal.nationality)} & ${esc(dob)} & \\\\
  \\cline{1-3}
  性別 & \\multicolumn{2}{l|}{${genderMark(r.personal.gender)}} & \\\\
  \\hline
\\end{tabularx}

\\vspace{1mm}
\\noindent
\\begin{tabularx}{\\textwidth}{|p{18mm}|X|p{22mm}|p{50mm}|}
  \\hline
  ふりがな & \\multicolumn{3}{l|}{${esc(r.personal.furiganaAddress)}} \\\\
  \\hline
  \\multirow{2}{*}{現住所} & \\multirow{2}{*}{\\parbox{\\linewidth}{〒${esc(formatPostalCode(r.personal.postalCode))}\\\\${esc(r.personal.address)}}} & 電話 & ${esc(r.personal.phone)} \\\\
  \\cline{3-4}
  & & メール & ${esc(r.personal.email)} \\\\
  \\hline
  ふりがな & \\multicolumn{3}{l|}{${esc(r.personal.contactSameAsAbove ? "" : r.personal.furiganaContact)}} \\\\
  \\hline
  \\multirow{2}{*}{連絡先} & \\multirow{2}{*}{\\parbox{\\linewidth}{${
    r.personal.contactSameAsAbove
      ? "同上"
      : `〒${esc(formatPostalCode(r.personal.contactPostalCode))}\\\\${esc(r.personal.contactAddress)}`
  }}} & 電話 & ${esc(r.personal.contactSameAsAbove ? "" : r.personal.contactPhone)} \\\\
  \\cline{3-4}
  & & メール & ${esc(r.personal.contactSameAsAbove ? "" : r.personal.contactEmail)} \\\\
  \\hline
\\end{tabularx}

\\vspace{2mm}
\\noindent
\\begin{tabularx}{\\textwidth}{|p{13mm}|p{10mm}|X|}
  \\hline
  \\centering 年 & \\centering 月 & \\centering 学\\,歴\\,・\\,職\\,歴\\,（各別にまとめて書く） \\tabularnewline
  \\hline
${eduRows}
${workRows}
  \\multicolumn{3}{|r|}{以上} \\\\
  \\hline
\\end{tabularx}

\\vfill
\\footnotesize\\textit{記入上の注意}\\ \\ 1.\\,鉛筆以外の黒又は青の筆記具で記入。\\ \\ 2.\\,数字はアラビア数字で、文字はくずさず正確に書く。\\ \\ 3.\\,※印のところは、該当するものを○で囲む。

\\newpage

% ============== PAGE 2 ==============

\\noindent
\\begin{tabularx}{\\textwidth}{|p{13mm}|p{10mm}|X|}
  \\hline
  \\centering 年 & \\centering 月 & \\centering 免\\,許\\,・\\,資\\,格 \\tabularnewline
  \\hline
      ${licenseRows || "& & \\\\"}
  \\hline
\\end{tabularx}

\\vspace{4mm}
\\noindent
\\begin{tabularx}{\\textwidth}{|X|p{45mm}|}
  \\hline
  \\centering\\small 特技、自己PRなど & \\centering\\small 通勤時間 \\tabularnewline
  \\hline
  \\multirow{4}{*}{\\parbox[t][45mm][t]{\\linewidth}{${esc(r.extras.selfPr).replace(/\n/g, "\\\\\\\\")}}} & \\centering ${esc(r.extras.commuteTime)} \\tabularnewline
  \\cline{2-2}
  & \\centering\\small 扶養家族（配偶者を除く） \\tabularnewline
  \\cline{2-2}
  & \\centering ${esc(r.extras.dependents)} \\tabularnewline
  \\cline{2-2}
  & \\small \\centering 配偶者 ${spouseMark(r.extras.hasSpouse)} \\hfill 配偶者の扶養義務 ${spouseMark(r.extras.spouseSupport)} \\tabularnewline
  \\hline
\\end{tabularx}

\\vspace{3mm}
\\noindent
\\begin{tabularx}{\\textwidth}{|X|}
  \\hline
  \\centering\\small 本人希望記入欄（特に給料・職種・勤務時間・勤務地・その他についての希望などがあれば記入） \\tabularnewline
  \\hline
  \\parbox[t][65mm][t]{\\linewidth}{${esc(r.extras.preferences).replace(/\n/g, "\\\\\\\\")}} \\\\
  \\hline
\\end{tabularx}

\\end{document}
`;
}

function historyRows(rows: HistoryEntry[], header: string): string {
  const head = `  \\multicolumn{3}{|c|}{${header}} \\\\\n  \\hline\n`;
  const body = rows
    .map(
      (r) =>
        `  ${esc(r.year)} & ${esc(r.month)} & ${esc(r.content)} \\\\\n  \\hline`,
    )
    .join("\n");
  return head + body + "\n";
}

function genderMark(g: "" | "male" | "female"): string {
  if (g === "male") return "\\textcircled{男}\\,・\\,女";
  if (g === "female") return "男\\,・\\,\\textcircled{女}";
  return "男\\,・\\,女";
}

function spouseMark(v: "" | "yes" | "no"): string {
  if (v === "yes") return "\\textcircled{有}\\,・\\,無";
  if (v === "no") return "有\\,・\\,\\textcircled{無}";
  return "有\\,・\\,無";
}

/** Escape LaTeX-special characters. */
function esc(s: string): string {
  if (!s) return "";
  return s
    .replace(/\\/g, "\\textbackslash{}")
    .replace(/([&%$#_{}])/g, "\\$1")
    .replace(/~/g, "\\textasciitilde{}")
    .replace(/\^/g, "\\textasciicircum{}");
}
