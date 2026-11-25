"use client";

import { useState } from "react";
import { Check, Copy, Mail, MapPin } from "lucide-react";
import { profile } from "@/data/profile";
import { GithubIcon, LinkedinIcon } from "@/components/ui/BrandIcons";
import { SectionHeading } from "@/components/ui/SectionHeading";

export function Contact() {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      /* clipboard unavailable: the mailto link still works */
    }
  }

  const rowCls = "flex items-center gap-4 px-5 py-4 transition-colors hover:bg-surface2";

  return (
    <section id="contact" aria-labelledby="contact-title" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        id="contact-title"
        eyebrow="07 / contact"
        title="Let's talk"
        description="I'm interested in DevOps, cloud and platform engineering roles. Email is the quickest way to reach me."
      />

      <div className="card overflow-hidden">
        <div className="border-b border-line px-5 py-3 font-mono text-xs text-muted">
          <span className="text-accent">$</span> contact --list
        </div>
        <ul className="divide-y divide-line">
          <li className="flex items-center">
            <a href={`mailto:${profile.email}`} className={`${rowCls} flex-1`}>
              <Mail size={18} className="text-accent" aria-hidden />
              <span>
                <span className="block font-mono text-xs text-subtle">email</span>
                <span className="text-base text-fg">{profile.email}</span>
              </span>
            </a>
            <button
              type="button"
              onClick={copy}
              className="mr-4 inline-flex items-center gap-2 rounded-lg border border-line px-3 py-2 text-xs text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
              <span className="sr-only"> email address</span>
            </button>
          </li>
          <li>
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer" className={rowCls}>
              <LinkedinIcon className="h-[18px] w-[18px] text-accent" />
              <span>
                <span className="block font-mono text-xs text-subtle">linkedin</span>
                <span className="text-base text-fg">linkedin.com/in/pabbisettymanideep</span>
              </span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </li>
          <li>
            <a href={profile.github} target="_blank" rel="noopener noreferrer" className={rowCls}>
              <GithubIcon className="h-[18px] w-[18px] text-accent" />
              <span>
                <span className="block font-mono text-xs text-subtle">github</span>
                <span className="text-base text-fg">github.com/manideep0921</span>
              </span>
              <span className="sr-only">(opens in new tab)</span>
            </a>
          </li>
          <li className="flex items-center gap-4 px-5 py-4">
            <MapPin size={18} className="text-accent" aria-hidden />
            <span>
              <span className="block font-mono text-xs text-subtle">location</span>
              <span className="text-base text-fg">{profile.location}</span>
            </span>
          </li>
        </ul>
      </div>
    </section>
  );
}
