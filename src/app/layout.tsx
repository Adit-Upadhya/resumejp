import type { Metadata } from "next";
import {
  Inter,
  Noto_Sans_JP,
  Noto_Serif_JP,
  BIZ_UDPGothic,
  Zen_Kaku_Gothic_New,
  Shippori_Mincho,
} from "next/font/google";
import { Toaster } from "sonner";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
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
// Additional Japanese typefaces the user can switch between in the preview.
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

export const metadata: Metadata = {
  title: "Rirekisho — Japanese Resume Builder",
  description:
    "Generate authentic Japanese 履歴書 (rirekisho) for jobs in Japan. Enter your details in English, Nepali, or Japanese — get a JIS-style PDF.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${notoJp.variable} ${notoSerifJp.variable} ${bizGothic.variable} ${zenGothic.variable} ${shipporiMincho.variable}`}
    >
      <body className="font-sans antialiased">
        {children}
        <Toaster position="bottom-right" />
      </body>
    </html>
  );
}
