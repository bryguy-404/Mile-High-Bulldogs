/// <reference types="node" />
import { existsSync, realpathSync, statSync } from "node:fs";
import { resolve, sep } from "node:path";
import { z } from "astro/zod";

export const text = z.string().trim().min(1, "This text is required.");
export const webLink = z.url({ protocol: /^https?$/ });
export const navigationLink = z.union([
  z.enum(["#top", "#event", "#story", "#origin", "#gallery", "#social"]),
  webLink,
]);
export const calendarDate = z.string().regex(/^\d{4}-\d{2}-\d{2}$/).refine(value => {
  const date = new Date(`${value}T12:00:00Z`);
  return !Number.isNaN(date.getTime()) && date.toISOString().slice(0, 10) === value;
}, "Choose a valid calendar date.");

export function publicFile(path: string, folder: string): boolean {
  const root = resolve("public", folder);
  const file = resolve("public", `.${path}`);
  return file.startsWith(`${root}${sep}`) && existsSync(file) &&
    statSync(file).isFile() && realpathSync(file).startsWith(`${realpathSync(root)}${sep}`);
}
export const image = text.regex(/^\/uploads\/[^?#]+\.(jpg|jpeg|png|webp|avif)$/i)
  .refine(path => publicFile(path, "uploads"), "Upload and select an existing photo.");
export const photo = z.object({ image, imageAlt: text });
export const flyerLink = z.union([
  webLink,
  text.regex(/^\/downloads\/[^?#]+\.pdf$/i).refine(path => publicFile(path, "downloads"), "Select an existing flyer."),
]);
export const phone = text.regex(/^\+?[\d\s().-]+$/).refine(value => {
  const digits = value.replace(/\D/g, "");
  return value.startsWith("+") ? digits.length >= 8 && digits.length <= 15 :
    digits.length === 10 || (digits.length === 11 && digits.startsWith("1"));
}, "Use a 10-digit US number, or include + and the country code.");
export function phoneHref(value: string) {
  const digits = value.replace(/\D/g, "");
  return `tel:+${!value.startsWith("+") && digits.length === 10 ? "1" : ""}${digits}`;
}
export function formatDate(value: string, options: Intl.DateTimeFormatOptions) {
  return new Intl.DateTimeFormat("en-US", { ...options, timeZone: "UTC" })
    .format(new Date(`${value}T12:00:00Z`));
}
