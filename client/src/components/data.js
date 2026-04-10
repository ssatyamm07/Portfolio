/** Project catalog — previews in /public/previews/ */
const projectData = [
  {
    id: "nano-split",
    projectName: "Nano Split",
    roleLine: "Freelance · Zaxgen",
    description:
      "UI-focused delivery for Nano Split on Zaxgen’s platform: responsive layouts, reusable components, and tight collaboration with product and engineering so the experience stays consistent across breakpoints.",
    demo: "https://www.zaxgen.com/solutions",
    demoOnDemand: true,
    imgsrc: "/previews/zaxgen-card.png",
    previewObjectPosition: "50% 0",
    tags: ["React", "UI/UX", "Responsive"],
    featuredHome: true,
  },
  {
    id: "sprsaras",
    projectName: "Saras",
    roleLine: "Freelance · E-commerce (sprsaras.com)",
    description:
      "Commerce experience for products and services: catalog, offers, filters, and flows tuned for mobile — integrated with the team’s backend and ops.",
    demo: "https://sprsaras.com/",
    demoOnDemand: true,
    imgsrc: "/previews/sprsaras-card.png",
    previewObjectPosition: "50% 50%",
    tags: ["React", "E-commerce", "Mobile UI"],
    featuredHome: true,
  },
  {
    id: "grocery",
    projectName: "Grocery Delivery App",
    roleLine: "Personal · Full-stack",
    description:
      "MERN-style grocery ordering with Express APIs and PostgreSQL for real-time data, search, filters, and a streamlined checkout-style UI.",
    demo: "",
    imgsrc: "/previews/grocery-card.png",
    previewObjectPosition: "50% 12%",
    tags: ["Node.js", "Express", "PostgreSQL", "React"],
    featuredHome: false,
  },
  {
    id: "textutils",
    projectName: "TextUtils",
    roleLine: "Personal · React",
    description:
      "React text toolkit: transforms, word and character counts, and reading-time estimates for faster content editing.",
    demo: "https://textutils-eight-sigma.vercel.app/",
    imgsrc: "/previews/textutils-card.png",
    previewObjectPosition: "50% 0",
    tags: ["React", "SPA"],
    featuredHome: false,
  },
  {
    id: "safarsang",
    projectName: "SafarSang",
    roleLine: "Personal · Travel",
    description:
      "Full-stack travel explorer with curated packages, itineraries, and integrations for hotels and transport partners.",
    demo: "https://safarsang.vercel.app/",
    imgsrc: "/previews/safarsang-card.png",
    previewObjectPosition: "50% 40%",
    tags: ["Full-stack", "Booking"],
    featuredHome: false,
  },
];

export const homeSpotlightProjects = projectData.filter((p) => p.featuredHome);

export default projectData;
