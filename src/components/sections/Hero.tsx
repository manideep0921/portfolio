import { ArrowRight, Download, Mail } from "lucide-react";
import { profile } from "@/data/profile";
import { ButtonLink, DisabledButton } from "@/components/ui/Button";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { PipelineViz } from "@/components/diagrams/PipelineViz";

export function Hero({ resumeAvailable }: { resumeAvailable: boolean }) {
  return (
    <section id="home" aria-labelledby="hero-title" className="relative overflow-hidden pt-28 pb-20 sm:pt-36 sm:pb-28">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden />
      <div
        className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[820px] -translate-x-1/2 rounded-full opacity-[0.12] blur-3xl"
        style={{ background: "radial-gradient(closest-side, var(--accent), transparent)" }}
        aria-hidden
      />
      <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-5 sm:px-8 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="font-mono text-sm text-muted">
            <span className="text-accent">~/manideep</span> <span className="text-subtle">$</span> cat role.txt
            <span className="caret ml-1 inline-block h-4 w-2 translate-y-0.5 bg-accent" aria-hidden />
          </p>
          <h1 id="hero-title" className="mt-5">
            <span className="block text-4xl font-semibold tracking-tight text-fg sm:text-6xl">
              MANIDEEP
              <br className="hidden sm:block" /> PABBISETTY
            </span>
            <span className="mt-4 block text-xl font-medium text-accent sm:text-2xl">{profile.title}</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg/90">“{profile.tagline}”</p>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">{profile.intro}</p>

          <div className="mt-8 flex flex-wrap gap-3">
            <ButtonLink href="#projects">
              Explore My Work <ArrowRight size={16} aria-hidden />
            </ButtonLink>
            {resumeAvailable ? (
              <ButtonLink variant="secondary" href={profile.resumePath} download={profile.resumeFile}>
                <Download size={16} aria-hidden /> Download Resume
              </ButtonLink>
            ) : (
              <DisabledButton title="Resume PDF not added yet. See public/resume/README.md">
                <Download size={16} aria-hidden /> Resume (PDF pending)
              </DisabledButton>
            )}
            <ButtonLink variant="secondary" href="#contact">
              <Mail size={16} aria-hidden /> Contact Me
            </ButtonLink>
          </div>

          <div className="mt-6 flex items-center gap-5 text-sm">
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
              <GithubIcon className="h-4 w-4" /> GitHub<span className="sr-only"> (opens in new tab)</span>
            </a>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
              <LinkedinIcon className="h-4 w-4" /> LinkedIn<span className="sr-only"> (opens in new tab)</span>
            </a>
          </div>
        </div>

        <PipelineViz />
      </div>
    </section>
  );
}
