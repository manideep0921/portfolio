/**
 * Single source of truth for personal details.
 * Edit this file (not the components) to update the site.
 */

export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ?? "http://localhost:3000";

export const profile = {
  name: "Manideep Pabbisetty",
  title: "DevOps & Cloud Engineer",
  tagline:
    "Building reliable deployments, automated infrastructure, and scalable CI/CD workflows.",
  intro:
    "DevOps Intern with hands-on experience in CI/CD automation, Linux infrastructure, containerization, deployment reliability, and cloud technologies.",
  location: "Hyderabad, Telangana, India",
  email: "Manideep.work21@gmail.com",
  github: "https://github.com/manideep0921",
  linkedin: "https://www.linkedin.com/in/pabbisettymanideep",
  /** Public path of the resume PDF. See public/resume/README.md. */
  resumePath: "/resume/Manideep_Pabbisetty_Resume.pdf",
  resumeFile: "Manideep_Pabbisetty_Resume.pdf",
} as const;

export const navItems = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "certifications", label: "Certifications" },
  { id: "contact", label: "Contact" },
] as const;

export const about = {
  paragraphs: [
    "I'm a final-year B.Tech Computer Science (Data Science) student and a DevOps Intern at Lagran Software Solutions in Hyderabad. My work centres on the path code takes from a git push to a running production service: CI/CD pipelines, deployment automation, and the Linux servers that host them.",
    "Day to day that means GitHub Actions workflows and self-hosted runners, versioned release directories with symlink switching, health-checked deployments with automated rollback, Nginx and PM2 on Ubuntu, and TLS certificates managed with Certbot.",
    "Outside of work I build Docker-based stacks with security checks in the pipeline, and I'm broadening into cloud infrastructure on AWS, Terraform, and Kubernetes. Those areas are working knowledge rather than production experience, and I label them that way on this site.",
  ],
  objective:
    "To grow into a DevOps / Cloud / Platform Engineering role where I can design reliable delivery pipelines, automate infrastructure with Infrastructure as Code, and make deployments boring, repeatable, and safe.",
  focus: [
    "CI/CD automation",
    "Linux administration",
    "Deployment reliability",
    "Cloud infrastructure",
    "Platform engineering",
    "Infrastructure as Code",
  ],
} as const;

export const experience = {
  company: "Lagran Software Solutions",
  role: "DevOps Intern",
  period: "September 2026 – Present",
  location: "Hyderabad, India",
  responsibilities: [
    {
      title: "CI/CD pipelines",
      body: "Implemented GitHub Actions CI/CD pipelines to automate application builds and deployments.",
    },
    {
      title: "Self-hosted runners",
      body: "Configured self-hosted GitHub Actions runners on Ubuntu infrastructure.",
    },
    {
      title: "Release automation & rollback",
      body: "Developed deployment automation using versioned release directories, symlink switching, health checks, and rollback logic.",
    },
    {
      title: "Server & hosting management",
      body: "Managed Ubuntu server infrastructure and application hosting using Nginx, SSH, Git, and rsync.",
    },
    {
      title: "TLS certificates",
      body: "Configured SSL/TLS certificates using Certbot with automated renewal.",
    },
    {
      title: "Data migration workflows",
      body: "Worked with internal data migration workflows through CI pipelines.",
    },
    {
      title: "Process management",
      body: "Managed Node.js application processes using PM2.",
    },
    {
      title: "Django REST + PostgreSQL",
      body: "Built and tested Django REST Framework applications with Neon PostgreSQL.",
    },
  ],
  stack: [
    "GitHub Actions",
    "Ubuntu",
    "Nginx",
    "PM2",
    "Certbot",
    "rsync",
    "SSH",
    "Django REST Framework",
    "Neon PostgreSQL",
  ],
} as const;

export const education = {
  school: "Woxsen University",
  place: "Hyderabad",
  degree: "B.Tech Computer Science Engineering – Data Science",
  period: "2023–2027 (Expected)",
  gpa: "8.25/10",
} as const;

export type CredentialKind = "certification" | "research" | "award" | "leadership";

export const credentials: ReadonlyArray<{
  kind: CredentialKind;
  title: string;
  issuer: string;
  date: string;
  note?: string;
  status?: string;
}> = [
  {
    kind: "certification",
    title: "Go (Basic) Skill Certification",
    issuer: "HackerRank",
    date: "July 2026",
  },
  {
    kind: "research",
    title: "ESP32 self-balancing robot using PID control",
    issuer: "Research paper · ICM 2026",
    date: "2026",
    status: "Submitted, not yet published",
    note: "Submitted to ICM 2026. Not yet published or accepted.",
  },
  {
    kind: "award",
    title: "First Prize – Space & Climate Change",
    issuer: "World Space Week",
    date: "October 2024",
  },
  {
    kind: "leadership",
    title: "Class Representative",
    issuer: "Woxsen University",
    date: "Former",
  },
];
