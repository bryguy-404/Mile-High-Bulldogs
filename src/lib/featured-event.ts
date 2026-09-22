import { z } from "astro/zod";
import content from "../content/featured-event.json";
import { text, webLink, calendarDate, image, photo, flyerLink, phone, formatDate } from "./content-validation";

// Invalid CMS edits fail the build before replacing a working deployment.
export const featuredEventContent = z.object({
  description: text,
  date: calendarDate,
  time: text,
  venue: text,
  ticketUrl: webLink,
  image,
  imageAlt: text,
  calendarLabel: text,
  eyebrow: text,
  matchup: text,
  versusLabel: text,
  imageCaption: text,
  pregame: text,
  ticketDeadline: calendarDate,
  flyerUrl: flyerLink,
  flyerLabel: text,
  labels: z.object({ game: text, venue: text, pregame: text, deadline: text }),
  contact: z.object({ prompt: text, name: text, email: z.email(), phone }),
  teams: z.object({ home: photo, away: photo }),
}).parse(content);

export const featuredEventDate = {
  full: formatDate(featuredEventContent.date, { weekday: "long", month: "long", day: "numeric", year: "numeric" }),
  short: formatDate(featuredEventContent.date, { month: "short", day: "numeric", year: "numeric" }),
  badge: formatDate(featuredEventContent.date, { month: "short", day: "numeric" }),
  year: formatDate(featuredEventContent.date, { year: "numeric" }),
  banner: formatDate(featuredEventContent.date, { month: "2-digit", day: "2-digit", year: "2-digit" }).replaceAll("/", "."),
};
