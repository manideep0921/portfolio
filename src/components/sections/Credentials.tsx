import { Award, FlaskConical, GraduationCap, Trophy, Users } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { credentials, education, type CredentialKind } from "@/data/profile";
import { Reveal } from "@/components/ui/Reveal";
import { SectionHeading } from "@/components/ui/SectionHeading";

const icons: Record<CredentialKind, LucideIcon> = {
  certification: Award,
  research: FlaskConical,
  award: Trophy,
  leadership: Users,
};

export function Credentials() {
  return (
    <section id="certifications" aria-labelledby="certifications-title" className="border-y border-line bg-elev">
      <div className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
        <SectionHeading id="certifications-title" eyebrow="06 / credentials" title="Certifications & achievements" />

        <ul className="grid gap-5 sm:grid-cols-2">
          {credentials.map((c, i) => {
            const Icon = icons[c.kind];
            return (
              <Reveal key={c.title} as="li" delay={(i % 2) * 0.05} className="card flex gap-4 p-5">
                <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface2 text-accent">
                  <Icon size={18} aria-hidden />
                </span>
                <div>
                  <h3 className="text-base font-semibold text-fg">{c.title}</h3>
                  <p className="mt-1 text-sm text-muted">
                    {c.issuer} · {c.date}
                  </p>
                  {c.status && (
                    <p className="mt-2 inline-block rounded-full border border-warn/50 px-2.5 py-0.5 font-mono text-[11px] text-warn">
                      {c.status}
                    </p>
                  )}
                </div>
              </Reveal>
            );
          })}
        </ul>

        <Reveal className="mt-12">
          <h3 className="eyebrow">Education</h3>
          <div className="card mt-4 flex flex-wrap items-start gap-4 p-5">
            <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-line bg-surface2 text-accent">
              <GraduationCap size={18} aria-hidden />
            </span>
            <div className="flex-1">
              <p className="text-base font-semibold text-fg">{education.school}, {education.place}</p>
              <p className="mt-1 text-sm text-muted">{education.degree}</p>
            </div>
            <div className="text-right font-mono text-sm text-muted">
              <p>{education.period}</p>
              <p className="mt-1">GPA {education.gpa}</p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
