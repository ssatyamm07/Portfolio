/** Central copy — aligned with resume */

export const social = {
  email: "satyamraj151.rajgir@gmail.com",
  phoneDisplay: "+91 8340429200",
  location: "Vadodara, Gujarat, India",
  linkedin: "https://www.linkedin.com/in/satyam-kumar-426b13226/",
  github: "https://github.com/ssatyamm07",
};

/** App-style nav labels (delivery-app tone, still clear for a portfolio) */
export const appNav = {
  home: "Home",
  journey: "My route",
  projects: "Top picks",
  about: "The story",
  contact: "Say hi",
};

export const hero = {
  greeting: "Hello, I'm",
  name: "Satyam Kumar",
  brandKicker: "Backend · APIs · automation",
  headline: "I build scalable systems & process automation",
  roleLabel: "Swiggy · Executive Process Automation Engineer · Freelance",
  titleSequence: [
    "Executive Process Automation Engineer",
    2200,
    "New codebase? Read, build, ship.",
    2200,
    "Node · PostgreSQL · AWS · Angular",
    2200,
  ],
  tagline:
    "Backend-focused engineer building scalable B2B systems at Swiggy — reliable APIs, solid PostgreSQL schemas, AWS when work should be async, and automation that cuts manual effort. Angular when the team needs full-stack delivery.",
  highlights: [
    "Node, Express, PostgreSQL",
    "AWS SQS & S3, pragmatic design",
    "Angular when the team needs it",
    "Internal tools & workflow automation",
  ],
  ctaPrimary: "Place your order (say hi)",
  ctaSecondary: "Menu PDF (resume)",
};

export const summary = {
  short:
    "Backend-focused software engineer building scalable B2B systems — Node.js, PostgreSQL, system design, and AWS.",
  longParagraphs: [
    "I focus on designing reliable, high-performance architectures with Node.js, PostgreSQL, and pragmatic system design. AWS (SQS, S3) for async and durable work; Angular when features need full-stack delivery.",
    "At Swiggy I build internal B2B services and workflow automation. Freelance: UI for Nano Split (Zaxgen) and backend for an e-commerce platform (Saras). Side projects — Grocery, TextUtils, SafarSang — for ideas outside day job. Off-screen: fitness and singing.",
  ],
};

export const experience = [
  {
    id: "edu",
    kind: "education",
    title: "B.Tech Computer Science & Engineering",
    org: "Parul Institute of Technology, Vadodara",
    range: "2021 – Jun 2025",
    highlights: ["Completed degree June 2025", "Foundation in CS, systems, and software engineering"],
  },
  {
    id: "swiggy",
    kind: "work",
    title: "Executive Process Automation Engineer",
    org: "Swiggy",
    range: "Nov 2025 – Present",
    highlights: [
      "Node.js & Express services for internal B2B applications",
      "PostgreSQL schema design & query optimization",
      "Scalable system design, architecture, and reliability",
      "AWS SQS & S3 for async processing and storage",
      "Angular contributions for full-stack delivery",
      "Workflow automation to reduce manual effort",
    ],
  },
  {
    id: "freelance-zaxgen",
    kind: "work",
    title: "UI Developer (Freelance)",
    org: "Zaxgen · Nano Split",
    range: "2025",
    highlights: [
      "Designed and built responsive UI for Nano Split — usability and intuitive UX",
      "Translated product requirements into reusable, cross-device components",
      "Collaborated with backend and product teams for seamless feature integration",
    ],
  },
  {
    id: "freelance-sprsaras",
    kind: "work",
    title: "Backend Developer (Freelance)",
    org: "E-commerce Platform · sprsaras.com",
    range: "2025",
    highlights: [
      "Scalable PostgreSQL schemas for products, orders, and users",
      "RESTful APIs for core business logic and performance",
      "Cross-team integration between backend services and frontend",
    ],
  },
  {
    id: "bytexl",
    kind: "work",
    title: "Software Developer Intern",
    org: "ByteXL · Hybrid",
    range: "Jul 2025 – Oct 2025",
    highlights: [
      "4-tier backend with Node.js, Express, TypeScript",
      "Elasticsearch search API with full-text search & aggregations",
      "JWT access/refresh auth with middleware authorization",
      "Docker Compose for consistent dev environments",
      "SQS listener for async job orchestration",
    ],
  },
  {
    id: "instance",
    kind: "work",
    title: "Node.js Developer Intern",
    org: "Instance IT Solutions · On-site",
    range: "Dec 2024 – Feb 2025",
    highlights: [
      "Identified and fixed critical production backend bugs",
      "Developed and optimized RESTful APIs for performance and scalability",
      "Contributed to stability and reliability of backend systems",
    ],
  },
];

/** Ordered stops for the journey map (visual timeline) */
export const journeyStops = [
  {
    id: "start",
    label: "Started here",
    sub: "B.Tech · Parul Institute",
    year: "2021",
  },
  {
    id: "instance",
    label: "First industry role",
    sub: "Instance IT Solutions",
    year: "2024",
  },
  {
    id: "bytexl",
    label: "Scaled up",
    sub: "ByteXL · TypeScript & ES",
    year: "2025",
  },
  {
    id: "freelance",
    label: "Side orders",
    sub: "Freelance · UI & commerce APIs",
    year: "2025",
  },
  {
    id: "swiggy",
    label: "You are here",
    sub: "Swiggy · Automation",
    year: "Now",
  },
];

