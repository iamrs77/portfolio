"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";

/*
 * A small, interactive architecture diagram: requests flow from the client through
 * an API to services, a queue, workers and the database. Hovering, focusing or tapping
 * a node highlights its connections and shows the tools I use for that part.
 */

const NODES = [
  { id: "client", x: 56, y: 150, note: "React, Redux Toolkit and Tailwind CSS." },
  { id: "api", x: 176, y: 150, note: "Node.js and Express, with REST and GraphQL APIs." },
  { id: "services", x: 304, y: 90, note: "Node.js microservices." },
  { id: "queue", x: 304, y: 210, note: "BullMQ and Redis, for heavy jobs like Excel processing." },
  { id: "database", x: 424, y: 90, note: "MySQL, MSSQL, MongoDB and DynamoDB, with Redis for caching." },
  { id: "workers", x: 424, y: 210, note: "Workers that run queued jobs off the main thread." },
];

const EDGES = [
  { from: "client", to: "api", path: "M96 150 H136", duration: 2.2 },
  { from: "api", to: "services", path: "M216 150 H240 V90 H264", duration: 2.8 },
  { from: "api", to: "queue", path: "M216 150 H240 V210 H264", duration: 3.1 },
  { from: "services", to: "database", path: "M344 90 H384", duration: 2.4 },
  { from: "queue", to: "workers", path: "M344 210 H384", duration: 2.6 },
  { from: "workers", to: "database", path: "M424 192 V108", duration: 2.9 },
];

const NODE_WIDTH = 80;
const NODE_HEIGHT = 36;

export function HeroDiagram() {
  const [activeId, setActiveId] = useState(null);
  const activeNode = NODES.find((node) => node.id === activeId);

  const isConnected = (edge) => edge.from === activeId || edge.to === activeId;
  const isNeighbour = (id) =>
    id === activeId || EDGES.some((edge) => isConnected(edge) && (edge.from === id || edge.to === id));

  return (
    <figure className="relative overflow-hidden rounded-2xl border bg-surface/85 shadow-lift backdrop-blur-sm">
      <div className="border-b px-4 py-3 font-mono text-xs text-muted">my usual stack</div>

      <svg viewBox="0 40 480 220" className="block h-auto w-full" role="group" aria-label="Interactive diagram of a web application's architecture">
        <defs>
          <pattern id="hero-dots" width="16" height="16" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="1" className="fill-border-strong" opacity="0.6" />
          </pattern>
        </defs>
        <rect y="40" width="480" height="220" fill="url(#hero-dots)" />

        {EDGES.map((edge) => (
          <path
            key={edge.path}
            d={edge.path}
            fill="none"
            strokeWidth={1.5}
            strokeLinejoin="round"
            className={cn(
              "transition-[stroke,opacity] duration-300",
              isConnected(edge) ? "stroke-accent" : "stroke-border-strong",
              activeId && !isConnected(edge) && "opacity-40",
            )}
          />
        ))}

        {/* Data "packets" travelling along each edge. Hidden when reduced motion is requested. */}
        <g className="motion-decor" aria-hidden="true">
          {EDGES.map((edge, index) => (
            <circle key={edge.path} r="2.75" className="fill-accent" opacity="0">
              <animateMotion dur={`${edge.duration}s`} begin={`${index * 0.4}s`} repeatCount="indefinite" path={edge.path} />
              <animate
                attributeName="opacity"
                values="0;1;1;0"
                keyTimes="0;0.15;0.8;1"
                dur={`${edge.duration}s`}
                begin={`${index * 0.4}s`}
                repeatCount="indefinite"
              />
            </circle>
          ))}
        </g>

        {NODES.map((node) => {
          const isActive = node.id === activeId;
          return (
            <g
              key={node.id}
              role="button"
              tabIndex={0}
              aria-pressed={isActive}
              aria-label={`${node.id}: ${node.note}`}
              transform={`translate(${node.x - NODE_WIDTH / 2} ${node.y - NODE_HEIGHT / 2})`}
              onMouseEnter={() => setActiveId(node.id)}
              onFocus={() => setActiveId(node.id)}
              onClick={() => setActiveId(node.id)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  event.preventDefault();
                  setActiveId(node.id);
                }
              }}
              className={cn(
                "group cursor-pointer outline-none transition-opacity duration-300",
                activeId && !isNeighbour(node.id) && "opacity-45",
              )}
            >
              <rect
                width={NODE_WIDTH}
                height={NODE_HEIGHT}
                rx="9"
                className={cn(
                  "fill-surface transition-[stroke] duration-300 group-focus-visible:stroke-accent",
                  isActive ? "stroke-accent" : "stroke-border-strong group-hover:stroke-foreground/40",
                )}
                strokeWidth={isActive ? 1.75 : 1.25}
              />
              <text
                x={NODE_WIDTH / 2}
                y={NODE_HEIGHT / 2 + 4.5}
                textAnchor="middle"
                className={cn("font-mono text-[13px] transition-[fill]", isActive ? "fill-accent" : "fill-foreground")}
              >
                {node.id}
              </text>
            </g>
          );
        })}
      </svg>

      <figcaption aria-live="polite" className="flex min-h-[3.75rem] items-start gap-2 border-t px-4 py-3 font-mono text-xs leading-relaxed text-muted">
        <span aria-hidden="true" className="text-accent">→</span>
        {activeNode ? (
          <span>
            <span className="text-foreground">{activeNode.id}</span> · {activeNode.note}
          </span>
        ) : (
          <span>Hover or tap a box to see the tools I use there.</span>
        )}
      </figcaption>
    </figure>
  );
}
