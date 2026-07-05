import type { IconName } from "@/icons";

export interface NotebookEntry {
  topic: string;
  icon: IconName;
  note: string;
}

/**
 * A personality section, not a professional qualification. Forensic science
 * here means a personal reading interest in the reasoning behind
 * investigations — not digital forensics, and not a claim of practitioner
 * experience.
 */
export const notebookEntries: NotebookEntry[] = [
  {
    topic: "Observation",
    icon: "eye",
    note: "Most of what matters is in the detail everyone else scrolls past. Noticing it first is most of the skill.",
  },
  {
    topic: "Evidence-Based Reasoning",
    icon: "search",
    note: "Conclusions follow the evidence, not the other way around — rule out the comfortable answer before trusting it.",
  },
  {
    topic: "Pattern Recognition",
    icon: "sparkles",
    note: "Systems repeat their own history. Recognizing the shape of a problem is most of the way to solving it.",
  },
  {
    topic: "Logical Deduction",
    icon: "crosshair",
    note: "Narrowing a wide field of possibilities down to the one explanation that survives every test.",
  },
  {
    topic: "Scientific Reasoning",
    icon: "bookOpen",
    note: "Hypothesize, test, revise — the same loop whether it's a case study or a failing build.",
  },
  {
    topic: "Human Behavior & Psychology",
    icon: "key",
    note: "The reasoning behind a decision, read for the same reason I read source code: it explains what happens next.",
  },
];
