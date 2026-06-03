import {
  Noto_Sans_JP,
  Noto_Serif_JP,
  BIZ_UDPGothic,
  Zen_Kaku_Gothic_New,
  Shippori_Mincho,
} from "next/font/google";

/**
 * Editor-only font layout. Loads the four additional Japanese typefaces that
 * the typography picker (font / boldness controls) exposes to the user.
 * These fonts are intentionally NOT in the root layout so the landing page
 * doesn't pay the loading cost of fonts the visitor may never use.
 *
 * Noto Sans JP is re-declared here with additional weights (the root layout
 * only loads 400+600 for performance; the editor needs 500+700 too).
 */

const notoJp = Noto_Sans_JP({
  subsets: ["latin"],
  variable: "--font-noto-jp",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const notoSerifJp = Noto_Serif_JP({
  subsets: ["latin"],
  variable: "--font-noto-serif-jp",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});
const bizGothic = BIZ_UDPGothic({
  subsets: ["latin"],
  variable: "--font-biz-gothic",
  display: "swap",
  weight: ["400", "700"],
});
const zenGothic = Zen_Kaku_Gothic_New({
  subsets: ["latin"],
  variable: "--font-zen-gothic",
  display: "swap",
  weight: ["400", "500", "700"],
});
const shipporiMincho = Shippori_Mincho({
  subsets: ["latin"],
  variable: "--font-shippori",
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

export default function EditorLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className={`${notoJp.variable} ${notoSerifJp.variable} ${bizGothic.variable} ${zenGothic.variable} ${shipporiMincho.variable}`}
    >
      {children}
    </div>
  );
}
