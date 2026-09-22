import { featuredEventContent, featuredEventDate } from "./featured-event";

export interface EventContact {
  name: string;
  email: string;
  phone: string;
  phoneHref: string;
}

export interface FeaturedEvent {
  matchup: string;
  description: string;
  date: string;
  dateShort: string;
  dateBadge: string;
  year: string;
  time: string;
  venue: string;
  image: string;
  imageAlt: string;
  pregame: string;
  ticketDeadline: string;
  contact: EventContact;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  ticketUrl: string;
  facebookUrl: string;
  instagramUrl: string;
  flyerUrl: string;
  reelUrl: string;
  heroReelUrl: string;
  reelPosterUrl: string;
  event: FeaturedEvent;
}

export const siteConfig = {
  name: "Mile High Bulldogs",
  tagline: "Once a Bulldog. Always a Bulldog. Even at a Mile High.",
  ticketUrl: featuredEventContent.ticketUrl,
  facebookUrl: "https://www.facebook.com/groups/138344642935",
  instagramUrl: "https://www.instagram.com/ferrisstatemilehighbulldogs/",
  flyerUrl: "/downloads/ferris-state-alumni-night.pdf",
  reelUrl: "/media/mile-high-bulldogs-hype-reel.mp4",
  heroReelUrl: "/media/mile-high-bulldogs-hero-loop.mp4",
  reelPosterUrl: "/media/mile-high-bulldogs-hype-reel-poster.jpg",
  event: {
    matchup: "Colorado Avalanche vs. Detroit Red Wings",
    description: featuredEventContent.description,
    date: featuredEventDate.full,
    dateShort: featuredEventDate.short,
    dateBadge: featuredEventDate.badge,
    year: featuredEventDate.year,
    time: featuredEventContent.time,
    venue: featuredEventContent.venue,
    image: featuredEventContent.image,
    imageAlt: featuredEventContent.imageAlt,
    pregame: "Pregame happy hour at 5:30 PM",
    ticketDeadline: "October 1, 2026",
    contact: {
      name: "Aron Gonzales",
      email: "Aron.Gonzales@TeamKSE.com",
      phone: "720.201.9719",
      phoneHref: "tel:+17202019719",
    },
  },
} as const satisfies SiteConfig;
