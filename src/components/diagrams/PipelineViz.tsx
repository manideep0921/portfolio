"use client";

import { useEffect, useState } from "react";
import { Box, GitBranch, Globe, Play, Rocket, Server, User } from "lucide-react";
import type { LucideIcon } from "lucide-react";

const steps: ReadonlyArray<{ icon: LucideIcon; label: string; cmd: string; out: string }> = [
  { icon: User, label: "Developer", cmd: "git push origin main", out: "branch updated" },
  { icon: GitBranch, label: "GitHub", cmd: "workflow triggered", out: "push event received" },
  { icon: Play, label: "GitHub Actions", cmd: "lint · test · build", out: "checks passed" },
  { icon: Box, label: "Docker", cmd: "docker build", out: "image built" },
  { icon: Server, label: "Server", cmd: "ssh + rsync → releases/", out: "release uploaded" },
  { icon: Globe, label: "Nginx", cmd: "health check → switch", out: "traffic switched" },
  { icon: Rocket, label: "Production", cmd: "serving over HTTPS", out: "release live" },
];

export function PipelineViz() {
  const [step, setStep] = useState(steps.length - 1);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    // Start the run from the beginning once on the client.
    const start = window.setTimeout(() => {
      setAnimate(true);
      setStep(0);
    }, 400);
    return () => window.clearTimeout(start);
  }, []);

  useEffect(() => {
    if (!animate) return;
    const id = window.setInterval(() => {
      setStep((s) => (s + 1) % (steps.length + 3));
    }, 1100);
    return () => window.clearInterval(id);
  }, [animate]);

  const current = Math.min(step, steps.length - 1);
  const done = step >= steps.length - 1;

  return (
    <div className="card overflow-hidden" aria-label="Illustrative deployment pipeline">
      <div className="flex items-center justify-between border-b border-line px-4 py-3">
        <div className="flex items-center gap-2 font-mono text-xs text-muted">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
            <span className="h-2.5 w-2.5 rounded-full bg-line-strong" />
          </span>
          <span className="ml-2">deploy.pipeline</span>
        </div>
        <span className="flex items-center gap-2 font-mono text-[11px] text-subtle">
          <span className={`h-1.5 w-1.5 rounded-full bg-accent ${done ? "" : "pulse-dot"}`} aria-hidden />
          {done ? "live" : "running"}
        </span>
      </div>

      <ol className="relative px-4 py-5">
        {steps.map((s, i) => {
          const Icon = s.icon;
          const complete = i < current || (i === current && done);
          const running = i === current && !done;
          return (
            <li key={s.label} className="relative flex gap-4 pb-5 last:pb-0">
              {i < steps.length - 1 && (
                <span
                  aria-hidden
                  className={`absolute left-[17px] top-9 h-[calc(100%-2.25rem)] w-px transition-colors duration-500 ${
                    i < current ? "bg-accent/70" : "bg-line"
                  }`}
                />
              )}
              <span
                className={`relative z-10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg border transition-colors duration-300 ${
                  complete
                    ? "border-accent/60 bg-accent/10 text-accent"
                    : running
                      ? "border-accent bg-accent/15 text-accent"
                      : "border-line bg-surface text-subtle"
                }`}
              >
                <Icon size={16} aria-hidden />
              </span>
              <div className="min-w-0 flex-1 pt-0.5">
                <div className="flex items-baseline justify-between gap-3">
                  <span className={`text-sm font-medium ${complete || running ? "text-fg" : "text-muted"}`}>
                    {s.label}
                  </span>
                  <span className="font-mono text-[11px] text-subtle">
                    {complete ? `✓ ${s.out}` : running ? "…" : ""}
                  </span>
                </div>
                <code className="mt-0.5 block truncate font-mono text-xs text-subtle">$ {s.cmd}</code>
              </div>
            </li>
          );
        })}
      </ol>
      <p className="border-t border-line px-4 py-2.5 font-mono text-[11px] text-subtle">
        Illustrative reference pipeline, not live telemetry.
      </p>
    </div>
  );
}
