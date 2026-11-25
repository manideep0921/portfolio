"use client";

import { useEffect, useState } from "react";
import { Download, Menu, X } from "lucide-react";
import { navItems, profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { ThemeToggle } from "./ThemeToggle";

export function Navbar({ resumeAvailable }: { resumeAvailable: boolean }) {
  const [open, setOpen] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const els = navItems
      .map((n) => document.getElementById(n.id))
      .filter((el): el is HTMLElement => el !== null);
    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting);
        if (visible.length > 0) {
          visible.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActive(visible[0].target.id);
        }
      },
      { rootMargin: "-30% 0px -55% 0px", threshold: [0, 0.25, 0.5, 1] },
    );
    els.forEach((el) => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header
      className={`glass fixed inset-x-0 top-0 z-50 border-b transition-colors ${
        scrolled || open ? "border-line" : "border-transparent"
      }`}
    >
      <nav aria-label="Primary" className="mx-auto flex h-16 max-w-6xl items-center justify-between px-5 sm:px-8">
        <a href="#home" className="flex items-center gap-2 font-mono text-sm text-fg" aria-label="Manideep Pabbisetty, home">
          <span className="flex h-7 w-7 items-center justify-center rounded-md border border-line-strong bg-surface text-[11px] font-semibold text-accent">
            MP
          </span>
          <span className="hidden text-muted sm:inline">
            manideep<span className="text-subtle">@</span>devops
          </span>
        </a>

        <ul className="hidden items-center gap-1 lg:flex">
          {navItems.map((n) => (
            <li key={n.id}>
              <a
                href={`#${n.id}`}
                aria-current={active === n.id ? "location" : undefined}
                className={`rounded-md px-3 py-2 text-sm transition-colors ${
                  active === n.id ? "text-fg" : "text-muted hover:text-fg"
                }`}
              >
                {n.label}
                {active === n.id && <span className="mx-auto mt-0.5 block h-px w-4 bg-accent" aria-hidden />}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a href={profile.github} target="_blank" rel="noopener noreferrer" aria-label="GitHub profile (opens in new tab)" className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex">
            <GithubIcon className="h-4 w-4" />
          </a>
          <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" aria-label="LinkedIn profile (opens in new tab)" className="hidden h-9 w-9 items-center justify-center rounded-lg border border-line text-muted transition-colors hover:border-line-strong hover:text-fg sm:inline-flex">
            <LinkedinIcon className="h-4 w-4" />
          </a>
          <ThemeToggle />
          {resumeAvailable ? (
            <a href={profile.resumePath} download={profile.resumeFile} className="hidden items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-ink transition-colors hover:bg-accent-strong md:inline-flex">
              <Download size={14} aria-hidden /> Resume
            </a>
          ) : null}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-line text-muted hover:text-fg lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X size={18} aria-hidden /> : <Menu size={18} aria-hidden />}
          </button>
        </div>
      </nav>

      {open && (
        <div id="mobile-menu" className="border-t border-line lg:hidden">
          <ul className="mx-auto flex max-w-6xl flex-col px-5 py-3 sm:px-8">
            {navItems.map((n) => (
              <li key={n.id}>
                <a
                  href={`#${n.id}`}
                  onClick={() => setOpen(false)}
                  className={`block rounded-md px-2 py-3 text-base ${active === n.id ? "text-fg" : "text-muted"}`}
                >
                  {n.label}
                </a>
              </li>
            ))}
            <li className="mt-2 flex items-center gap-3 border-t border-line pt-4">
              <a href={profile.github} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
                <GithubIcon className="h-4 w-4" /> GitHub
              </a>
              <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-muted hover:text-fg">
                <LinkedinIcon className="h-4 w-4" /> LinkedIn
              </a>
              {resumeAvailable && (
                <a href={profile.resumePath} download={profile.resumeFile} className="ml-auto inline-flex items-center gap-2 rounded-lg bg-accent px-3.5 py-2 text-sm font-medium text-accent-ink">
                  <Download size={14} aria-hidden /> Resume
                </a>
              )}
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}
