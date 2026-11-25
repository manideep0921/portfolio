/**
 * Featured projects.
 *
 * `repo` is only set where the repository is confirmed to exist.
 * Leave it `null` until a real URL is available; the UI then shows a
 * "repository link not published yet" state instead of a fake link.
 */

export type ProjectTag =
  | "GitHub Actions"
  | "Nginx"
  | "PM2"
  | "Certbot"
  | "Node.js"
  | "React"
  | "Express"
  | "Django"
  | "PostgreSQL"
  | "Gunicorn"
  | "Python"
  | "Docker"
  | "Docker Compose"
  | "GHCR"
  | "Trivy"
  | "Cosign"
  | "Bash"
  | "Ubuntu"
  | "Linux"
  | "systemd"
  | "cron";

export type DiagramId = "cicd-workflow" | "release-rollback" | "docker-stack" | "django-deploy" | "ops-toolkit";

export interface Project {
  id: string;
  index: string;
  title: string;
  summary: string;
  category: "CI/CD" | "Containers" | "Linux Ops";
  tags: ReadonlyArray<ProjectTag>;
  features: ReadonlyArray<string>;
  diagram: DiagramId;
  repo: string | null;
  repoName: string | null;
}

export const projects: ReadonlyArray<Project> = [
  {
    id: "versioned-release-rollback",
    index: "01",
    title: "CI/CD with Versioned Releases and Automated Rollback",
    summary:
      "A GitHub Actions pipeline that builds a React/Express app, ships each release to its own directory over SSH and rsync, verifies it on a temporary PM2 instance, and only then switches traffic. A failed health check rolls back automatically.",
    category: "CI/CD",
    tags: ["GitHub Actions", "Nginx", "PM2", "Certbot", "Node.js", "React", "Express"],
    features: [
      "CI pipeline with linting, testing, and builds",
      "CD pipeline using SSH and rsync",
      "Versioned release directories",
      "Temporary PM2 application instances",
      "Health-check-based deployment switching",
      "Automatic rollback on deployment failure",
      "Release pruning",
      "Idempotent server provisioning",
    ],
    diagram: "release-rollback",
    repo: null,
    repoName: null,
  },
  {
    id: "django-migration-gate",
    index: "02",
    title: "Django CI/CD Pipeline with Migration Gate",
    summary:
      "A Django pipeline that treats database migrations as a gated step: static analysis, security audits, a coverage threshold, and migration drift checks must pass before a self-hosted runner deploys over SSH, smoke-tests, and rolls back on failure.",
    category: "CI/CD",
    tags: ["GitHub Actions", "Django", "PostgreSQL", "Gunicorn", "Nginx", "Python"],
    features: [
      "PostgreSQL service container",
      "Ruff, Bandit, and pip-audit",
      "Automated testing",
      "90% test coverage threshold",
      "Migration drift checks",
      "Fresh database and upgrade migration tests",
      "SSH deployment through self-hosted runner",
      "Smoke tests and rollback",
      "Deployment logs saved as artifacts",
    ],
    diagram: "django-deploy",
    repo: null,
    repoName: null,
  },
  {
    id: "docker-compose-cicd-stack",
    index: "03",
    title: "Dockerized Full-Stack Application with CI",
    summary:
      "A three-tier Django, React and PostgreSQL stack packaged with hardened Docker Compose settings and a GitHub Actions pipeline that lints, scans, publishes, signs, and attaches an SBOM to container images.",
    category: "Containers",
    tags: ["Docker", "Docker Compose", "Django", "PostgreSQL", "GitHub Actions", "GHCR", "Trivy", "Cosign"],
    features: [
      "Three-tier application architecture",
      "Multi-stage Docker builds",
      "Non-root backend containers",
      "Health-gated startup",
      "Read-only filesystems",
      "Dropped Linux capabilities",
      "Resource limits",
      "Automated linting and security checks",
      "Container image publishing",
      "SBOM and image signing",
    ],
    diagram: "docker-stack",
    repo: "https://github.com/manideep0921/docker-compose-cicd-stack",
    repoName: "docker-compose-cicd-stack",
  },
  {
    id: "server-ops-toolkit",
    index: "04",
    title: "Server Operations Toolkit",
    summary:
      "A set of Bash scripts for routine Linux server operations: health checks, checksum-verified backups, log cleanup, and an SSH hardening audit, designed to run from cron or systemd timers and covered by a shell test suite.",
    category: "Linux Ops",
    tags: ["Bash", "Ubuntu", "Linux", "systemd", "cron"],
    features: [
      "Server health checks",
      "Disk, memory, CPU load, and port monitoring",
      "HTTP health checks",
      "Checksum-verified backups",
      "Log cleanup",
      "SSH configuration hardening audit",
      "Cron/systemd-compatible execution",
      "Shell test suite",
    ],
    diagram: "ops-toolkit",
    repo: "https://github.com/manideep0921/server-ops-toolkit",
    repoName: "server-ops-toolkit",
  },
];
