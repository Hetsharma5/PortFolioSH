export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  details: string[];
}

// Replace with your real education history.
export const education: EducationEntry[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Gujarat Technological University",
    period: "2020 — 2024",
    details: [
      "Focus areas: data structures & algorithms, database systems, operating systems, and computer networks.",
      "Built and led the mobile app for the university tech fest — 2,000+ downloads in its first week.",
    ],
  },
];
