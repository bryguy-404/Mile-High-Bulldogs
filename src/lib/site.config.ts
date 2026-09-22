import { featuredEventContent, featuredEventDate } from "./featured-event";
import { sharedContent, heroContent } from "./homepage-content";
import { formatDate, phoneHref } from "./content-validation";

export const siteConfig = {
  ...sharedContent,
  ticketUrl: featuredEventContent.ticketUrl,
  flyerUrl: featuredEventContent.flyerUrl,
  reelUrl: "/media/mile-high-bulldogs-hype-reel.mp4",
  heroReelUrl: "/media/mile-high-bulldogs-hero-loop.mp4",
  reelPosterUrl: heroContent.poster,
  event: {
    ...featuredEventContent,
    date: featuredEventDate.full,
    dateShort: featuredEventDate.short,
    dateBadge: featuredEventDate.badge,
    dateBanner: featuredEventDate.banner,
    year: featuredEventDate.year,
    ticketDeadline: formatDate(featuredEventContent.ticketDeadline, { month: "long", day: "numeric", year: "numeric" }),
    contact: { ...featuredEventContent.contact, phoneHref: phoneHref(featuredEventContent.contact.phone) },
  },
};
