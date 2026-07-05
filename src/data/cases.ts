export type CaseVisualKind =
  | "commerce-phone"
  | "dashboard-browser"
  | "chat-browser"
  | "travel-phone";

export interface CaseFile {
  id: string;
  /** Stamped on the card header, e.g. "CF-001". */
  number: string;
  title: string;
  /** One-line mission statement. */
  mission: string;
  status: "ACTIVE" | "CLOSED";
  challenges: string[];
  outcome: string;
  tech: string[];
  /** Replace with real repository / demo URLs. */
  github: string;
  demo?: string;
  visual: CaseVisualKind;
  featured?: boolean;
}

export const caseFiles: CaseFile[] = [
  {
    id: "sattys",
    number: "CF-001",
    title: "Sattys",
    mission:
      "Build a complete grocery-delivery platform — customer app, admin operations, and API — as a single engineer.",
    status: "ACTIVE",
    challenges: [
      "Payment integrity: Razorpay checkout with signature verification and webhooks",
      "Auth that can be revoked — JWTs with a server-side blacklist, layered rate limiting",
      "One codebase owner across Expo/React Native client and Express 5 + MongoDB server",
    ],
    outcome:
      "In production. Customer app on iOS & Android, role-based admin area, and a hardened API with sanitized inputs and Zod-validated routes.",
    tech: ["React Native", "Expo", "TypeScript", "Express 5", "MongoDB", "Zustand", "Razorpay", "Cloudinary"],
    github: "https://github.com/hetsharma/sattys",
    demo: "https://sattys.com",
    visual: "commerce-phone",
    featured: true,
  },
  {
    id: "pulseboard",
    number: "CF-002",
    title: "Pulseboard",
    mission: "Give small SaaS teams live metrics without a heavyweight analytics suite.",
    status: "CLOSED",
    challenges: [
      "Sub-second updates through a fan-out WebSocket layer",
      "60fps charts drawn on canvas — no charting library",
    ],
    outcome: "Live dashboard with funnels and alert rules that notify over email and Slack.",
    tech: ["React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL", "Docker"],
    github: "https://github.com/hetsharma/pulseboard",
    demo: "https://pulseboard-demo.vercel.app",
    visual: "dashboard-browser",
  },
  {
    id: "devmate",
    number: "CF-003",
    title: "DevMate AI",
    mission: "Summarize pull requests and suggest focused improvements, straight into GitHub reviews.",
    status: "CLOSED",
    challenges: [
      "Diff-aware prompting to keep Claude API reviews focused and cheap",
      "Token-by-token streaming so feedback feels instant",
    ],
    outcome: "Posts suggestions as native GitHub review comments; used on my own repos daily.",
    tech: ["React", "Node.js", "Claude API", "GitHub API", "Redis"],
    github: "https://github.com/hetsharma/devmate-ai",
    visual: "chat-browser",
  },
  {
    id: "tripkit",
    number: "CF-004",
    title: "TripKit",
    mission: "Let friends plan trips together — shared itineraries, expense splitting, stop voting.",
    status: "CLOSED",
    challenges: [
      "Offline-first writes with conflict-free merge on reconnect",
      "Per-person settlement math that survives partial data",
    ],
    outcome: "Realtime collaborative planner backed by Firestore listeners, built mobile-first.",
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "Maps SDK"],
    github: "https://github.com/hetsharma/tripkit",
    visual: "travel-phone",
  },
];
