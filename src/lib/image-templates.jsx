import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { siteConfig } from "@/data/site";
import { getSiteUrl } from "@/lib/urls";

/* Shared renderer for the generated Open Graph images (link previews on social media and chat apps). */

export const socialImageSize = { width: 1200, height: 630 };
export const socialImageContentType = "image/png";

const colors = { background: "#0b0b0c", foreground: "#ededea", muted: "#a3a29c", accent: "#ff7a45" };
const fontsDirectory = path.join(process.cwd(), "src/assets/fonts");

/** Shortens text to at most `maxLength` characters, breaking at a word boundary. */
function truncate(text, maxLength) {
  if (text.length <= maxLength) return text;
  const cut = text.slice(0, maxLength - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ")).replace(/[\s,.;:]+$/, "")}…`;
}

export async function renderSocialImage({ eyebrow, title, description }) {
  const [regular, semibold, mono] = await Promise.all(
    ["geist-sans-latin-400-normal.woff", "geist-sans-latin-600-normal.woff", "geist-mono-latin-400-normal.woff"].map((file) =>
      readFile(path.join(fontsDirectory, file)),
    ),
  );
  const host = getSiteUrl().replace(/^https?:\/\//, "");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px 72px",
          backgroundColor: colors.background,
          backgroundImage:
            "linear-gradient(to right, rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.045) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          color: colors.foreground,
          fontFamily: "Geist",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 20 }}>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              width: 56,
              height: 56,
              borderRadius: 14,
              backgroundColor: colors.foreground,
              color: colors.background,
              fontFamily: "Geist Mono",
              fontSize: 20,
            }}
          >
            {siteConfig.initials}
          </div>
          <div style={{ display: "flex", fontSize: 26, fontWeight: 600 }}>{siteConfig.name}</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontFamily: "Geist Mono", fontSize: 22, color: colors.accent, letterSpacing: 3, textTransform: "uppercase" }}>
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              marginTop: 22,
              maxWidth: 1020,
              fontSize: title.length > 48 ? 62 : 78,
              fontWeight: 600,
              lineHeight: 1.06,
              letterSpacing: -2.5,
            }}
          >
            {title}
          </div>
          {description && (
            <div style={{ display: "flex", marginTop: 26, maxWidth: 940, fontSize: 28, lineHeight: 1.4, color: colors.muted }}>
              {truncate(description, 150)}
            </div>
          )}
        </div>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontFamily: "Geist Mono", fontSize: 20, color: colors.muted }}>
          <div style={{ display: "flex" }}>{host}</div>
          <div style={{ display: "flex", width: 120, height: 4, borderRadius: 2, backgroundColor: colors.accent }} />
        </div>
      </div>
    ),
    {
      ...socialImageSize,
      fonts: [
        { name: "Geist", data: regular, weight: 400, style: "normal" },
        { name: "Geist", data: semibold, weight: 600, style: "normal" },
        { name: "Geist Mono", data: mono, weight: 400, style: "normal" },
      ],
    },
  );
}

/** The favicon and home-screen icon: the initials from `siteConfig` on a dark tile. */
export async function renderMonogram(dimension) {
  const mono = await readFile(path.join(fontsDirectory, "geist-mono-latin-400-normal.woff"));

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          position: "relative",
          borderRadius: dimension * 0.22,
          backgroundColor: "#141413",
          color: "#fafaf8",
          fontFamily: "Geist Mono",
          fontSize: dimension * 0.4,
          letterSpacing: -dimension * 0.02,
        }}
      >
        {siteConfig.initials}
        <div
          style={{
            position: "absolute",
            top: dimension * 0.14,
            right: dimension * 0.14,
            width: dimension * 0.12,
            height: dimension * 0.12,
            borderRadius: dimension,
            backgroundColor: colors.accent,
          }}
        />
      </div>
    ),
    {
      width: dimension,
      height: dimension,
      fonts: [{ name: "Geist Mono", data: mono, weight: 400, style: "normal" }],
    },
  );
}
