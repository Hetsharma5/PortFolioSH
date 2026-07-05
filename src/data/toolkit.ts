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
    items: ["TypeScript", "JavaScript (ES2023)", "SQL", "Bash"],
  },
  {
    id: "frontend",
    label: "Frontend",
    icon: "code",
    items: ["React", "HTML5 & CSS3", "Tailwind CSS", "Vite", "Zustand"],
  },
  {
    id: "backend",
    label: "Backend",
    icon: "server",
    items: ["Node.js", "Express", "REST API design", "WebSockets", "Zod validation"],
  },
  {
    id: "mobile",
    label: "Mobile",
    icon: "smartphone",
    items: ["React Native", "Expo & EAS", "Expo Router", "NativeWind", "Store releases"],
  },
  {
    id: "databases",
    label: "Databases",
    icon: "database",
    items: ["MongoDB", "Mongoose", "PostgreSQL", "Redis", "Firebase"],
  },
  {
    id: "cloud",
    label: "Cloud",
    icon: "cloud",
    items: ["AWS (EC2, S3)", "Vercel", "Cloudinary", "Nginx"],
  },
  {
    id: "devops",
    label: "DevOps",
    icon: "gitBranch",
    items: ["Docker", "GitHub Actions", "CI/CD pipelines", "Logging & monitoring"],
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
      "Security headers",
    ],
  },
  {
    id: "tools",
    label: "Tools",
    icon: "wrench",
    items: ["Git & GitHub", "VS Code", "Figma", "Postman", "Vitest", "Linux"],
  },
];
