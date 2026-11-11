/** Joins class names, skipping falsy values. */
export function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

/** `"2024-03"` -> `"Mar 2024"`. Avoids `Date` so output never depends on the build machine's time zone. */
export function formatYearMonth(value) {
  const [year, month] = value.split("-").map(Number);
  const label = MONTHS[month - 1];
  return label ? `${label} ${year}` : String(year);
}

/**
 * Whether an expiry date has passed. `"2026-12-11"` expires at the start of that day (UTC).
 * A month on its own, like `"2026-12"`, counts as valid until the end of that month.
 */
export function hasExpired(value) {
  const [year, month, day] = value.split("-").map(Number);
  const expiresAt = day ? Date.UTC(year, month - 1, day) : Date.UTC(year, month, 1);
  return Date.now() >= expiresAt;
}

export function toParagraphs(text) {
  if (!text) return [];
  return (typeof text === "string" ? [text] : text).filter((paragraph) => paragraph.trim().length > 0);
}

/** Splits `"plain *emphasised* plain"` into segments for rendering. */
export function parseEmphasis(text) {
  return text
    .split(/(\*[^*]+\*)/g)
    .filter(Boolean)
    .map((part) =>
      part.startsWith("*") && part.endsWith("*") && part.length > 2
        ? { text: part.slice(1, -1), emphasis: true }
        : { text: part, emphasis: false },
    );
}

/** Removes `*emphasis*` markers, for plain-text contexts such as metadata. */
export function stripEmphasis(text) {
  return text.replace(/\*([^*]+)\*/g, "$1");
}

export function isExternalUrl(href) {
  return /^https?:\/\//.test(href);
}

/** `"https://www.github.com/user/"` -> `"github.com/user"` */
export function displayUrl(url) {
  try {
    const { hostname: host, pathname } = new URL(url);
    return `${host.replace(/^www\./, "")}${pathname.replace(/\/$/, "")}`;
  } catch {
    return url;
  }
}
