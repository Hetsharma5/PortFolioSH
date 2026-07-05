import type { IconName } from "@/icons";

export interface ToolkitCategory {
  id: string;
  label: string;
  icon: IconName;
  items: string[];
}

export const toolkit: ToolkitCategory[] = [
  {
    id: "languages",
    label: "Languages",
    icon: "terminal",
    items: ["Python", "Java (OOP)", "C++", "TypeScript", "R"],
  },
  {
    id: "data",
    label: "Data & Analytics",
    icon: "database",
    items: ["SQL", "Data Analysis", "Tableau", "Power BI"],
  },
  {
    id: "ml-iot",
    label: "Machine Learning & IoT",
    icon: "sparkles",
    items: ["Deep Learning (CNNs)", "AlexNet / ResNet50 / EfficientNet", "IoT & Embedded (ESP32)"],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "smartphone",
    items: ["React Native", "Expo", "Zustand"],
  },
  {
    id: "backend",
    label: "Backend & APIs",
    icon: "server",
    items: ["Express", "Flask", "REST API design", "MongoDB", "Razorpay"],
  },
  {
    id: "cloud",
    label: "Cloud & Platforms",
    icon: "cloud",
    items: ["AWS (EC2, S3, IAM)", "Cloudinary", "SOLIDWORKS", "Git & GitHub"],
  },
  {
    id: "security",
    label: "Cybersecurity",
    icon: "shield",
    items: [
      "JWT & session hardening",
      "Rate limiting",
      "Input sanitization",
      "OWASP Top 10 (study)",
    ],
  },
];
