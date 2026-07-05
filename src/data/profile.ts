export interface SocialLink {
  label: string;
  url: string;
  icon: "github" | "linkedin" | "x";
}

export const profile = {
  name: "Het Sharma",
  firstName: "Het",
  initials: "SH",
  role: "Software Engineer",
  roles: ["Software Engineer", "Full-Stack & Mobile Developer", "Cybersecurity Enthusiast", "Curious Problem Solver"],
  statement:
    "I enjoy investigating complex systems, securing applications, and building software that solves real-world problems.",
  location: "India · Working worldwide",
  availability: "Open to new cases",
  email: "hetsharma0585@gmail.com",
  quote: "Every system leaves clues. Every problem has a solution.",
  // Replace these with your real profile URLs.
  socials: [
    { label: "GitHub", url: "https://github.com/hetsharma", icon: "github" },
    { label: "LinkedIn", url: "https://www.linkedin.com/in/hetsharma", icon: "linkedin" },
    { label: "X (Twitter)", url: "https://x.com/hetsharma", icon: "x" },
  ] satisfies SocialLink[],
};
