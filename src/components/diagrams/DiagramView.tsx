"use client";

import { useId, useMemo, useState } from "react";
import { diagrams, type Diagram, type DiagramNode } from "@/data/diagrams";
import type { DiagramId } from "@/data/projects";

const NODE_W = 148;
const NODE_H = 54;
const COL = 176;
const ROW = 88;
const PAD_X = 16;
const PAD_TOP = 30;
const PAD_BOTTOM = 16;

interface Point {
  x: number;
  y: number;
}

function geometry(d: Diagram) {
  const maxCol = Math.max(...d.nodes.map((n) => n.col));
  const maxRow = Math.max(...d.nodes.map((n) => n.row));
  const width = PAD_X * 2 + maxCol * COL + NODE_W;
  const height = PAD_TOP + maxRow * ROW + NODE_H + PAD_BOTTOM;
  const pos = (n: DiagramNode) => ({
    x: PAD_X + n.col * COL,
    y: PAD_TOP + n.row * ROW,
  });
  return { width, height, pos };
}

function route(a: Point, b: Point): Point[] {
  const ac = { x: a.x + NODE_W / 2, y: a.y + NODE_H / 2 };
  const bc = { x: b.x + NODE_W / 2, y: b.y + NODE_H / 2 };
  const sameRow = Math.abs(ac.y - bc.y) < 1;
  const sameCol = Math.abs(ac.x - bc.x) < 1;

  if (sameRow) {
    const right = bc.x > ac.x;
    return [
      { x: right ? a.x + NODE_W : a.x, y: ac.y },
      { x: right ? b.x : b.x + NODE_W, y: bc.y },
    ];
  }
  if (sameCol) {
    const down = bc.y > ac.y;
    return [
      { x: ac.x, y: down ? a.y + NODE_H : a.y },
      { x: bc.x, y: down ? b.y : b.y + NODE_H },
    ];
  }
  const right = bc.x > ac.x;
  const startX = right ? a.x + NODE_W : a.x;
  const endX = right ? b.x : b.x + NODE_W;
  const midX = (startX + endX) / 2;
  return [
    { x: startX, y: ac.y },
    { x: midX, y: ac.y },
    { x: midX, y: bc.y },
    { x: endX, y: bc.y },
  ];
}

function labelPoint(pts: Point[]): Point & { vertical: boolean } {
  // Midpoint of the first segment that has length.
  const [p0, p1] = pts;
  const vertical = Math.abs(p0.x - p1.x) < 1;
  return { x: (p0.x + p1.x) / 2, y: (p0.y + p1.y) / 2, vertical };
}

