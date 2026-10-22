// Edit this file to put your group's details on the site.
export const site = {
  name: "Math in Motion",
  tagline: "A website that makes you think like a mathematician.",
  course: "GED 102 · Mathematics in the Modern World",
  instructor: "Mrs. Glaziedhel Pulido",
  school: "Batangas State University",
  section: "Section ___",
  members: [
    { name: "Member 1", role: "Project lead · Explore Math" },
    { name: "Member 2", role: "Interactive activities" },
    { name: "Member 3", role: "Data collection & findings" },
    { name: "Member 4", role: "Design · Math Shorts" },
    { name: "Member 5", role: "Math in Action · Community" },
  ],
};

export const nav = [
  { href: "/", label: "Home" },
  { href: "/explore", label: "Explore Math" },
  { href: "/interact", label: "Interact" },
  { href: "/math-in-action", label: "Math in Action" },
  { href: "/discover", label: "What Did We Discover?" },
  { href: "/community", label: "Math Community" },
  { href: "/shorts", label: "Math Shorts" },
  { href: "/about", label: "About" },
] as const;
