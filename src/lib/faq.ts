/**
 * Canonical FAQ (English) — the single source for the on-page FAQ *and* the
 * FAQPage JSON-LD, so the structured data never drifts from visible content.
 *
 * Plain (non-"use client") module so the server-rendered root layout can
 * import it for JSON-LD while the client i18n dictionary reuses it for the
 * visible English FAQ.
 *
 * Mirrors the topics top-ranking competitors answer (free, 履歴書 vs
 * 職務経歴書, language, templates, photo, export, privacy).
 */
export const FAQ_EN: { q: string; a: string }[] = [
  {
    q: "Is ResumeJP free?",
    a: "Yes — completely free with no signup and no email. Your data stays in your browser, and you can download a print-ready PDF instantly.",
  },
  {
    q: "What is the difference between a 履歴書 and a 職務経歴書?",
    a: "The 履歴書 (rirekisho) is a fixed-format personal profile with your photo, education, and work timeline. The 職務経歴書 (shokumukeirekisho) is a free-form work-history sheet detailing your roles, skills, and achievements. Mid-career applicants in Japan usually submit both, and ResumeJP supports each.",
  },
  {
    q: "Can I write my Japanese resume in English?",
    a: "Yes. Type your details in English, Nepali, or Japanese, and one click rewrites every field into natural business Japanese. There is also an English résumé (Western CV) format for international and global-tech roles in Japan.",
  },
  {
    q: "Which Japanese resume template should I use?",
    a: "For most full-time roles use the MHLW or JIS rirekisho; switch to the mid-career (転職) layout when changing companies, the new-grad (新卒) layout as a student, the part-time/arubaito layout for shift work, or the English CV for global firms. You can change template any time without retyping.",
  },
  {
    q: "Can I add a photo to my rirekisho?",
    a: "Yes. Upload a photo (up to 5 MB) and it is automatically resized to fit the standard 30×40 mm photo cell in the top-right of the sheet.",
  },
  {
    q: "What formats can I export?",
    a: "A high-resolution, print-ready PDF in the correct A3 or A4 size, plus a XeLaTeX .tex source and a JSON backup you can re-import later. You can also download a blank template to fill in by hand.",
  },
  {
    q: "Is my data private?",
    a: "Yes. Everything runs in your browser — your resume is saved on this device and is never sent to or stored on a server. It stays saved when you close the tab, so you can come back any time, and you can download a JSON backup to move it to another device.",
  },
  {
    q: "Does it work for part-time (arubaito) and dispatch jobs?",
    a: "Yes. There are compact part-time/arubaito and dispatch-registration (派遣) layouts that emphasise weekly shift availability and a skills checklist instead of a long career history.",
  },
];
