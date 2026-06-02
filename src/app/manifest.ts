import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "ResumeJP — Japanese Resume Builder",
    short_name: "ResumeJP",
    description:
      "Create authentic Japanese resumes (履歴書 rirekisho) and 職務経歴書 work-history sheets and download a print-ready PDF.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#0a0a0a",
    lang: "en",
    categories: ["business", "productivity", "utilities"],
  };
}
