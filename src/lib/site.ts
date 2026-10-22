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

// `short` is used in the desktop header where space is tight.
export const nav = [
  { href: "/", label: "Home", short: "Home" },
  { href: "/explore", label: "Explore Math", short: "Explore" },
  { href: "/interact", label: "Interact", short: "Interact" },
  { href: "/math-in-action", label: "Math in Action", short: "In Action" },
  { href: "/discover", label: "What Did We Discover?", short: "Discover" },
  { href: "/community", label: "Math Community", short: "Community" },
  { href: "/shorts", label: "Math Shorts", short: "Shorts" },
  { href: "/about", label: "About the Project", short: "About" },
] as const;
