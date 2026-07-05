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
    github: "https://github.com/Hetsharma5",
    demo: "https://sattys.in",
    visual: "commerce-phone",
    featured: true,
  },
  {
    id: "breast-cancer-detection",
    number: "EF-002",
    title: "Breast Cancer Detection using Deep Learning",
    mission:
      "Classify breast ultrasound images into Normal, Benign, and Malignant to support faster, more consistent screening.",
    problem:
      "Manually reviewing ultrasound images is slow and depends heavily on the reviewer's experience — the visual differences between benign and malignant tissue can be subtle.",
    status: "CLOSED",
    investigation: [
      "Built and compared four CNN architectures — AlexNet, ResNet50, GoogLeNet, and EfficientNet — on the same dataset",
      "Tuned preprocessing and augmentation for a small, imbalanced medical-imaging dataset",
    ],
    solution:
      "Built a CNN pipeline that classifies ultrasound images across all three categories, benchmarking multiple architectures to find the strongest performer.",
    outcome: "Best-performing model reached ~92% classification accuracy across all three classes.",
    tech: ["Python", "Deep Learning", "CNN", "AlexNet", "ResNet50", "GoogLeNet", "EfficientNet"],
    github: "https://github.com/Hetsharma5",
    visual: "chat-browser",
  },
  {
    id: "smart-traffic-light",
    number: "EF-003",
    title: "IoT Smart Traffic Light Control System",
    mission:
      "Cut needless idle time at intersections by making a traffic signal react to actual traffic instead of a fixed timer.",
    problem:
      "Fixed-timer traffic lights hold a red signal even when there's no cross traffic, wasting time and fuel at the intersection.",
    status: "CLOSED",
    investigation: [
      "Vehicle detection using ultrasonic sensors wired to an ESP32 at each approach",
      "Dynamic signal-timing logic that adjusts green-light duration to real-time traffic load",
    ],
    solution:
      "Built an ESP32-based traffic light controller that senses vehicle presence per approach and adjusts signal timing accordingly.",
    outcome:
      "Working prototype that detects vehicles and shortens green-light time on empty approaches, reducing idle traffic flow.",
    tech: ["ESP32", "C++", "Ultrasonic Sensors", "IoT", "Embedded Systems"],
    github: "https://github.com/Hetsharma5",
    visual: "travel-phone",
  },
  {
    id: "sattys-in",
    number: "EF-004",
    title: "Sattys.in",
    mission: "Build and deploy the web platform for Sattys, end to end, as a full stack developer.",
    problem:
      "Sattys needed a web presence beyond the mobile app — a way for people to reach the platform without installing anything first.",
    status: "ACTIVE",
    investigation: [
      "Frontend wired to the same Express + MongoDB API as the mobile app, without duplicating business logic",
      "Database connectivity built for dynamic, real-time interaction rather than a static page",
    ],
    solution:
      "Developed and deployed a production website — frontend, backend integration, and database connectivity for dynamic user interaction.",
    outcome: "Live in production at sattys.in.",
    tech: ["Full-Stack Web Development", "Express", "MongoDB", "REST APIs"],
    github: "https://github.com/Hetsharma5",
    demo: "https://sattys.in",
    visual: "dashboard-browser",
  },
  {
    id: "kisansarthi",
    number: "EF-005",
    title: "KisanSarthi",
    mission:
      "Build a mobile-first web application that helps Indian farmers optimize their field layouts, predict yields, and estimate profits — turning raw land boundaries into actionable planting blueprints.",
    problem:
      "Farmers and agricultural planners lack an accessible, visual tool to plan crop spacing, calculate precise input requirements (seeds, fertilizer), and forecast profitability before they begin planting.",
    status: "CLOSED",
    investigation: [
      "Interactive map-based field drawing using Leaflet + Turf.js for real-time geospatial area computation (sq meters, acres, hectares)",
      "A crop modeling engine that calculates row/plant counts, seed rates, fertilizer needs, expected yield, revenue, cost, and net profit from a configurable crop database",
      "Express + MongoDB backend with user and land persistence APIs to save and retrieve planting blueprints",
    ],
    solution:
      "Developed a full-stack, 4-step wizard application — field boundary drawing, crop selection, layout generation, and a financial results dashboard — with a React 19 frontend, Express backend, and MongoDB storage.",
    outcome:
      "A working hackathon prototype delivering end-to-end crop planning from polygon input to profit estimation.",
    tech: ["React 19", "Vite", "Tailwind CSS", "Leaflet + Turf.js", "Express", "MongoDB"],
    github: "https://github.com/Hetsharma5",
    visual: "dashboard-browser",
  },
  {
    id: "spendo",
    number: "EF-006",
    title: "Spendo — Personal Finance Tracker",
    mission: "Give people a simple, trustworthy way to track personal expenses.",
    problem:
      "Most budgeting apps are either too complex to bother with or too opaque to trust with personal transaction data.",
    status: "CLOSED",
    investigation: [
      "Designed a relational schema for users, categories, and transactions",
      "Built REST APIs in Flask for secure storage and retrieval of financial transactions",
    ],
    solution:
      "Built a full-stack expense tracker with a Flask backend, a SQL database, and REST APIs for recording and querying transactions.",
    outcome: "Working expense tracker that stores and categorizes transactions through a secure API.",
    tech: ["Python", "Flask", "SQL", "REST APIs"],
    github: "https://github.com/Hetsharma5",
    visual: "dashboard-browser",
  },
];
