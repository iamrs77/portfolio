"use client";

import { useEffect, useRef } from "react";

/**
 * Night mode only: a soft circle of warm light follows the mouse, like a torch.
 * The `.torch-light` rules in globals.css decide when it shows (dark theme, a mouse, no reduced motion).
 * It never blocks clicks, and colours outside the light stay exactly as they are.
 */
export function TorchLight() {
  const lightRef = useRef(null);

  useEffect(() => {
    const light = lightRef.current;
    let frame = 0;

    const onMove = (event) => {
      if (event.pointerType !== "mouse") return;
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        light.style.transform = `translate(${event.clientX}px, ${event.clientY}px)`;
        light.style.opacity = "1";
      });
    };

    // Switch the light off when the mouse leaves the window.
    const onLeave = (event) => {
      if (event.relatedTarget) return;
      cancelAnimationFrame(frame);
      light.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("mouseout", onLeave);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("mouseout", onLeave);
    };
  }, []);

  return <div ref={lightRef} aria-hidden="true" className="torch-light" />;
}
