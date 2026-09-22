import { z } from "astro/zod";
import hero from "../content/hero.json";
import shared from "../content/shared.json";
import gallery from "../content/gallery.json";
import social from "../content/social.json";
import { text, webLink, navigationLink, image, photo } from "./content-validation";

const nav = z.object({ label: text, href: navigationLink });
export const sharedContent = z.object({
  name: text, tagline: text, facebookUrl: webLink, instagramUrl: webLink,
  ticketLabel: text, groupLabel: text, swagLabel: text, swagStatus: text, swagNotice: text,
  navigation: z.object({ events: nav, story: nav, gallery: nav }),
  seo: z.object({ title: text, description: text }),
}).parse(shared);
export const heroContent = z.object({
  eyebrow: text, heading: z.object({ line1: text, line2: text, line3: text }), description: text, poster: image,
}).parse(hero);
export const socialContent = z.object({ eyebrow: text, title: text, description: text }).parse(social);
export const galleryContent = z.object({
  eyebrow: text, title: text, description: text, moreTitle: text, moreSubtitle: text,
  featured: z.object({ photo1: photo, photo2: photo, photo3: photo, photo4: photo }),
  moments: z.object({ photo1: photo, photo2: photo, photo3: photo, photo4: photo, photo5: photo,
    photo6: photo, photo7: photo, photo8: photo, photo9: photo, photo10: photo, photo11: photo }),
}).parse(gallery);
