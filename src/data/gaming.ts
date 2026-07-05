export interface SaveSlot {
  slot: string;
  title: string;
  playtime: string;
  lastSaved: string;
  note: string;
  /** 0–100, rendered as the save-file progress bar. */
  progress: number;
}

export const gaming = {
  lead: "Off the clock I play the way I work — patiently, systemically, and for the story. Games are inspiration, not distraction.",
  slots: [
    {
      slot: "01",
      title: "Story-driven games",
      playtime: "180h+",
      lastSaved: "last night",
      note: "Great narratives manage attention, pacing, and payoff. So does great UX.",
      progress: 74,
    },
    {
      slot: "02",
      title: "Open-world exploration",
      playtime: "120h+",
      lastSaved: "2 days ago",
      note: "Open worlds are systems design — economies, emergent behavior, and what players do when you don't tell them anything.",
      progress: 58,
    },
    {
      slot: "03",
      title: "Strategy & tactics",
      playtime: "90h+",
      lastSaved: "yesterday",
      note: "Planning under uncertainty with limited resources. Basically sprint planning with better music.",
      progress: 91,
    },
  ] satisfies SaveSlot[],
};
