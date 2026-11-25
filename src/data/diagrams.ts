/**
 * Architecture diagrams as data. A generic renderer (DiagramView) draws them.
 *
 * status:
 *  - "implemented"  : a component I built or operated in one of my projects / internship
 *  - "illustrative" : shown for context or as a related concept, not claimed as my implementation
 *
 * Grid coordinates: `col` and `row` may be fractional.
 */

import type { DiagramId } from "./projects";

export type NodeStatus = "implemented" | "illustrative";

export interface DiagramNode {
  id: string;
  label: string;
  sub?: string;
  col: number;
  row: number;
  status: NodeStatus;
  description: string;
  tone?: "default" | "fail" | "pass";
}

export interface DiagramEdge {
  from: string;
  to: string;
  label?: string;
  tone?: "default" | "fail";
  dashed?: boolean;
}

export interface Diagram {
  id: DiagramId;
  title: string;
  tab: string;
  blurb: string;
  nodes: ReadonlyArray<DiagramNode>;
  edges: ReadonlyArray<DiagramEdge>;
  lanes?: ReadonlyArray<{ row: number; label: string }>;
  note?: string;
}

export const diagrams: Record<DiagramId, Diagram> = {
  "cicd-workflow": {
    id: "cicd-workflow",
    tab: "CI/CD workflow",
    title: "CI/CD deployment workflow",
    blurb:
      "The general shape of the pipelines I build: a push triggers CI, a CD job ships over SSH, and Nginx serves the result.",
    nodes: [
      { id: "dev", label: "Developer", sub: "git push", col: 0, row: 0, status: "implemented", description: "Work lands on a branch and is merged to main. Pushes and pull requests trigger the workflows." },
      { id: "gh", label: "GitHub", sub: "repository", col: 1, row: 0, status: "implemented", description: "Source of truth. Workflow files live in .github/workflows next to the code." },
      { id: "ci", label: "CI job", sub: "lint · test · build", col: 2, row: 0, status: "implemented", description: "GitHub Actions runs linting, tests and the production build. A failure here stops the pipeline before anything is deployed." },
      { id: "cd", label: "CD job", sub: "SSH + rsync", col: 3, row: 0, status: "implemented", description: "A deployment job, run on GitHub-hosted or self-hosted runners, copies the build to the server over SSH using rsync." },
      { id: "srv", label: "Ubuntu server", sub: "releases/<version>", col: 3, row: 1, status: "implemented", description: "Each deployment lands in its own versioned directory on a Linux server I manage." },
      { id: "nginx", label: "Nginx", sub: "reverse proxy · TLS", col: 2, row: 1, status: "implemented", description: "Terminates HTTPS (certificates from Certbot with automated renewal) and proxies to the application process." },
      { id: "prod", label: "Production", sub: "served over HTTPS", col: 1, row: 1, status: "implemented", description: "The live application, kept behind health checks so a bad release does not take over." },
      { id: "obs", label: "Metrics & dashboards", sub: "Prometheus · Grafana", col: 0, row: 1, status: "illustrative", description: "Illustrative: where metrics would plug in. Prometheus and Grafana are working knowledge from practice projects, not part of this pipeline." },
    ],
    edges: [
      { from: "dev", to: "gh" },
      { from: "gh", to: "ci" },
      { from: "ci", to: "cd" },
      { from: "cd", to: "srv" },
      { from: "srv", to: "nginx" },
      { from: "nginx", to: "prod" },
      { from: "prod", to: "obs", dashed: true },
    ],
  },

  "release-rollback": {
    id: "release-rollback",
    tab: "Versioned release + rollback",
    title: "Versioned release deployment with automated rollback",
    blurb:
      "Each release gets its own directory. It is verified on a temporary process before the current symlink moves, and a failed check leaves the previous release serving traffic.",
    nodes: [
      { id: "cd", label: "CD job", sub: "GitHub Actions", col: 0, row: 0, status: "implemented", description: "Starts after CI passes and connects to the server over SSH." },
      { id: "rsync", label: "rsync release", sub: "releases/<sha>", col: 1, row: 0, status: "implemented", description: "Uploads the build into a new, immutable release directory. Nothing in the live release is touched." },
      { id: "tmp", label: "Temporary instance", sub: "PM2 on a spare port", col: 2, row: 0, status: "implemented", description: "Starts the new release as a temporary PM2 process so it can be checked before it receives real traffic." },
      { id: "hc", label: "Health check", sub: "HTTP readiness", col: 3, row: 0, status: "implemented", description: "Requests the temporary instance and expects a healthy response. This is the gate between a candidate release and a live one." },
      { id: "fail", label: "Rollback", sub: "keep previous release", col: 4, row: 0, status: "implemented", tone: "fail", description: "If the check fails, the temporary instance is removed, the current symlink is not changed, and the job fails with logs." },
      { id: "switch", label: "Switch symlink", sub: "current → <sha>", col: 3, row: 1, status: "implemented", tone: "pass", description: "On success, the current symlink moves to the new release. Switching a symlink is near-instant and easy to reverse." },
      { id: "reload", label: "Reload PM2 / Nginx", sub: "serve new release", col: 2, row: 1, status: "implemented", description: "The production process is reloaded onto the new release and Nginx keeps proxying to it." },
      { id: "prune", label: "Prune old releases", sub: "keep last N", col: 1, row: 1, status: "implemented", description: "Older release directories are removed so disk usage stays bounded, while recent ones remain available for rollback." },
      { id: "bg", label: "Blue-green variant", sub: "two live slots", col: 0, row: 1, status: "illustrative", description: "Illustrative: blue-green keeps two full environments and flips traffic between them. My implementation uses versioned directories with a symlink switch, which gives similar safety on a single server." },
    ],
    edges: [
      { from: "cd", to: "rsync" },
      { from: "rsync", to: "tmp" },
      { from: "tmp", to: "hc" },
      { from: "hc", to: "fail", tone: "fail", label: "fails" },
      { from: "hc", to: "switch", label: "passes" },
      { from: "switch", to: "reload" },
      { from: "reload", to: "prune" },
      { from: "prune", to: "bg", dashed: true },
    ],
    note: "Project 01 · idempotent provisioning means the same scripts can be re-run safely on the server.",
  },

  "docker-stack": {
    id: "docker-stack",
    tab: "Dockerized stack",
    title: "Dockerized three-tier application with a secured CI pipeline",
    blurb:
      "A frontend, API, and database run under Docker Compose with hardened container settings. A separate pipeline checks, publishes, and signs the images.",
    lanes: [
      { row: 0, label: "RUNTIME · DOCKER COMPOSE" },
      { row: 1, label: "CI · GITHUB ACTIONS" },
    ],
    nodes: [
      { id: "client", label: "Client", sub: "browser", col: 0, row: 0, status: "illustrative", description: "Illustrative: the user's browser." },
      { id: "web", label: "Frontend", sub: "React", col: 1, row: 0, status: "implemented", description: "Presentation tier of the three-tier application." },
      { id: "api", label: "Backend API", sub: "Django · non-root", col: 2, row: 0, status: "implemented", description: "Application tier built with a multi-stage Dockerfile and run as a non-root user, with a read-only filesystem, dropped Linux capabilities, and resource limits." },
      { id: "db", label: "PostgreSQL", sub: "health-gated start", col: 3, row: 0, status: "implemented", description: "Data tier. Services start in order using health checks, so the API only starts once the database reports healthy." },
      { id: "lint", label: "Lint & tests", sub: "automated checks", col: 0, row: 1, status: "implemented", description: "Linting and tests run on every change." },
      { id: "scan", label: "Trivy scan", sub: "image security", col: 1, row: 1, status: "implemented", description: "Container images are scanned for known vulnerabilities before they are published." },
      { id: "ghcr", label: "GHCR publish", sub: "container registry", col: 2, row: 1, status: "implemented", description: "Images are pushed to GitHub Container Registry." },
      { id: "sign", label: "SBOM + Cosign", sub: "provenance", col: 3, row: 1, status: "implemented", description: "A software bill of materials is generated and the published image is signed with Cosign." },
    ],
    edges: [
      { from: "client", to: "web" },
      { from: "web", to: "api" },
      { from: "api", to: "db" },
      { from: "lint", to: "scan" },
      { from: "scan", to: "ghcr" },
      { from: "ghcr", to: "sign" },
    ],
  },

  "django-deploy": {
    id: "django-deploy",
    tab: "Django + PostgreSQL",
    title: "Django deployment with PostgreSQL and a migration gate",
    blurb:
      "Quality and migration checks gate the deploy. A self-hosted runner deploys over SSH, smoke-tests the result, and rolls back on failure.",
    lanes: [
      { row: 0, label: "CI GATES" },
      { row: 1, label: "DEPLOY" },
      { row: 2, label: "RUNTIME ON SERVER" },
    ],
    nodes: [
      { id: "gha", label: "GitHub Actions", sub: "push / PR", col: 0, row: 0, status: "implemented", description: "Workflow trigger for every push and pull request." },
      { id: "qa", label: "Static & security", sub: "Ruff·Bandit·pip-audit", col: 1, row: 0, status: "implemented", description: "Linting, security static analysis, and dependency vulnerability auditing." },
      { id: "test", label: "Tests", sub: "≥ 90% coverage", col: 2, row: 0, status: "implemented", description: "Automated tests run against a PostgreSQL service container, with a 90% coverage threshold enforced." },
      { id: "mig", label: "Migration gate", sub: "drift·fresh·upgrade", col: 3, row: 0, status: "implemented", description: "Fails when model changes have no migration (drift), and verifies migrations on a fresh database and when upgrading an existing one." },
      { id: "runner", label: "Self-hosted runner", sub: "deploys over SSH", col: 4, row: 0, status: "implemented", description: "Deployment jobs run on a self-hosted runner that deploys to the server over SSH." },
      { id: "ssh", label: "SSH deploy", sub: "logs → artifacts", col: 4, row: 1, status: "implemented", description: "Ships the new release to the server. Deployment logs are saved as workflow artifacts for later inspection." },
      { id: "smoke", label: "Smoke tests", sub: "post-deploy", col: 3, row: 1, status: "implemented", description: "Basic requests against the deployed app confirm it is serving correctly." },
      { id: "rb", label: "Rollback", sub: "on failure", col: 2, row: 1, status: "implemented", tone: "fail", description: "If smoke tests fail the previous release is restored." },
      { id: "nginx", label: "Nginx", sub: "reverse proxy", col: 1, row: 2, status: "implemented", description: "Public entry point and reverse proxy." },
      { id: "gun", label: "Gunicorn", sub: "WSGI server", col: 2, row: 2, status: "implemented", description: "Runs the Django application as a managed process." },
      { id: "dj", label: "Django", sub: "application", col: 3, row: 2, status: "implemented", description: "The Django application." },
      { id: "pg", label: "PostgreSQL", sub: "database", col: 4, row: 2, status: "implemented", description: "Relational database. CI uses a PostgreSQL service container for tests." },
    ],
    edges: [
      { from: "gha", to: "qa" },
      { from: "qa", to: "test" },
      { from: "test", to: "mig" },
      { from: "mig", to: "runner" },
      { from: "runner", to: "ssh" },
      { from: "ssh", to: "smoke" },
      { from: "smoke", to: "rb", tone: "fail", label: "fails" },
      { from: "nginx", to: "gun" },
      { from: "gun", to: "dj" },
      { from: "dj", to: "pg" },
    ],
  },

  "ops-toolkit": {
    id: "ops-toolkit",
    tab: "Ops toolkit",
    title: "Server operations toolkit",
    blurb:
      "Independent Bash scripts that a scheduler can run on any Ubuntu host, each with clear exit codes and a shell test suite.",
    nodes: [
      { id: "sched", label: "cron / systemd", sub: "scheduler", col: 0, row: 1.5, status: "implemented", description: "The scripts are written to be run from cron or systemd timers." },
      { id: "cli", label: "Toolkit scripts", sub: "Bash", col: 1, row: 1.5, status: "implemented", description: "A set of focused Bash scripts rather than a single monolith." },
      { id: "health", label: "Health checks", sub: "system · ports · HTTP", col: 2, row: 0, status: "implemented", description: "Checks disk, memory, CPU load, listening ports and HTTP endpoints." },
      { id: "backup", label: "Backups", sub: "checksum verified", col: 2, row: 1, status: "implemented", description: "Creates backups and verifies them with checksums." },
      { id: "logs", label: "Log cleanup", sub: "retention", col: 2, row: 2, status: "implemented", description: "Removes old logs to keep disk usage under control." },
      { id: "ssh", label: "SSH audit", sub: "hardening config", col: 2, row: 3, status: "implemented", description: "Audits the SSH daemon configuration against common hardening practices." },
      { id: "out", label: "Report & exit codes", sub: "for schedulers", col: 3, row: 1.5, status: "implemented", description: "Results are reported with exit codes that cron, systemd, or a CI job can act on." },
      { id: "tests", label: "Shell test suite", sub: "verifies scripts", col: 1, row: 3, status: "implemented", description: "A test suite written in shell exercises the scripts." },
    ],
    edges: [
      { from: "sched", to: "cli" },
      { from: "cli", to: "health" },
      { from: "cli", to: "backup" },
      { from: "cli", to: "logs" },
      { from: "cli", to: "ssh" },
      { from: "health", to: "out" },
      { from: "backup", to: "out" },
      { from: "logs", to: "out" },
      { from: "ssh", to: "out" },
      { from: "tests", to: "cli", dashed: true, label: "tests" },
    ],
  },
};

export const architectureOrder: ReadonlyArray<DiagramId> = [
  "cicd-workflow",
  "release-rollback",
  "docker-stack",
  "django-deploy",
];