export const skills = {
  languages: ["JavaScript", "TypeScript", "Node.js", "Express.js"],
  frontend: ["React.js", "Angular"],
  data: ["PostgreSQL", "MongoDB", "MySQL", "Elasticsearch"],
  cloud: ["AWS SQS", "AWS S3", "Docker", "Git"],
  practices: [
    "System design",
    "REST APIs",
    "JWT auth",
    "Agile development",
    "Team collaboration",
    "Problem-solving",
  ],
};

export const certifications = [
  "Software Engineering (NPTEL)",
  "Introduction to Cyber Security (Cisco)",
  "Data Analytics with Python (NPTEL)",
];

export const education = [
  {
    title: "B.Tech · Computer Science & Engineering",
    place: "Parul Institute of Technology, Vadodara, Gujarat",
    range: "2021 – 2025",
    note: "Completed June 2025",
  },
  {
    title: "High School",
    place: "S.N. Sinha College, Warsaliganj, Bihar",
    range: "2019 – 2021",
    note: "71.6% · Completed July 2021",
  },
];

export const quickCartCopy = {
  barTitle: "View tray",
  barSub: "Resume · links · stack — no extra charges",
  drawerTitle: "Your add-ons",
  drawerSub: "Tap what you need — I read every message and reply as soon as I can.",
};

export const quickCartItems = [
  { id: "resume", label: "Download resume", href: "/Satyam_Resume.pdf", download: "Satyam_Kumar_Resume.pdf", icon: "fa-file-pdf" },
  { id: "linkedin", label: "LinkedIn", href: social.linkedin, external: true, icon: "fa-brands fa-linkedin" },
  { id: "github", label: "GitHub", href: social.github, external: true, icon: "fa-brands fa-github" },
  { id: "email", label: "Email chef", href: `mailto:${social.email}`, external: true, icon: "fa-envelope" },
];

const RESUME_FILE = "/Satyam_Resume.pdf";

/** Swiggy-style footer structure (generic copy — not the real company site) */
export const footerContent = {
  brandLine: "Satyam Kumar",
  brandSub: "Backend & automation.",
  finePrint: (y) => `© ${y} Satyam Kumar. Portfolio only.`,
  columns: [
    {
      title: "Company",
      links: [
        { label: "The story", to: "/about" },
        { label: "My route", href: "/#journey" },
        { label: "Top picks", href: "/#projects" },
        { label: "Say hello", to: "/contact" },
      ],
    },
    {
      title: "Contact us",
      links: [
        { label: "Help & hire", to: "/contact" },
        { label: social.email, href: `mailto:${social.email}`, external: true },
        { label: social.phoneDisplay, href: "tel:+918340429200", external: true },
      ],
    },
    {
      title: "Legal & work",
      links: [
        { label: "All projects", to: "/playlist" },
        { label: "Resume", href: RESUME_FILE, download: "Satyam_Kumar_Resume.pdf" },
        { label: "GitHub", href: social.github, external: true },
        { label: "LinkedIn", href: social.linkedin, external: true },
      ],
    },
  ],
  availableTitle: "Based in",
  availableLine: social.location,
  socialTitle: "Social links",
  bottomPitch: "Reach out — I’ll say where I’m strong and where I’d need a short ramp.",
  bottomPrimary: { label: "Order a conversation", to: "/contact" },
  bottomSecondary: { label: "Grab resume", href: RESUME_FILE, download: "Satyam_Kumar_Resume.pdf" },
};

export const homeClosing = {
  title: "Let’s talk",
  text: "Backend and automation are my main lanes. I’m upfront if a role needs skills I’m still growing. Short call is enough to see if we fit.",
  ctaPrimary: "Open contact",
  ctaSecondary: "Email me",
};

export const skillsHeadline = {
  title: "Stack",
  kicker: "Tech",
};

/** Grid tiles for “What I do” — Font Awesome 6 classes */
export const skillTiles = [
  { label: "JavaScript", icon: "fa-brands fa-js" },
  { label: "TypeScript", icon: "fa-solid fa-code" },
  { label: "Node.js", icon: "fa-brands fa-node" },
  { label: "Express", icon: "fa-brands fa-node-js" },
  { label: "React", icon: "fa-brands fa-react" },
  { label: "Angular", icon: "fa-brands fa-angular" },
  { label: "PostgreSQL", icon: "fa-solid fa-database" },
  { label: "MongoDB", icon: "fa-solid fa-seedling" },
  { label: "AWS", icon: "fa-brands fa-aws" },
  { label: "Docker", icon: "fa-brands fa-docker" },
  { label: "Git", icon: "fa-brands fa-git-alt" },
  { label: "REST APIs", icon: "fa-solid fa-network-wired" },
];

export const techMarqueeItems = [
  "Node.js",
  "Express",
  "PostgreSQL",
  "AWS SQS",
  "AWS S3",
  "Angular",
  "React",
  "TypeScript",
  "Docker",
  "REST APIs",
  "System design",
  "Git",
];
