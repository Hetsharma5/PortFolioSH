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
    topic: "Secure Coding",
    icon: "code",
    note: "Validate at the edges, least privilege by default — habits that make bugs boring instead of dangerous.",
  },
  {
    topic: "Application Security",
    icon: "shield",
    note: "Studying how real apps fail: injection, broken auth, misconfiguration.",
  },
  {
    topic: "Authentication",
    icon: "key",
    note: "Shipped revocable JWTs in production; exploring OAuth and session design.",
  },
  {
    topic: "Authorization",
    icon: "lock",
    note: "Role-based access and scoped tokens — the middleware that stops an authenticated user from doing too much.",
  },
  {
    topic: "OWASP Top 10",
    icon: "bookOpen",
    note: "The running checklist for everything I ship, not just something I read once.",
  },
  {
    topic: "API Security",
    icon: "server",
    note: "Headers, sanitization, and rate-aware design — the boring parts that actually matter.",
  },
  {
    topic: "Rate Limiting",
    icon: "zap",
    note: "Layered global and per-route limiters, tested against my own API.",
  },
  {
    topic: "Secure Architectures",
    icon: "gitBranch",
    note: "Designing systems so one compromised component doesn't mean a compromised system.",
  },
  {
    topic: "Linux",
    icon: "terminal",
    note: "Daily driver for servers, labs, and everything in between.",
  },
  {
    topic: "Networking",
    icon: "globe",
    note: "TCP/IP, DNS, TLS — traced packet by packet in a home lab.",
  },
  {
    topic: "Cloud Security",
    icon: "cloud",
    note: "IAM policies, least-privilege roles, and the ways a misconfigured bucket becomes a headline.",
  },
];
