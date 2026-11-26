/**
 * A small drawing for each project's card, in place of a screenshot: a fine-line glimpse of the product
 * (a stock panel, an order tracker, a lesson list, a system, a price chart) rather than a picture of it.
 * Drawn on a 240 by 150 board. The structure uses the site's own neutral colours, so it works in light and
 * dark mode, and only the parts that matter use the project's colour (--project, from its `accent`).
 * A project without a drawing of its own gets a code window.
 */
export function ProjectIllustration({ slug, className }) {
  const Drawing = DRAWINGS[slug] ?? CodeDrawing;
  return (
    <svg viewBox="0 0 240 150" className={className} aria-hidden="true" focusable="false">
      <Drawing slug={slug} />
    </svg>
  );
}

/** A floating panel: white, with a hairline border and a soft shadow. */
function Panel(props) {
  return <rect rx="10" strokeWidth="1" className="ill-shadow fill-surface stroke-border-strong" {...props} />;
}

/** A rounded bar standing in for a line of text. */
function Bar({ x, y, w, h = 6, className = "fill-muted/25" }) {
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} className={className} />;
}

/** Stockroom: a product's stock in three stores (one running low), and a transfer on its way. */
function StockroomDrawing() {
  const rows = [
    { y: 72, fill: 46, low: false },
    { y: 92, fill: 30, low: false },
    { y: 112, fill: 7, low: true },
  ];
  return (
    <>
      <Panel x="20" y="16" width="160" height="114" />
      <rect x="34" y="29" width="18" height="18" rx="5" className="fill-(--project)/15" />
      <path
        d="M38.5 41.2v-5.4l4.5-2.6 4.5 2.6v5.4l-4.5 2.6zM38.5 35.8l4.5 2.6 4.5-2.6M43 38.4v5.4"
        strokeWidth="1.3"
        strokeLinejoin="round"
        className="fill-none stroke-(--project)"
      />
      <Bar x={60} y={30} w={58} h={7} className="fill-foreground/70" />
      <Bar x={60} y={41} w={36} h={5} className="fill-muted/30" />
      <path d="M20.5 57h159" strokeWidth="1" className="stroke-border" />
      {rows.map(({ y, fill, low }) => (
        <g key={y}>
          <Bar x={34} y={y - 3} w={34} className="fill-muted/35" />
          <Bar x={80} y={y - 3} w={58} className="fill-muted/12" />
          <Bar x={80} y={y - 3} w={fill} className={low ? "fill-[#ef4444]" : "fill-(--project)"} />
        </g>
      ))}

      <Panel x="146" y="84" width="80" height="50" />
      <Bar x={158} y={96} w={40} h={5} className="fill-muted/35" />
      <circle cx="162" cy="118" r="4" strokeWidth="1.3" className="fill-(--project)/20 stroke-(--project)" />
      <path d="M169 118h22" strokeWidth="1.5" strokeDasharray="2 3" className="ill-flow fill-none stroke-(--project)" />
      <circle cx="198" cy="118" r="4" className="fill-(--project)" />
      <path d="M190 114.5l3.5 3.5-3.5 3.5" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-(--project)" />
    </>
  );
}

/** Foodiez: an order on its way, three steps done and the delivery in progress. */
function FoodiezDrawing() {
  const steps = [44, 88, 132, 176];
  return (
    <>
      <Panel x="20" y="14" width="200" height="122" />
      <rect x="34" y="27" width="18" height="18" rx="5" className="fill-(--project)/15" />
      <path d="M37.5 36h11a5.5 5.5 0 0 1-11 0zM40 33.5c-.8-1 .8-1.6 0-2.8M44 33.5c-.8-1 .8-1.6 0-2.8" strokeWidth="1.3" strokeLinecap="round" className="fill-none stroke-(--project)" />
      <Bar x={60} y={28} w={64} h={7} className="fill-foreground/70" />
      <Bar x={60} y={39} w={40} h={5} className="fill-muted/30" />
      <rect x="162" y="28" width="46" height="14" rx="7" className="fill-(--project)/12" />
      <circle cx="170.5" cy="35" r="2.5" className="fill-(--project)" />
      <Bar x={176} y={32.5} w={25} h={5} className="fill-(--project)/55" />
      <path d="M20.5 55h199" strokeWidth="1" className="stroke-border" />

      <path d="M49 76h34M93 76h34" strokeWidth="2" className="stroke-(--project)" />
      <path d="M137 76h34" strokeWidth="2" strokeDasharray="3 5" className="ill-flow fill-none stroke-(--project)" />
      <circle cx="132" cy="76" r="9" className="fill-(--project)/15" />
      {steps.map((x, i) =>
        i < 3 ? (
          <g key={x}>
            <circle cx={x} cy="76" r="5.5" className="fill-(--project)" />
            <path d={`M${x - 2.3} 76l1.6 1.6 3.2-3.4`} strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-white" />
          </g>
        ) : (
          <circle key={x} cx={x} cy="76" r="5.5" strokeWidth="1.3" className="fill-surface stroke-border-strong" />
        ),
      )}
      {steps.map((x) => (
        <Bar key={x} x={x - 11} y={89} w={22} h={4} className="fill-muted/30" />
      ))}

      <rect x="34" y="104" width="16" height="16" rx="4" className="fill-muted/15" />
      <Bar x={58} y={106} w={72} h={5} className="fill-foreground/45" />
      <Bar x={58} y={114} w={42} h={4} className="fill-muted/25" />
      <Bar x={184} y={109} w={22} h={6} className="fill-foreground/45" />
    </>
  );
}

