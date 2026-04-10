/** Central copy — aligned with resume */

export const social = {
  email: "satyamraj151.rajgir@gmail.com",
  phoneDisplay: "+91 8340429200",
  location: "Vadodara, Gujarat, India",
  linkedin: "https://www.linkedin.com/in/satyam-kumar-426b13226/",
  github: "https://github.com/ssatyamm07",
};

export const hero = {
  greeting: "Hello, I'm",
  name: "Satyam Kumar",
  /** Large headline (reference-style hero) */
  headline: "I build scalable B2B systems & process automation",
  roleLabel: "Backend & automation engineer",
  titleSequence: [
    "Executive Process Automation Engineer",
    2000,
    "Backend & B2B systems",
    2000,
    "Node.js · PostgreSQL · AWS",
    2000,
  ],
  tagline:
    "Backend-focused engineer building scalable internal B2B platforms — reliable APIs, solid data models, and automation that cuts manual work.",
  highlights: [
    "Node.js, Express, PostgreSQL",
    "AWS SQS & S3 · system design",
    "Angular for full-stack delivery",
    "Automation & workflow tooling",
  ],
};

export const summary = {
  short:
    "I design and ship backend services for high-traffic operational needs: clear architecture, efficient SQL, and async patterns with queues and object storage. I care about maintainability, observability, and shipping features that teams actually use.",
  longParagraphs: [
    "I'm a backend-focused software engineer with hands-on experience building scalable B2B systems. My toolkit centers on Node.js, PostgreSQL, and pragmatic system design, with AWS services like SQS and S3 for asynchronous work and durable storage.",
 "I've delivered full-stack features with Angular on the frontend and enjoy collaborating in agile teams. Outside of work I build side projects, stay fit, and enjoy singing.",
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

export const quickCartItems = [
  { id: "resume", label: "Download resume", href: "/Satyam_Resume.pdf", download: "Satyam_Kumar_Resume.pdf", icon: "fa-file-pdf" },
  { id: "linkedin", label: "LinkedIn", href: social.linkedin, external: true, icon: "fa-brands fa-linkedin" },
  { id: "github", label: "GitHub", href: social.github, external: true, icon: "fa-brands fa-github" },
  { id: "email", label: "Email", href: `mailto:${social.email}`, external: true, icon: "fa-envelope" },
];

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
