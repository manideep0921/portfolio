import { experience } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Experience() {
  return (
    <section id="experience" aria-labelledby="experience-title" className="border-y border-line bg-elev">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading id="experience-title" eyebrow="02 / experience" title="Professional experience" />

        <div className="relative pl-8 sm:pl-10">
          <span className="absolute bottom-0 left-[7px] top-2 w-px bg-line-strong sm:left-[9px]" aria-hidden />
          <span className="absolute left-0 top-2 h-[15px] w-[15px] rounded-full border-2 border-accent bg-bg sm:h-[19px] sm:w-[19px]" aria-hidden />

          <Reveal>
            <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
              <div>
                <h3 className="text-xl font-semibold text-fg">{experience.role}</h3>
                <p className="mt-1 text-base text-accent">{experience.company}</p>
              </div>
              <p className="font-mono text-sm text-muted">
                {experience.period} · {experience.location}
              </p>
            </div>
          </Reveal>

          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {experience.responsibilities.map((r, i) => (
              <Reveal key={r.title} as="li" delay={(i % 2) * 0.06} className="card p-5">
                <p className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</p>
                <h4 className="mt-2 text-base font-semibold text-fg">{r.title}</h4>
                <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
              </Reveal>
            ))}
          </ol>

          <ul className="mt-8 flex flex-wrap gap-2" aria-label="Technologies used during the internship">
            {experience.stack.map((t) => (
              <li key={t} className="rounded-md border border-line bg-surface px-2.5 py-1 font-mono text-xs text-muted">
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
