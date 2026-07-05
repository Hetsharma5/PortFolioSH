export interface Chapter {
  label: string;
  title: string;
  period: string;
  body: string;
  current?: boolean;
}

export const chapters: Chapter[] = [
  {
    label: "Chapter I",
    title: "Computer Science & Engineering",
    period: "Karnavati University · Expected 2027",
    body: "Working toward a B.Tech in CSE turned coursework into an excuse to build real things — a CNN pipeline for ultrasound classification, an IoT traffic-light controller, a personal finance tracker — and to compete in hackathons hosted by Odoo, Smart India Hackathon, and GDG.",
  },
  {
    label: "Chapter II",
    title: "Certified SOLIDWORKS Associate",
    period: "2024",
    body: "Picked up CAD fundamentals alongside the CS coursework — a different flavor of systems thinking: constraints, tolerances, and how physical parts have to fit together.",
  },
  {
    label: "Chapter III",
    title: "AWS Certified Cloud Foundations",
    period: "2025",
    body: "Formalized the cloud fundamentals behind everything I deploy — EC2, S3, and IAM — and started treating personal projects with the same rigor as production systems.",
  },
  {
    label: "Current Mission",
    title: "Building Sattys, studying cloud security",
    period: "2026 — Now",
    body: "Went end to end on Sattys — a grocery-delivery platform with a React Native client, a role-based admin area, a website, and a hardened Express + MongoDB API — while earning an AWS Cloud Security Foundations certification and deepening the home-lab side of application security.",
    current: true,
  },
];
