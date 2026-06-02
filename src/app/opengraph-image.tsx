import { ImageResponse } from "next/og";

// Route segment config
export const alt = "ResumeJP — Japanese Resume Builder (Rirekisho)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Dynamically generated social-share image. Latin-only so it renders
// reliably without loading a Japanese webfont at the edge.
export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "linear-gradient(135deg, #ffffff 0%, #f4f4f5 100%)",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: "64px",
              height: "64px",
              borderRadius: "16px",
              background: "#0a0a0a",
              color: "#ffffff",
              fontSize: "34px",
              fontWeight: 700,
            }}
          >
            R
          </div>
          <div style={{ fontSize: "30px", fontWeight: 700, color: "#0a0a0a" }}>ResumeJP</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              fontSize: "72px",
              fontWeight: 800,
              color: "#0a0a0a",
              lineHeight: 1.05,
              letterSpacing: "-0.02em",
            }}
          >
            Japanese Resume Builder
          </div>
          <div style={{ fontSize: "34px", color: "#52525b", lineHeight: 1.3 }}>
            Free Rirekisho &amp; Shokumukeirekisho templates — fill in any language, download a
            print-ready PDF.
          </div>
        </div>

        <div style={{ display: "flex", gap: "12px" }}>
          {["JIS", "MHLW", "New-grad", "Mid-career", "Part-time", "English CV"].map((tag) => (
            <div
              key={tag}
              style={{
                display: "flex",
                fontSize: "24px",
                color: "#0a0a0a",
                border: "2px solid #d4d4d8",
                borderRadius: "999px",
                padding: "8px 20px",
              }}
            >
              {tag}
            </div>
          ))}
        </div>
      </div>
    ),
    { ...size },
  );
}
