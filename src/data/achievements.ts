import type { IconName } from "@/icons";

export interface Achievement {
  icon: IconName;
  metric: string;
  label: string;
  detail: string;
}

export const achievements: Achievement[] = [
  {
    icon: "trophy",
    metric: "3",
    label: "Hackathons competed in",
    detail: "Odoo, Smart India Hackathon (SIH), and GDG events focused on software innovation.",
  },
  {
    icon: "award",
    metric: "3",
    label: "Certifications earned",
    detail: "AWS Cloud Foundations, AWS Cloud Security Foundations, and Certified SOLIDWORKS Associate (CSWA).",
  },
  {
    icon: "folder",
    metric: "6",
    label: "Projects designed & built",
    detail: "Spanning web, mobile, machine learning, and IoT — from a production grocery app to a CNN-based diagnostic pipeline.",
  },
  {
    icon: "graduationCap",
    metric: "7.76 SGPA",
    label: "Through the 6th semester",
    detail: "B.Tech in Computer Science & Engineering, Karnavati University — expected April 2027.",
  },
];
