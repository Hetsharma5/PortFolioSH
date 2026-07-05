export interface NavItem {
  id: string;
  label: string;
}

/** Links shown in the navbar. */
export const navItems: NavItem[] = [
  { id: "about", label: "About" },
  { id: "toolkit", label: "Toolkit" },
  { id: "evidence", label: "Evidence Locker" },
  { id: "experience", label: "Experience" },
  { id: "lab", label: "Cyber Lab" },
  { id: "contact", label: "Contact" },
];

/** Every section on the page — used by the command palette. */
export const allSections: NavItem[] = [
  { id: "hero", label: "Landing" },
  { id: "about", label: "About" },
  { id: "toolkit", label: "Investigation Toolkit" },
  { id: "evidence", label: "Evidence Locker" },
  { id: "experience", label: "Field Experience" },
  { id: "education", label: "Education" },
  { id: "lab", label: "Cyber Lab" },
  { id: "notebook", label: "The Investigator's Notebook" },
  { id: "gaming", label: "Current Side Quest" },
  { id: "achievements", label: "Achievements" },
  { id: "contact", label: "Contact" },
];

/** Every section the scroll-spy tracks (nav sections + hero for the "at top" state). */
export const spyIds = ["hero", ...navItems.map((item) => item.id)];
