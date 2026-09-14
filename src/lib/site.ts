export const siteConfig = {
  name: "Duo Li",
  title: "Duo Li — Personal Digital Garden",
  description:
    "A long-term personal archive of projects, knowledge, photography, music and life experiences.",
  role: "Senior Software Engineer",
  tagline: "Systems • AI • Photography • Music",
};

export const socialLinks = {
  github: "https://github.com/dli1986",
  linkedin: "",
  rss: "/rss.xml",
};

export interface NavItem {
  label: string;
  href: string;
  description: string;
}

export const navItems: NavItem[] = [
  { label: "Now", href: "/now", description: "What I am doing now" },
  { label: "Projects", href: "/projects", description: "Long-term project archive" },
  { label: "Knowledge", href: "/knowledge", description: "Evergreen technical content" },
  { label: "Notes", href: "/notes", description: "Quick thoughts and discoveries" },
  { label: "Photography", href: "/photography", description: "Personal photography portfolio" },
  { label: "Music", href: "/music", description: "Music archive and listening records" },
  { label: "Reading", href: "/reading", description: "Books and reflections" },
  { label: "Career", href: "/career", description: "Professional profile" },
  { label: "About", href: "/about", description: "Personal background" },
  { label: "Search", href: "/search", description: "Search all content" },
];

export const currentFocus = [
  "Agent Runtime research",
  "Real-time Voice AI",
  "Personal Knowledge Systems",
  "Career planning for future opportunities",
];

export const currentlyReading = [
  "AI engineering",
  "Systems design",
  "Technology history",
];

export const currentlyListening = [
  "Chinese music collection",
  "Classic singer-songwriters",
];

export const aboutBio = {
  intro: "Senior Software Engineer.",
  interests: [
    "Systems Programming",
    "AI Applications",
    "Agent Runtime",
    "Speech Technology",
    "Photography",
    "Music",
    "Reading",
  ],
  statement:
    "This website is a long-term archive of projects, knowledge, photographs, music collections and life experiences.",
};

export const knowledgeCategories = [
  "AI",
  "Agent Runtime",
  "Speech",
  "System Programming",
  "Linux",
  "Databases",
  "Career",
  "Productivity",
];

export const photographyCategories = [
  "Lithuania",
  "China",
  "Street",
  "Landscape",
  "Travel",
  "Family",
  "Favorites",
];

export const musicCategories = [
  "Chinese Music",
  "Singer Songwriters",
  "Favorites",
  "Albums",
  "Recommendations",
];

export const readingCategories = [
  "Technology",
  "History",
  "Biography",
  "Psychology",
  "Parenting",
];
