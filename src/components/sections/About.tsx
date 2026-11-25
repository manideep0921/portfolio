import { about, education, experience, profile } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function About() {
  const rows: ReadonlyArray<[string, string]> = [
    ["name", profile.name],
    ["role", `${experience.role} @ ${experience.company}`],
    ["location", profile.location],
    ["education", `B.Tech CSE (Data Science), ${education.school}`],
    ["focus", "CI/CD · Linux · Containers · Cloud"],
  ];
  return (
    <section id="about" aria-labelledby="about-title" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading id="about-title" eyebrow="01 / about" title="Engineering the path from commit to production" />
      <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
        <Reveal>
          <div className="space-y-5 text-base leading-relaxed text-muted">
            {about.paragraphs.map((p) => (
              <p key={p.slice(0, 24)}>{p}</p>
            ))}
          </div>
          <div className="mt-8 rounded-xl border border-line bg-surface p-5">
            <p className="eyebrow">Career objective</p>
            <p className="mt-2 text-base leading-relaxed text-fg/90">{about.objective}</p>
          </div>
        </Reveal>

        <Reveal delay={0.1}>
          <div className="card overflow-hidden">
            <div className="border-b border-line px-4 py-3 font-mono text-xs text-muted">profile.yaml</div>
            <dl className="divide-y divide-line font-mono text-[13px]">
              {rows.map(([k, v]) => (
                <div key={k} className="grid grid-cols-[88px_1fr] gap-3 px-4 py-3">
                  <dt className="text-accent">{k}:</dt>
                  <dd className="text-fg/90">{v}</dd>
                </div>
              ))}
            </dl>
          </div>
          <ul className="mt-5 flex flex-wrap gap-2" aria-label="Areas of focus">
            {about.focus.map((f) => (
              <li key={f} className="rounded-full border border-line px-3 py-1 text-xs text-muted">
                {f}
              </li>
            ))}
          </ul>
        </Reveal>
      </div>
    </section>
  );
}
