export interface EducationEntry {
  degree: string;
  school: string;
  period: string;
  details: string[];
}

export const education: EducationEntry[] = [
  {
    degree: "B.Tech, Computer Science & Engineering",
    school: "Karnavati University, Gandhinagar",
    period: "Expected April 2027",
    details: [
      "SGPA of 7.70 through the 5th semester.",
      "Coursework and self-study spanning cloud computing (AWS), machine learning, and IoT development alongside core CS fundamentals.",
    ],
  },
];