/** Interview Ready: a track's lessons ticked off one by one, and how far you've got. */
function InterviewReadyDrawing() {
  const lessons = [
    { y: 46, w: 58, state: "done" },
    { y: 64, w: 46, state: "done" },
    { y: 82, w: 62, state: "done" },
    { y: 100, w: 52, state: "current" },
    { y: 118, w: 40, state: "next" },
  ];
  const circumference = 2 * Math.PI * 24;
  return (
    <>
      <Panel x="16" y="14" width="114" height="122" />
      <Bar x={28} y={25} w={50} h={6} className="fill-foreground/60" />
      <rect x="22" y="91" width="102" height="18" rx="6" className="fill-(--project)/10" />
      {lessons.map(({ y, w, state }) => (
        <g key={y}>
          {state === "done" && (
            <>
              <circle cx="35" cy={y} r="5" className="fill-(--project)" />
              <path d={`M32.8 ${y}l1.5 1.5 3-3.2`} strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-white" />
            </>
          )}
          {state === "current" && (
            <>
              <circle cx="35" cy={y} r="5" strokeWidth="1.4" className="fill-surface stroke-(--project)" />
              <circle cx="35" cy={y} r="2" className="fill-(--project)" />
            </>
          )}
          {state === "next" && <circle cx="35" cy={y} r="5" strokeWidth="1.2" className="fill-surface stroke-border-strong" />}
          <Bar x={46} y={y - 3} w={w} className={state === "current" ? "fill-foreground/70" : "fill-muted/30"} />
        </g>
      ))}

      <Panel x="138" y="14" width="86" height="122" />
      <circle cx="181" cy="54" r="24" strokeWidth="6" className="fill-none stroke-muted/15" />
      <circle
        cx="181"
        cy="54"
        r="24"
        strokeWidth="6"
        strokeLinecap="round"
        strokeDasharray={`${circumference * 0.68} ${circumference}`}
        transform="rotate(-90 181 54)"
        className="fill-none stroke-(--project)"
      />
      <text x="181" y="58" textAnchor="middle" fontSize="11" fontWeight="600" className="fill-foreground font-sans">
        68%
      </text>
      <rect x="148" y="94" width="66" height="32" rx="6" className="fill-(--project)/8" />
      <rect x="148" y="94" width="3" height="32" rx="1.5" className="fill-(--project)" />
      <Bar x={157} y={102} w={48} h={4} className="fill-muted/40" />
      <Bar x={157} y={111} w={34} h={4} className="fill-muted/30" />
    </>
  );
}

