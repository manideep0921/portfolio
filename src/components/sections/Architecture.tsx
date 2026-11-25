"use client";

import { useState } from "react";
import { architectureOrder, diagrams } from "@/data/diagrams";
import type { DiagramId } from "@/data/projects";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { DiagramView } from "@/components/diagrams/DiagramView";

export function Architecture() {
  const [active, setActive] = useState<DiagramId>(architectureOrder[0]);

  return (
    <section id="architecture" aria-labelledby="architecture-title" className="mx-auto max-w-6xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        id="architecture-title"
        eyebrow="05 / architecture"
        title="How I design delivery systems"
        description="Interactive diagrams of the systems behind my projects. Solid boxes are components I built or operated; dashed boxes are illustrative context."
      />

      <div role="tablist" aria-label="Architecture diagrams" className="mb-6 flex flex-wrap gap-2">
        {architectureOrder.map((id) => {
          const selected = id === active;
          return (
            <button
              key={id}
              role="tab"
              id={`tab-${id}`}
              aria-selected={selected}
              aria-controls={`tabpanel-${id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setActive(id)}
              onKeyDown={(e) => {
                const i = architectureOrder.indexOf(id);
                if (e.key === "ArrowRight" || e.key === "ArrowLeft") {
                  const next = architectureOrder[(i + (e.key === "ArrowRight" ? 1 : architectureOrder.length - 1)) % architectureOrder.length];
                  setActive(next);
                  document.getElementById(`tab-${next}`)?.focus();
                }
              }}
              className={`rounded-lg border px-3.5 py-2 text-sm transition-colors ${
                selected ? "border-accent bg-accent/10 text-fg" : "border-line text-muted hover:border-line-strong hover:text-fg"
              }`}
            >
              {diagrams[id].tab}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id={`tabpanel-${active}`} aria-labelledby={`tab-${active}`} className="card p-5 sm:p-6">
        <DiagramView key={active} id={active} />
      </div>
    </section>
  );
}
