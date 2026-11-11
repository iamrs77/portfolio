"use client";

import { useEffect, useState } from "react";
import { formatYearMonth, hasExpired } from "@/lib/utils";

/**
 * "Issued Dec 2023 · Expires Dec 2026". The page is built ahead of time, so the visitor's browser
 * checks the expiry date again. That way the label changes to "Expired" on time, even without a redeploy.
 */
export function CertificationDates({ issued, expires, expiredAtBuild }) {
  const [expired, setExpired] = useState(expiredAtBuild);

  useEffect(() => {
    // Today's date is only known in the browser, after the page has loaded.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    if (expires) setExpired(hasExpired(expires));
  }, [expires]);

  const dates = [`Issued ${formatYearMonth(issued)}`, expires && `${expired ? "Expired" : "Expires"} ${formatYearMonth(expires)}`];
  return <p className="mt-0.5 font-mono text-xs text-muted">{dates.filter(Boolean).join(" · ")}</p>;
}
