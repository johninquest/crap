import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "CyberChecklist",
    short_name: "CyberChecklist",
    description: "Know your cyber risk in 5 minutes. Free, no account, no jargon.",
    start_url: "/en",
    display: "standalone",
    background_color: "#0B132B",
    theme_color: "#0B132B",
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
