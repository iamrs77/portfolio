"use client";

import { useEffect, useRef } from "react";

const CLICKABLE = "a, button, [role='button'], summary, label";
const TEXT_FIELD = "input, textarea, select, [contenteditable='true']";
// The torch is aimed as if held this far below the bottom of the window (as a share of its height).
// Higher = the beam points more straight up; lower = it tilts more towards the sides.
const PIVOT_BELOW = 0.5;

/**
 * Night mode only: the mouse pointer becomes a small torch. Its beam points up and outwards, as if the torch
 * were held from below the middle of the screen, so it tilts left or right as the mouse moves across the page.
 * The `.torch-*` rules in globals.css decide when it shows (dark theme, a mouse, no reduced motion)
 * and hide the normal pointer while it does. You click with the tip of the torch; it never blocks clicks.
 */
export function TorchLight() {
  const beamRef = useRef(null);
  const bodyRef = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const beam = beamRef.current;
    const body = bodyRef.current;
    let x = 0;
    let y = 0;
    let frame = 0;

    const render = () => {
      frame = 0;
      const pivotX = window.innerWidth / 2;
      const pivotY = window.innerHeight * (1 + PIVOT_BELOW);
      const angle = (Math.atan2(y - pivotY, x - pivotX) * 180) / Math.PI;
      const transform = `translate(${x}px, ${y}px) rotate(${angle}deg)`;
      beam.style.transform = transform;
      body.style.transform = transform;
    };

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      x = event.clientX;
      y = event.clientY;
      // Text fields keep the normal text cursor.
      root.dataset.torch = event.target.closest?.(TEXT_FIELD) ? "off" : "on";
      beam.classList.toggle("is-pointing", Boolean(event.target.closest?.(CLICKABLE)));
      if (!frame) frame = requestAnimationFrame(render);
    };

    // Switch the torch off when the mouse leaves the window.
    const onLeave = (event) => {
      if (!event.relatedTarget) root.dataset.torch = "off";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onLeave);
      delete root.dataset.torch;
    };
  }, []);

  return (
    <>
      <div ref={beamRef} aria-hidden="true" className="torch-beam" />
      {/* Drawn pointing right at 3/4 size, with the lens at (40, 10), or (30, 7.5) on screen: that point sits on the mouse position. */}
      <svg ref={bodyRef} aria-hidden="true" className="torch-body" width="33" height="15" viewBox="0 0 44 20">
        <g stroke="#0b0b0c" strokeWidth="1.2" strokeLinejoin="round">
          <rect x="2" y="5.5" width="22" height="9" rx="3" fill="#c9c7c0" />
          <path d="M24 5.5 L35 2 H40 V18 H35 L24 14.5 Z" fill="#e4e2dc" />
        </g>
        <rect x="18.5" y="6.1" width="2.5" height="7.8" className="fill-accent" />
        <rect x="38.4" y="2.8" width="2" height="14.4" rx="1" fill="#fff4dd" />
      </svg>
    </>
  );
}
