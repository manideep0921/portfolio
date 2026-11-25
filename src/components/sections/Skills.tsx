import { Cloud, Code2, Container, ShieldCheck, SquareTerminal, Workflow, Wrench } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { levelMeta, skillGroups, type IconKey, type Level } from "@/data/skills";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<IconKey, LucideIcon> = {
  workflow: Workflow,
  cloud: Cloud,
  container: Container,
  terminal: SquareTerminal,
  shield: ShieldCheck,
  code: Code2,
  wrench: Wrench,
};

const levelOrder: ReadonlyArray<Level> = ["hands-on", "working", "basic"];

const chipStyle: Record<Level, string> = {
  "hands-on": "border-accent/40 bg-accent/10 text-fg",
  working: "border-line-strong bg-transparent text-muted",
  basic: "border-dashed border-line-strong bg-transparent text-subtle",
};

export function Skills() {
  return (
    <section id="skills" aria-labelledby="skills-title" className="border-y border-line bg-elev">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading
          id="skills-title"
          eyebrow="04 / skills"
          title="Technical skills"
          description="Grouped by area and labelled by how I have actually used them, not with percentage ratings."
        />

        <dl className="mb-10 grid gap-3 sm:grid-cols-3">
          {levelOrder.map((l) => (
            <div key={l} className="rounded-xl border border-line bg-surface p-4">
              <dt className="flex items-center gap-2 text-sm font-medium text-fg">
                <span className={`h-2.5 w-2.5 rounded-full border ${l === "hands-on" ? "border-accent bg-accent" : l === "working" ? "border-line-strong bg-transparent" : "border-dashed border-line-strong"}`} aria-hidden />
                {levelMeta[l].label}
              </dt>
              <dd className="mt-1 text-xs leading-relaxed text-muted">{levelMeta[l].description}</dd>
            </div>
          ))}
        </dl>

        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          {skillGroups.map((g, i) => {
            const Icon = icons[g.icon];
            return (
              <Reveal key={g.id} delay={(i % 3) * 0.05} className="card p-5">
                <h3 className="flex items-center gap-2.5 text-base font-semibold text-fg">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg border border-line bg-surface2 text-accent">
                    <Icon size={16} aria-hidden />
                  </span>
                  {g.title}
                </h3>
                <div className="mt-4 space-y-4">
                  {levelOrder.map((l) => {
                    const items = g.skills.filter((s) => s.level === l);
                    if (items.length === 0) return null;
                    return (
                      <div key={l}>
                        <p className="mb-2 font-mono text-[10px] uppercase tracking-widest text-subtle">{levelMeta[l].label}</p>
                        <ul className="flex flex-wrap gap-1.5">
                          {items.map((s) => (
                            <li key={s.name} className={`rounded-md border px-2 py-1 text-xs ${chipStyle[l]}`}>
                              {s.name}
                              <span className="sr-only"> ({levelMeta[l].label})</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    );
                  })}
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
