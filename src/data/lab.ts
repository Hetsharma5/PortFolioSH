import type { IconName } from "@/icons";

export interface LabTopic {
  topic: string;
  icon: IconName;
  note: string;
}

/**
 * Interests, labs, and self-learning — deliberately framed as ongoing study,
 * not certifications or professional claims.
 */
export const labTopics: LabTopic[] = [
  {
    topic: "Application Security",
    icon: "shield",
    note: "Studying how real apps fail: injection, broken auth, misconfiguration.",
  },
  {
    topic: "OWASP",
    icon: "bookOpen",
    note: "The Top 10 as a running checklist for everything I ship.",
  },
  {
    topic: "Secure Coding",
    icon: "code",
    note: "Validate at the edges, least privilege by default.",
  },
  {
    topic: "Authentication",
    icon: "key",
    note: "Shipped revocable JWTs in production; exploring OAuth and session design.",
  },
  {
    topic: "Rate Limiting",
    icon: "zap",
    note: "Layered global and per-route limiters, tested against my own API.",
  },
  {
    topic: "API Security",
    icon: "lock",
    note: "Headers, sanitization, and the boring parts that actually matter.",
  },
  {
    topic: "Network Fundamentals",
    icon: "globe",
    note: "TCP/IP, DNS, TLS — traced packet by packet in a home lab.",
  },
  {
    topic: "Digital Forensics",
    icon: "search",
    note: "Logs and artifacts as evidence; timeline reconstruction for fun.",
  },
  {
    topic: "Threat Analysis",
    icon: "crosshair",
    note: "Thinking like an attacker to design like a defender.",
  },
  {
    topic: "Linux",
    icon: "terminal",
    note: "Daily driver for servers, labs, and everything in between.",
  },
  {
    topic: "Ethical Security Research",
    icon: "eye",
    note: "Responsible-disclosure mindset. My own targets only.",
  },
];
