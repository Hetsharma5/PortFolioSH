export interface Chapter {
  label: string;
  title: string;
  period: string;
  body: string;
  current?: boolean;
}

// Replace with your real journey.
export const chapters: Chapter[] = [
  {
    label: "Chapter I",
    title: "Started Programming",
    period: "2019",
    body: "Wrote my first lines of code to answer a simple question: how does this actually work? The answer took a weekend. The question never went away.",
  },
  {
    label: "Chapter II",
    title: "Built My First Projects",
    period: "2020 — 2022",
    body: "Small tools, sites for friends, and a university fest app that hit 2,000+ downloads in its first week. Learned by shipping — and by debugging what shipping broke.",
  },
  {
    label: "Chapter III",
    title: "Full-Stack Development",
    period: "2022 — 2024",
    body: "Interned on a React product team, then went independent: dashboards, marketing sites, and internal tools for clients, standardized on TypeScript, React, and Node.js.",
  },
  {
    label: "Chapter IV",
    title: "Mobile Development",
    period: "2024",
    body: "Went end to end on Sattys — a grocery-delivery platform with an Expo/React Native client, admin area, payments, and a production API. Shipped to both app stores.",
  },
  {
    label: "Current Mission",
    title: "Building secure and scalable software",
    period: "Now",
    body: "Applying what the home lab keeps teaching me — hardening auth, rate limiting, sanitization — to everything I build, while staying open to the next case.",
    current: true,
  },
];
