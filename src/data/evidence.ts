export type EvidenceVisualKind =
  | "commerce-phone"
  | "dashboard-browser"
  | "chat-browser"
  | "travel-phone";

export interface EvidenceFile {
  id: string;
  /** Stamped on the card header, e.g. "EF-001". */
  number: string;
  title: string;
  /** One-line mission statement. */
  mission: string;
  /** What was broken, missing, or worth solving before this existed. */
  problem: string;
  status: "ACTIVE" | "CLOSED";
  /** The technical challenges worked through to get to a solution. */
  investigation: string[];
  /** What was actually built. */
  solution: string;
  outcome: string;
  tech: string[];
  /** Replace with real repository / demo URLs. */
  github: string;
  demo?: string;
  visual: EvidenceVisualKind;
  featured?: boolean;
}

export const evidenceFiles: EvidenceFile[] = [
  {
    id: "sattys",
    number: "EF-001",
    title: "Sattys",
    mission:
      "Build a complete grocery-delivery platform — customer app, admin operations, and API — as a single engineer.",
    problem:
      "Local grocery orders were still running through phone calls and spreadsheets — no real-time order tracking, no centralized inventory, no way to scale past word of mouth.",
    status: "ACTIVE",
    investigation: [
      "Payment integrity: Razorpay checkout with signature verification and webhooks",
      "Auth that can be revoked — JWTs with a server-side blacklist, layered rate limiting",
      "One codebase owner across Expo/React Native client and Express 5 + MongoDB server",
    ],
    solution:
      "Shipped a React Native customer app, a role-based admin dashboard, and a hardened Express + MongoDB API handling payments, orders, and delivery logistics end to end.",
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
    number: "EF-002",
    title: "Pulseboard",
    mission: "Give small SaaS teams live metrics without a heavyweight analytics suite.",
    problem:
      "Off-the-shelf analytics tools were overkill for small teams — expensive, slow to update, and too generic for the specific funnels they actually cared about.",
    status: "CLOSED",
    investigation: [
      "Sub-second updates through a fan-out WebSocket layer",
      "60fps charts drawn on canvas — no charting library",
    ],
    solution:
      "Built a lightweight live dashboard with custom canvas charts and a WebSocket fan-out layer for near-instant updates.",
    outcome: "Live dashboard with funnels and alert rules that notify over email and Slack.",
    tech: ["React", "TypeScript", "Node.js", "WebSockets", "PostgreSQL", "Docker"],
    github: "https://github.com/hetsharma/pulseboard",
    demo: "https://pulseboard-demo.vercel.app",
    visual: "dashboard-browser",
  },
  {
    id: "devmate",
    number: "EF-003",
    title: "DevMate AI",
    mission: "Summarize pull requests and suggest focused improvements, straight into GitHub reviews.",
    problem:
      "Reviewing large pull requests eats time and important details get skimmed — feedback that should take minutes stretches into hours.",
    status: "CLOSED",
    investigation: [
      "Diff-aware prompting to keep Claude API reviews focused and cheap",
      "Token-by-token streaming so feedback feels instant",
    ],
    solution:
      "Built a bot that reads diffs, prompts Claude for targeted feedback, and posts it back as native GitHub review comments.",
    outcome: "Posts suggestions as native GitHub review comments; used on my own repos daily.",
    tech: ["React", "Node.js", "Claude API", "GitHub API", "Redis"],
    github: "https://github.com/hetsharma/devmate-ai",
    visual: "chat-browser",
  },
  {
    id: "tripkit",
    number: "EF-004",
    title: "TripKit",
    mission: "Let friends plan trips together — shared itineraries, expense splitting, stop voting.",
    problem:
      "Group trip planning was scattered across chat threads, spreadsheets, and separate expense apps, with no single source of truth.",
    status: "CLOSED",
    investigation: [
      "Offline-first writes with conflict-free merge on reconnect",
      "Per-person settlement math that survives partial data",
    ],
    solution:
      "Built a realtime collaborative planner backed by Firestore listeners, with offline-first writes and automatic settlement math.",
    outcome: "Realtime collaborative planner backed by Firestore listeners, built mobile-first.",
    tech: ["React Native", "Expo", "TypeScript", "Firebase", "Maps SDK"],
    github: "https://github.com/hetsharma/tripkit",
    visual: "travel-phone",
  },
];
