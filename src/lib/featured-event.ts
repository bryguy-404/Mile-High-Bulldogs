/// <reference types="node" />
import { existsSync } from "node:fs";
import { resolve, sep } from "node:path";
import { z } from "astro/zod";
import content from "../content/featured-event.json";

// Validate CMS edits during the build, before they can replace a working site.
export const featuredEventContent = z.object({
  description: z.string().trim().min(1),
  date: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  time: z.string().trim().min(1),
  venue: z.string().trim().min(1),
  ticketUrl: z.url({ protocol: /^https?$/ }),
  image: z.string().startsWith("/uploads/"),
  imageAlt: z.string().trim().min(1),
}).parse(content);

// Use UTC for date-only content so build-server timezones cannot change the day.
const date = new Date(`${featuredEventContent.date}T12:00:00Z`);
if (
  Number.isNaN(date.getTime()) ||
  date.toISOString().slice(0, 10) !== featuredEventContent.date
) {
  throw new Error("Featured event: choose a valid calendar date.");
}

const uploadsDirectory = resolve("public/uploads");
const photoPath = resolve("public", `.${featuredEventContent.image}`);
if (
  !photoPath.startsWith(`${uploadsDirectory}${sep}`) ||
  !existsSync(photoPath)
) {
  throw new Error("Featured event: upload and select an existing event photo.");
}

function formatDate(options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", {
    ...options,
    timeZone: "UTC",
  }).format(date);
}

export const featuredEventDate = {
  full: formatDate({ weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  short: formatDate({ month: "short", day: "numeric", year: "numeric" }),
  badge: formatDate({ month: "short", day: "numeric" }),
  year: formatDate({ year: "numeric" }),
};