/** Systemscape: a small system, a request lit up on its way through it, and how long it takes. */
function SystemscapeDrawing() {
  const nodes = [
    { x: 98, y: 10, lit: true },
    { x: 98, y: 46, lit: true },
    { x: 40, y: 84, lit: false },
    { x: 156, y: 84, lit: true },
    { x: 98, y: 118, lit: true },
  ];
  return (
    <>
      <path
        d="M120 32v14M120 68v8H62v8M120 76h58v8M62 106v6h50v6M178 106v6h-50v6"
        strokeWidth="1.2"
        className="fill-none stroke-border-strong"
      />
      <path
        d="M120 32v14M120 68v8h58v8M178 106v6h-50v6"
        strokeWidth="1.8"
        strokeDasharray="3 5"
        className="ill-flow fill-none stroke-(--project)"
      />
      {nodes.map(({ x, y, lit }) => (
        <g key={`${x}-${y}`}>
          <rect
            x={x}
            y={y}
            width="44"
            height="22"
            rx="6"
            strokeWidth="1"
            className={`ill-shadow fill-surface ${lit ? "stroke-(--project)/60" : "stroke-border-strong"}`}
          />
          <rect x={x + 6} y={y + 5} width="12" height="12" rx="3" className={lit ? "fill-(--project)/20" : "fill-muted/15"} />
          <Bar x={x + 22} y={y + 9} w={16} h={4} className="fill-muted/35" />
        </g>
      ))}
      <rect x="152" y="15" width="56" height="14" rx="7" strokeWidth="1" className="fill-surface stroke-border" />
      <circle cx="161" cy="22" r="2.5" className="fill-[#22c55e]" />
      <text x="168" y="25" fontSize="8" className="fill-muted font-mono">
        42 ms
      </text>
    </>
  );
}

/** Stock Signal Advisor: a price chart with its moving average, the buy signal, and the verdict. */
function StockSignalDrawing({ slug }) {
  const price = "M28 118L48 112L66 116L84 104L102 108L120 94L138 98L156 82L174 86L192 70L210 64";
  return (
    <>
      <defs>
        <linearGradient id={`${slug}-area`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" style={{ stopColor: "var(--project)", stopOpacity: 0.28 }} />
          <stop offset="1" style={{ stopColor: "var(--project)", stopOpacity: 0 }} />
        </linearGradient>
      </defs>
      <Panel x="16" y="12" width="208" height="126" />
      <rect x="28" y="24" width="18" height="18" rx="5" className="fill-(--project)/15" />
      <path d="M32 37l4-4 3 2.5 4-5" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-(--project)" />
      <Bar x={54} y={25} w={40} h={7} className="fill-foreground/70" />
      <Bar x={54} y={36} w={26} h={5} className="fill-muted/30" />
      <rect x="172" y="25" width="40" height="16" rx="8" className="fill-(--project)" />
      <text x="192" y="36" textAnchor="middle" fontSize="8.5" fontWeight="700" letterSpacing="0.6" className="fill-white font-sans">
        BUY
      </text>
      <path d="M16.5 52h207" strokeWidth="1" className="stroke-border" />

      <path d="M28 106C70 104 110 96 150 88S196 74 210 72" strokeWidth="1.2" strokeDasharray="3 4" className="fill-none stroke-muted/50" />
      <path d={`${price}L210 128L28 128Z`} fill={`url(#${slug}-area)`} />
      <path d={price} strokeWidth="1.8" strokeLinejoin="round" strokeLinecap="round" className="fill-none stroke-(--project)" />
      <path d="M156 89l-3.5 6h7z" className="fill-(--project)" />
      <circle cx="210" cy="64" r="7" className="fill-(--project)/20" />
      <circle cx="210" cy="64" r="3" className="fill-(--project)" />
    </>
  );
}

/** Any other project: a code window. */
function CodeDrawing() {
  const lines = [
    { y: 52, x: 34, w: 54 },
    { y: 66, x: 46, w: 80 },
    { y: 80, x: 46, w: 62 },
    { y: 94, x: 58, w: 72 },
    { y: 108, x: 34, w: 30 },
  ];
  return (
    <>
      <Panel x="20" y="14" width="200" height="122" />
      <circle cx="34" cy="28" r="3" className="fill-muted/30" />
      <circle cx="44" cy="28" r="3" className="fill-muted/30" />
      <circle cx="54" cy="28" r="3" className="fill-muted/30" />
      <path d="M20.5 40h199" strokeWidth="1" className="stroke-border" />
      {lines.map(({ y, x, w }, i) => (
        <Bar key={y} x={x} y={y} w={w} h={6} className={i === 1 ? "fill-(--project)/60" : "fill-muted/30"} />
      ))}
    </>
  );
}

const DRAWINGS = {
  stockroom: StockroomDrawing,
  foodiez: FoodiezDrawing,
  "interview-ready": InterviewReadyDrawing,
  systemscape: SystemscapeDrawing,
  "stock-signal-advisor": StockSignalDrawing,
};
