"use client";

import { useMemo, useState } from "react";
import { ChevronDown, ExternalLink, Link2Off } from "lucide-react";
import { projects, type Project, type ProjectTag } from "@/data/projects";
import { GithubIcon } from "@/components/ui/BrandIcons";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiagramView } from "@/components/diagrams/DiagramView";

const FILTERS: ReadonlyArray<ProjectTag> = [
  "GitHub Actions",
  "Docker",
  "Django",
  "PostgreSQL",
  "Nginx",
  "Node.js",
  "Bash",
];

function ProjectCard({ project }: { project: Project }) {
  const [open, setOpen] = useState(false);
  const panelId = `panel-${project.id}`;

  return (
    <article className="card overflow-hidden" aria-labelledby={`title-${project.id}`}>
      <div className="p-6 sm:p-7">
        <div className="flex items-center justify-between font-mono text-xs text-subtle">
          <span>PROJECT {project.index}</span>
          <span className="rounded-full border border-line px-2.5 py-0.5 text-muted">{project.category}</span>
        </div>
        <h3 id={`title-${project.id}`} className="mt-4 text-xl font-semibold leading-snug text-fg">
          {project.title}
        </h3>
        <p className="mt-3 text-sm leading-relaxed text-muted">{project.summary}</p>

        <ul className="mt-5 flex flex-wrap gap-2" aria-label="Technologies">
          {project.tags.map((t) => (
            <li key={t} className="rounded-md border border-line bg-surface2 px-2 py-0.5 font-mono text-[11px] text-muted">
              {t}
            </li>
          ))}
        </ul>

        <div className="mt-6 flex flex-wrap items-center gap-3">
          <button
            type="button"
            aria-expanded={open}
            aria-controls={panelId}
            onClick={() => setOpen((v) => !v)}
            className="inline-flex items-center gap-2 rounded-lg border border-line-strong px-3.5 py-2 text-sm font-medium text-fg transition-colors hover:border-accent/60 hover:bg-surface2"
          >
            {open ? "Hide details" : "View details"}
            <ChevronDown size={15} aria-hidden className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
          </button>
          {project.repo ? (
            <a
              href={project.repo}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg"
            >
              <GithubIcon className="h-4 w-4" />
              {project.repoName}
              <ExternalLink size={12} aria-hidden />
              <span className="sr-only">(opens in new tab)</span>
            </a>
          ) : (
            <span className="inline-flex items-center gap-2 text-sm text-subtle" title="Set `repo` for this project in src/data/projects.ts">
              <Link2Off size={14} aria-hidden /> Repository link not published yet
            </span>
          )}
        </div>
      </div>

      <div
        id={panelId}
        className={`grid transition-[grid-template-rows] duration-300 ease-out motion-reduce:transition-none ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden" inert={!open}>
          <div className="border-t border-line p-6 sm:p-7">
            <h4 className="eyebrow">Key features</h4>
            <ul className="mt-4 grid gap-x-8 gap-y-2 text-sm text-muted sm:grid-cols-2">
              {project.features.map((f) => (
                <li key={f} className="flex gap-2.5">
                  <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" aria-hidden />
                  {f}
                </li>
              ))}
            </ul>
            <div className="mt-7">
              <h4 className="eyebrow mb-3">Architecture</h4>
              <DiagramView id={project.diagram} compact showHeader={false} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const [filter, setFilter] = useState<ProjectTag | "All">("All");
  const visible = useMemo(
    () => (filter === "All" ? projects : projects.filter((p) => p.tags.includes(filter))),
    [filter],
  );

  return (
    <section id="projects" aria-labelledby="projects-title" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        id="projects-title"
        eyebrow="03 / projects"
        title="Featured projects"
        description="Pipelines, deployment systems and server tooling. Each card expands to show features and an architecture diagram."
      />

      <div role="group" aria-label="Filter projects by technology" className="mb-8 flex flex-wrap gap-2">
        {(["All", ...FILTERS] as const).map((f) => (
          <button
            key={f}
            type="button"
            aria-pressed={filter === f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3.5 py-1.5 font-mono text-xs transition-colors ${
              filter === f
                ? "border-accent bg-accent/10 text-accent"
                : "border-line text-muted hover:border-line-strong hover:text-fg"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <p className="sr-only" aria-live="polite">
        Showing {visible.length} of {projects.length} projects
      </p>
      <div className="grid gap-6 lg:grid-cols-1">
        {visible.map((p) => (
          <Reveal key={p.id}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </section>
  );
}
