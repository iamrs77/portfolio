"use client";

import { useEffect, useState } from "react";

/**
 * Static hosts serve one 404.html for every unknown URL, so the server can't know which
 * page was requested. This reads the URL in the browser to tailor the message for projects.
 */
export function NotFoundHeading() {
  const [isProject, setIsProject] = useState(false);

  useEffect(() => {
    // Reading the URL is only possible after hydration on a static 404 page.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsProject(/\/projects\/[^/]+/.test(window.location.pathname));
  }, []);

  return (
    <h1 className="mt-5 max-w-3xl text-[clamp(2.5rem,6vw,4.25rem)] leading-[1.03] font-medium tracking-[-0.045em]">
      {isProject ? "That project doesn't exist." : "This page doesn't exist."}
    </h1>
  );
}
