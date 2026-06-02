import { ImageResponse } from "next/og";

// Apple touch icon (home-screen / bookmark). Next injects the
// <link rel="apple-touch-icon"> automatically.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #1c1c1f 0%, #0a0a0a 100%)",
          color: "#ffffff",
          fontSize: "120px",
          fontWeight: 800,
          fontFamily: "sans-serif",
          paddingBottom: "6px",
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
}
