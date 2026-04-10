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
  journey: "Your route",
  projects: "Top picks",
  about: "The story",
};

export const hero = {
  greeting: "Hello, I'm",
  name: "Satyam Kumar",
  brandKicker: "Your stack. Delivered fresh.",
  headline: "I build scalable B2B systems & process automation",
  roleLabel: "Backend, freelance delivery & automation · Swiggy",
  titleSequence: [
    "Executive Process Automation Engineer",
    2200,
    "Shipping internal tools that scale",
    2200,
    "Node · PostgreSQL · AWS · Angular",
    2200,
  ],
  tagline:
    "Crisp APIs, tidy data models, and automation that saves real hours — the same discipline I bring to high-traffic ops products.",
  highlights: [
    "Node.js, Express, PostgreSQL",
    "AWS SQS & S3 · system design",
    "Angular for full-stack delivery",
    "Automation & workflow tooling",
  ],
  ctaPrimary: "Place your order (say hi)",
  ctaSecondary: "Menu PDF (resume)",
};

export const summary = {
  short:
    "I plate up backend services for busy teams: solid architecture, snappy SQL, and async flows with queues & object storage — maintainable, observable, and ready for the dinner rush.",
  longParagraphs: [
    "I'm a backend-focused software engineer with hands-on experience building scalable B2B systems. My toolkit centers on Node.js, PostgreSQL, and pragmatic system design, with AWS services like SQS and S3 for asynchronous work and durable storage.",
    "I've shipped freelance work too — from responsive UI for Nano Split (Zaxgen) to mobile commerce on Saras (sprsaras.com) — alongside full-stack features with Angular in product teams. Outside of work I build side projects, stay fit, and enjoy singing.",
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
      "Node.js & Express services for internal B2B apps",
      "PostgreSQL schema design & query optimization",
      "AWS SQS & S3 for async processing and storage",
      "Angular contributions for full-stack delivery",
      "Workflow automation to reduce manual operations",
    ],
  },
  {
    id: "freelance-zaxgen",
    kind: "work",
    title: "UI Developer (Freelance)",
    org: "Zaxgen · Nano Split",
    range: "2025",
    highlights: [
      "UI-focused delivery with responsive layouts and reusable components",
      "Aligned with product and engineering for a consistent cross-device experience",
    ],
  },
  {
    id: "freelance-sprsaras",
    kind: "work",
    title: "Full-stack / E-commerce (Freelance)",
    org: "Saras · sprsaras.com",
    range: "2025",
    highlights: [
      "Product catalog, offers, and mobile-first shopping flows",
      "Integration with backend services and team delivery practices",
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
      "Elasticsearch search API with aggregations",
      "JWT access/refresh auth & Docker Compose",
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
      "Debugged and stabilized production backend issues",
      "Improved REST API performance and scalability",
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
  practices: ["System design", "REST APIs", "JWT auth", "Agile"],
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
  drawerSub: "Tap what you need. I usually reply faster than a 10-minute delivery window.",
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
  brandSub: "Backend & automation — served hot.",
  finePrint: (y) => `© ${y} Satyam Kumar. Portfolio only.`,
  columns: [
    {
      title: "Company",
      links: [
        { label: "The story", to: "/about" },
        { label: "Your route", href: "/#journey" },
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
  bottomPitch: "For a smoother collab, reach out — I’m usually faster than peak-hour traffic.",
  bottomPrimary: { label: "Order a conversation", to: "/contact" },
  bottomSecondary: { label: "Grab resume", href: RESUME_FILE, download: "Satyam_Kumar_Resume.pdf" },
};

export const homeClosing = {
  title: "Hungry for a solid hire?",
  text: "If you need backend, automation, or platform muscle — let’s line up a quick chat. No minimum order.",
  ctaPrimary: "Open contact",
  ctaSecondary: "Email me",
};

export const skillsHeadline = {
  title: "What's cooking",
  kicker: "Skills",
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
