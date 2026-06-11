"use client";

/**
 * Root error boundary — replaces Next's default "Application error: a
 * client-side exception has occurred" screen with a branded recovery page.
 * Must render its own <html>/<body> because it replaces the root layout.
 */
export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          gap: "14px",
          background: "#fff",
          color: "#0a0a0a",
          fontFamily:
            "system-ui, -apple-system, 'Segoe UI', Roboto, sans-serif",
          textAlign: "center",
          padding: "24px",
        }}
      >
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 16,
            background: "#0a0a0a",
            color: "#fff",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 30,
            fontWeight: 800,
          }}
        >
          R
        </div>
        <h1 style={{ fontSize: 20, fontWeight: 600, margin: 0 }}>
          Something went wrong
        </h1>
        <p style={{ fontSize: 14, color: "#737373", maxWidth: 360, margin: 0 }}>
          An unexpected error occurred. Your resume data is saved in your
          browser and is not lost.
        </p>
        <button
          onClick={() => {
            try {
              reset();
            } finally {
              window.location.reload();
            }
          }}
          style={{
            marginTop: 8,
            padding: "10px 22px",
            borderRadius: 10,
            border: "none",
            background: "#0a0a0a",
            color: "#fff",
            fontSize: 15,
            fontWeight: 600,
            cursor: "pointer",
          }}
        >
          Reload page
        </button>
      </body>
    </html>
  );
}
