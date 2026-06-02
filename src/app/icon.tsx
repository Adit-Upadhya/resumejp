import { ImageResponse } from "next/og";

// Browser-tab favicon. Next injects the <link rel="icon"> automatically.
export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          borderRadius: "7px",
          background: "#0a0a0a",
          color: "#ffffff",
          fontSize: "23px",
          fontWeight: 800,
          fontFamily: "sans-serif",
          // Optical centering for the "R" glyph.
          paddingBottom: "1px",
        }}
      >
        R
      </div>
    ),
    { ...size },
  );
}
