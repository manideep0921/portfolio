/**
 * Skills are grouped by category and labelled by honest proficiency.
 *   hands-on  : used in real projects or the internship
 *   working   : understood and used in personal / learning projects, not production
 *   basic     : introductory level
 * Edit levels here; no percentage ratings on purpose.
 */

export type Level = "hands-on" | "working" | "basic";

export const levelMeta: Record<Level, { label: string; description: string }> = {
  "hands-on": {
    label: "Hands-on",
    description: "Used in real projects or in my internship work.",
  },
  working: {
    label: "Working Knowledge",
    description: "Understood and applied in practice projects, not production experience.",
  },
  basic: {
    label: "Basic",
    description: "Introductory level; certified or still learning.",
  },
};

export type IconKey =
  | "workflow"
  | "cloud"
  | "container"
  | "terminal"
  | "shield"
  | "code"
  | "wrench";

export interface SkillGroup {
  id: string;
  title: string;
  icon: IconKey;
  skills: ReadonlyArray<{ name: string; level: Level }>;
}

const h = (name: string) => ({ name, level: "hands-on" as const });
const w = (name: string) => ({ name, level: "working" as const });
const b = (name: string) => ({ name, level: "basic" as const });

export const skillGroups: ReadonlyArray<SkillGroup> = [
  {
    id: "cicd",
    title: "CI/CD & Automation",
    icon: "workflow",
    skills: [
      h("GitHub Actions"),
      h("Self-hosted runners"),
      h("GitHub Container Registry"),
      h("CI/CD pipelines"),
      h("Deployment automation"),
      h("Versioned releases"),
      h("Automated rollback"),
    ],
  },
  {
    id: "cloud",
    title: "Cloud & Infrastructure",
    icon: "cloud",
    skills: [
      w("AWS EC2"),
      w("AWS S3"),
      w("AWS IAM"),
      w("Terraform"),
      w("Infrastructure as Code"),
    ],
  },
  {
    id: "containers",
    title: "Containers & Orchestration",
    icon: "container",
    skills: [h("Docker"), h("Docker Compose"), w("Kubernetes (kind)")],
  },
  {
    id: "linux",
    title: "Linux & Networking",
    icon: "terminal",
    skills: [
      h("Ubuntu"),
      h("Bash"),
      h("systemd"),
      h("cron"),
      h("SSH"),
      h("rsync"),
      h("UFW"),
      h("logrotate"),
      h("Nginx"),
      h("Gunicorn"),
      h("PM2"),
      h("HTTP/HTTPS"),
      h("SSL/TLS"),
      h("Certbot"),
    ],
  },
  {
    id: "security",
    title: "Monitoring & Security",
    icon: "shield",
    skills: [
      h("Health checks"),
      h("Readiness checks"),
      h("Deployment logging"),
      h("Trivy"),
      h("Bandit"),
      h("pip-audit"),
      w("Prometheus"),
      w("Grafana"),
    ],
  },
  {
    id: "programming",
    title: "Programming",
    icon: "code",
    skills: [h("Python"), h("SQL"), h("JavaScript"), h("Node.js"), b("Go")],
  },
  {
    id: "tools",
    title: "Tools",
    icon: "wrench",
    skills: [h("Git"), h("GitHub"), h("Pytest"), h("Postman")],
  },
];
