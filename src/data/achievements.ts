import type { IconName } from "@/icons";

export interface Achievement {
  icon: IconName;
  metric: string;
  label: string;
  detail: string;
}

// Replace with your real numbers.
export const achievements: Achievement[] = [
  {
    icon: "smartphone",
    metric: "2 stores",
    label: "Sattys shipped to iOS & Android",
    detail: "Designed, built, and released end to end as a single engineer.",
  },
  {
    icon: "trophy",
    metric: "2,000+",
    label: "Downloads in week one",
    detail: "University fest app I built and led during my B.Tech.",
  },
  {
    icon: "folder",
    metric: "12+",
    label: "Projects designed & shipped",
    detail: "From marketing sites to production platforms, web and mobile.",
  },
  {
    icon: "zap",
    metric: "3+ yrs",
    label: "Writing production code",
    detail: "TypeScript across the stack, with tests where they earn their keep.",
  },
];