export function DiagramView({
  id,
  compact = false,
  showHeader = true,
}: {
  id: DiagramId;
  compact?: boolean;
  showHeader?: boolean;
}) {
  const diagram = diagrams[id];
  const uid = useId().replace(/[^a-zA-Z0-9]/g, "");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { width, height, pos } = useMemo(() => geometry(diagram), [diagram]);
  const byId = useMemo(
    () => new Map(diagram.nodes.map((n) => [n.id, n])),
    [diagram],
  );
  const selected = selectedId ? byId.get(selectedId) : undefined;

  return (
    <div>
      {showHeader && (
        <div className="mb-3">
          <h4 className="text-base font-semibold text-fg">{diagram.title}</h4>
          <p className="mt-1 max-w-3xl text-sm text-muted">{diagram.blurb}</p>
        </div>
      )}

      <div
        className="overflow-x-auto rounded-xl border border-line bg-elev"
        tabIndex={0}
        role="group"
        aria-label={`${diagram.title} diagram. Scrollable. Select a node for details.`}
      >
        <svg
          viewBox={`0 0 ${width} ${height}`}
          style={{ minWidth: compact ? 640 : 720 }}
          className="block h-auto w-full"
          role="img"
          aria-label={`${diagram.title}: ${diagram.nodes.map((n) => n.label).join(", ")}`}
        >
          <defs>
            <marker id={`${uid}-a`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" fill="var(--fg-subtle)" />
            </marker>
            <marker id={`${uid}-f`} viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse">
              <path d="M0 1 L9 5 L0 9 z" fill="var(--warn)" />
            </marker>
          </defs>

          {diagram.lanes?.map((l) => (
            <text
              key={l.label}
              x={PAD_X}
              y={PAD_TOP + l.row * ROW - 9}
              className="font-mono"
              fontSize="9"
              letterSpacing="1.2"
              fill="var(--fg-subtle)"
            >
              {l.label}
            </text>
          ))}

          {diagram.edges.map((e) => {
            const a = byId.get(e.from);
            const b = byId.get(e.to);
            if (!a || !b) return null;
            const pts = route(pos(a), pos(b));
            const d = pts.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");
            const fail = e.tone === "fail";
            const lp = labelPoint(pts);
            const active = selectedId && (e.from === selectedId || e.to === selectedId);
            return (
              <g key={`${e.from}-${e.to}`}>
                <path
                  d={d}
                  fill="none"
                  stroke={fail ? "var(--warn)" : active ? "var(--accent)" : "var(--fg-subtle)"}
                  strokeWidth={active ? 1.6 : 1.2}
                  strokeLinejoin="round"
                  className={e.dashed ? "" : "flow-line"}
                  strokeDasharray={e.dashed ? "2 5" : undefined}
                  markerEnd={`url(#${uid}-${fail ? "f" : "a"})`}
                  opacity={selectedId && !active ? 0.45 : 1}
                />
                {e.label && (
                  <text
                    x={lp.vertical ? lp.x + 8 : lp.x}
                    y={lp.vertical ? lp.y + 3 : lp.y - 6}
                    textAnchor={lp.vertical ? "start" : "middle"}
                    fontSize="9"
                    className="font-mono"
                    fill={fail ? "var(--warn)" : "var(--fg-muted)"}
                  >
                    {e.label}
                  </text>
                )}
              </g>
            );
          })}

          {diagram.nodes.map((n) => {
            const { x, y } = pos(n);
            const isSel = n.id === selectedId;
            const illustrative = n.status === "illustrative";
            const stroke = isSel
              ? "var(--accent)"
              : n.tone === "fail"
                ? "var(--warn)"
                : "var(--border-strong)";
            return (
              <g
                key={n.id}
                role="button"
                tabIndex={0}
                aria-pressed={isSel}
                aria-label={`${n.label}${n.sub ? `, ${n.sub}` : ""}. ${illustrative ? "Illustrative." : "Implemented."}`}
                className="cursor-pointer outline-none focus-visible:[&>rect]:stroke-[var(--accent)]"
                onClick={() => setSelectedId(isSel ? null : n.id)}
                onKeyDown={(ev) => {
                  if (ev.key === "Enter" || ev.key === " ") {
                    ev.preventDefault();
                    setSelectedId(isSel ? null : n.id);
                  }
                }}
              >
                <rect
                  x={x}
                  y={y}
                  width={NODE_W}
                  height={NODE_H}
                  rx={10}
                  fill={isSel ? "color-mix(in srgb, var(--accent) 10%, var(--surface))" : illustrative ? "transparent" : "var(--surface)"}
                  stroke={stroke}
                  strokeWidth={isSel ? 1.6 : 1}
                  strokeDasharray={illustrative ? "4 4" : undefined}
                />
                <text x={x + 12} y={y + 22} fontSize="12.5" fontWeight="600" fill="var(--fg)">
                  {n.label}
                </text>
                {n.sub && (
                  <text x={x + 12} y={y + 40} fontSize="10" className="font-mono" fill="var(--fg-muted)">
                    {n.sub}
                  </text>
                )}
              </g>
            );
          })}
        </svg>
      </div>

      <div className="mt-3 flex flex-wrap items-start justify-between gap-x-6 gap-y-2">
        <div
          aria-live="polite"
          className="min-h-[3.25rem] max-w-2xl flex-1 text-sm text-muted"
        >
          {selected ? (
            <>
              <span className="font-medium text-fg">{selected.label}</span>
              <span
                className={`ml-2 rounded-full border px-2 py-0.5 font-mono text-[10px] uppercase tracking-wider ${
                  selected.status === "implemented"
                    ? "border-accent/40 text-accent"
                    : "border-line-strong text-subtle"
                }`}
              >
                {selected.status}
              </span>
              <p className="mt-1">{selected.description}</p>
            </>
          ) : (
            <p className="text-subtle">Select a component to see what it does.</p>
          )}
        </div>
        <ul className="flex items-center gap-4 font-mono text-[11px] text-subtle" aria-label="Legend">
          <li className="flex items-center gap-2">
            <span className="h-3 w-5 rounded-[4px] border border-line-strong bg-surface" aria-hidden />
            Implemented
          </li>
          <li className="flex items-center gap-2">
            <span className="h-3 w-5 rounded-[4px] border border-dashed border-line-strong" aria-hidden />
            Illustrative
          </li>
        </ul>
      </div>
      {diagram.note && <p className="mt-2 font-mono text-[11px] text-subtle">{diagram.note}</p>}
    </div>
  );
}
