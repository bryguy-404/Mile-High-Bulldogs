import { z } from "astro/zod";
import { text } from "./content-validation";
import { sharedContent } from "./homepage-content";
import originStoryData from "../content/origin-story.json";
import whyWeExistData from "../content/why-we-exist.json";

const originStoryContent = z.object({
  eyebrow: text,
  title: text,
  copy: z.object({
    intro: text,
    background: text,
    ideaIntro: text,
    idea: text,
    invitation: text,
    questionIntro: text,
    question: text,
    answer: text,
    turnout: text,
    beginning: text,
    birth: text,
    continuation: text,
    closingIntro: text,
    closing: text
  }),
}).parse(originStoryData);
export const originStory = {
  ...originStoryContent,
  paragraphs: [
    originStoryContent.copy.intro,
    originStoryContent.copy.background,
    originStoryContent.copy.ideaIntro,
    originStoryContent.copy.idea,
    originStoryContent.copy.invitation,
    originStoryContent.copy.questionIntro,
    originStoryContent.copy.question,
    originStoryContent.copy.answer,
    originStoryContent.copy.turnout,
    originStoryContent.copy.beginning,
    originStoryContent.copy.birth,
    originStoryContent.copy.continuation,
    originStoryContent.copy.closingIntro,
    originStoryContent.copy.closing,
    sharedContent.tagline
  ],
};

const whyWeExistContent = z.object({
  eyebrow: text,
  title: text,
  copy: z.object({
    graduation: text,
    connection: text,
    purpose: text,
    mission: text,
    calloutIntro: text,
    callout: text,
    events: text,
    eventsEmphasis: text,
    community: text,
    belongingIntro: text,
    belonging: text,
    graduationCard: text,
    studiesCard: text,
    coloradoCard: text,
    welcomeCard: text,
    invitation: text,
    closingLead: text,
    closingEmphasis: text
  }),
}).parse(whyWeExistData);
export const whyWeExist = {
  ...whyWeExistContent,
  paragraphs: [
    whyWeExistContent.copy.graduation,
    whyWeExistContent.copy.connection,
    whyWeExistContent.copy.purpose,
    whyWeExistContent.copy.mission,
    whyWeExistContent.copy.calloutIntro,
    whyWeExistContent.copy.callout,
    whyWeExistContent.copy.events,
    whyWeExistContent.copy.eventsEmphasis,
    whyWeExistContent.copy.community,
    whyWeExistContent.copy.belongingIntro,
    whyWeExistContent.copy.belonging,
    whyWeExistContent.copy.graduationCard,
    whyWeExistContent.copy.studiesCard,
    whyWeExistContent.copy.coloradoCard,
    whyWeExistContent.copy.welcomeCard,
    whyWeExistContent.copy.invitation,
    whyWeExistContent.copy.closingLead,
    whyWeExistContent.copy.closingEmphasis,
    sharedContent.tagline
  ],
};
