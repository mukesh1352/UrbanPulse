import Link from "next/link";
import { Space_Grotesk, Inter, IBM_Plex_Mono } from "next/font/google";

const display = Space_Grotesk({ subsets: ["latin"], weight: ["500", "600", "700"] });
const body = Inter({ subsets: ["latin"], weight: ["400", "500"] });
const mono = IBM_Plex_Mono({ subsets: ["latin"], weight: ["400", "500"] });

export const metadata = {
  title: "GridPulse — Event Traffic Intelligence",
  description:
    "Forecast event-related traffic impact and recommend manpower, barricading, and diversion plans before congestion forms.",
};

const PROBLEMS = [
  {
    n: "01",
    title: "Impact isn't quantified",
    body: "A rally, match, or road closure hits the network with no advance estimate of how bad it'll get, or where.",
  },
  {
    n: "02",
    title: "Deployment runs on instinct",
    body: "Manpower, barricades, and diversions get placed from memory and gut feel, not from what actually happened last time.",
  },
  {
    n: "03",
    title: "Nothing gets learned",
    body: "Every event ends and takes its lessons with it. The next one starts from zero again.",
  },
];

const PIPELINE = [
  {
    n: "01",
    title: "Ingest",
    body: "Pull historical event records, venue capacity, and live signals — footfall, weather, road status — into one timeline.",
  },
  {
    n: "02",
    title: "Forecast",
    body: "Model expected congestion by location and hour, scored against how similar past events actually played out.",
  },
  {
    n: "03",
    title: "Recommend",
    body: "Generate a deployment plan: where to post personnel, which roads to barricade, which diversions to open.",
  },
  {
    n: "04",
    title: "Learn",
    body: "Log what happened against what was planned, so the next forecast for that venue starts smarter.",
  },
];

const DELIVERABLES = [
  {
    title: "Manpower plan",
    body: "Headcount by junction and shift, sized to the forecast rather than the loudest precedent.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <circle cx="9" cy="7" r="3" />
        <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
        <circle cx="17" cy="8" r="2.4" />
        <path d="M21 20c0-2.6-1.7-4.8-4-5.6" />
      </svg>
    ),
  },
  {
    title: "Barricade map",
    body: "Exact placement points around the venue perimeter and approach roads, ranked by forecast pressure.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M4 9h16M4 15h16" />
        <path d="M6 9V6.5a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1V9M6 15v2.5a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1V15" />
      </svg>
    ),
  },
  {
    title: "Diversion routes",
    body: "Pre-cleared alternate paths with capacity headroom, ready to publish before the first jam forms.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" className="h-5 w-5">
        <path d="M4 17h6.5a3.5 3.5 0 0 0 0-7H8" />
        <path d="M4 7l4-4M4 7l4 4" />
        <path d="M20 7h-6.5a3.5 3.5 0 0 0 0 7H16" />
        <path d="M20 17l-4 4M20 17l-4-4" />
      </svg>
    ),
  },
];

const STATS = [
  { label: "EVENT RECORDS", value: "1,284" },
  { label: "AVG FORECAST LEAD", value: "41 MIN" },
  { label: "JUNCTIONS COVERED", value: "96" },
  { label: "PLAN ACCURACY", value: "82%" },
];

export default function Home() {
  return (
    <main className={`${body.className} min-h-screen bg-[#0B0F14] text-[#EDEFF2]`}>
      {/* subtle control-room grid backdrop */}
      <div
        className="pointer-events-none fixed inset-0 opacity-[0.05]"
        style={{
          backgroundImage:
            "linear-gradient(#8B97A6 1px, transparent 1px), linear-gradient(90deg, #8B97A6 1px, transparent 1px)",
          backgroundSize: "40px 40px",
        }}
      />

      {/* nav */}
      <header className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
          <div className={`${mono.className} flex items-center gap-2 text-sm tracking-[0.15em] text-[#EDEFF2]`}>
            <span className="text-[#F2A93C]">▣</span>
            GRIDPULSE
          </div>
          <nav className="flex items-center gap-6">
            <a
              href="#how-it-works"
              className="hidden text-sm text-[#8B97A6] transition hover:text-[#EDEFF2] sm:inline focus-visible:outline-none focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FD1C5]"
            >
              How it works
            </a>
            <Link
              href="/dashboard"
              className="rounded-sm border border-[#F2A93C]/40 bg-[#F2A93C]/10 px-4 py-2 text-sm font-medium text-[#F2A93C] transition hover:bg-[#F2A93C]/20 focus-visible:outline focus-visible:outline-offset-2 focus-visible:outline-[#4FD1C5]"
            >
              Enter control room
            </Link>
          </nav>
        </div>
      </header>

      {/* hero */}
      <section className="relative mx-auto grid max-w-6xl gap-12 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <div className={`${mono.className} mb-5 inline-flex items-center gap-2 text-xs tracking-[0.2em] text-[#8B97A6]`}>
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#4FD1C5] opacity-60 motion-reduce:animate-none" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#4FD1C5]" />
            </span>
            EVENT-DRIVEN CONGESTION INTELLIGENCE
          </div>

          <h1 className={`${display.className} text-4xl font-semibold leading-[1.1] tracking-tight text-[#EDEFF2] sm:text-5xl`}>
            Know the jam before it forms.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-[#8B97A6]">
            Rallies, festivals, matches, and sudden gatherings break traffic in ways no one quantifies in
            advance. GridPulse turns historical and live event data into a forecast — and a deployment
            plan — before the first vehicle backs up.
          </p>

          <div className="mt-9 flex flex-wrap items-center gap-4">
            <Link
              href="/dashboard"
              className="rounded-sm bg-[#F2A93C] px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-[#f5bb63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FD1C5]"
            >
              Enter control room →
            </Link>
            <a
              href="#how-it-works"
              className="text-sm font-medium text-[#EDEFF2] underline decoration-[#8B97A6]/40 underline-offset-4 transition hover:decoration-[#EDEFF2] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#4FD1C5]"
            >
              View methodology
            </a>
          </div>
        </div>

        {/* signature: live congestion grid */}
        <div className="relative">
          <div className="rounded-md border border-white/10 bg-[#121821] p-4">
            <div className={`${mono.className} mb-3 flex items-center justify-between text-[10px] tracking-[0.15em] text-[#8B97A6]`}>
              <span>SECTOR 04 · APPROACH ROADS</span>
              <span className="text-[#E1503A]">● HIGH PRESSURE</span>
            </div>
            <svg viewBox="0 0 600 360" className="h-auto w-full">
              <style>{`
                .pulse-red, .pulse-amber {
                  transform-box: fill-box;
                  transform-origin: center;
                  animation: gridpulse-node 2.4s ease-in-out infinite;
                }
                .pulse-amber { animation-delay: .6s; }
                @keyframes gridpulse-node {
                  0%, 100% { opacity: .45; transform: scale(1); }
                  50% { opacity: 1; transform: scale(1.6); }
                }
                @media (prefers-reduced-motion: reduce) {
                  .pulse-red, .pulse-amber { animation: none; opacity: .85; }
                }
              `}</style>

              {/* roads */}
              {[80, 200, 320, 440, 560].map((x) => (
                <line key={x} x1={x} y1="20" x2={x} y2="340" stroke="#2A3340" strokeWidth="2" />
              ))}
              {[60, 140, 220, 300].map((y) => (
                <line key={y} x1="20" y1={y} x2="580" y2={y} stroke="#2A3340" strokeWidth="2" />
              ))}

              {/* cleared / static nodes */}
              {[
                [80, 60], [200, 300], [560, 60], [80, 300], [560, 300],
              ].map(([cx, cy], i) => (
                <circle key={i} cx={cx} cy={cy} r="4" fill="#4FD1C5" opacity="0.5" />
              ))}

              {/* building pressure nodes */}
              <circle cx="200" cy="140" r="5" fill="#F2A93C" className="pulse-amber" />
              <circle cx="440" cy="140" r="5" fill="#F2A93C" className="pulse-amber" />
              <circle cx="320" cy="60" r="5" fill="#F2A93C" className="pulse-amber" />
              <circle cx="200" cy="220" r="6" fill="#E1503A" className="pulse-red" />
              <circle cx="440" cy="220" r="6" fill="#E1503A" className="pulse-red" />

              {/* event marker */}
              <rect x="308" y="208" width="24" height="24" rx="4" fill="#0B0F14" stroke="#E1503A" strokeWidth="1.6" />
              <text x="320" y="224" textAnchor="middle" fontSize="11" fill="#E1503A" className={mono.className}>
                E
              </text>
              <text x="320" y="252" textAnchor="middle" fontSize="10" fill="#8B97A6" className={mono.className}>
                EVENT SITE
              </text>
            </svg>
          </div>
        </div>
      </section>

      {/* stat strip */}
      <section className="border-y border-white/10 bg-[#0E131A]">
        <div className="mx-auto grid max-w-6xl grid-cols-2 gap-px sm:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-6">
              <div className={`${mono.className} text-2xl text-[#EDEFF2]`}>{s.value}</div>
              <div className={`${mono.className} mt-1 text-[10px] tracking-[0.12em] text-[#8B97A6]`}>{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* problem */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className={`${display.className} text-2xl font-semibold text-[#EDEFF2] sm:text-3xl`}>
          Why this breaks down today
        </h2>
        <div className="mt-10 grid gap-8 sm:grid-cols-3">
          {PROBLEMS.map((p) => (
            <div key={p.n} className="border-t border-white/10 pt-5">
              <div className={`${mono.className} text-xs text-[#F2A93C]`}>{p.n}</div>
              <h3 className="mt-3 text-base font-semibold text-[#EDEFF2]">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8B97A6]">{p.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* pipeline */}
      <section id="how-it-works" className="border-t border-white/10 bg-[#0E131A]">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <h2 className={`${display.className} text-2xl font-semibold text-[#EDEFF2] sm:text-3xl`}>
            How GridPulse plans an event
          </h2>
          <div className="mt-10 grid gap-px overflow-hidden rounded-md border border-white/10 sm:grid-cols-4">
            {PIPELINE.map((step) => (
              <div key={step.n} className="bg-[#121821] p-6">
                <div className={`${mono.className} text-xs text-[#4FD1C5]`}>{step.n}</div>
                <h3 className="mt-3 text-base font-semibold text-[#EDEFF2]">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#8B97A6]">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* deliverables */}
      <section className="mx-auto max-w-6xl px-6 py-20">
        <h2 className={`${display.className} text-2xl font-semibold text-[#EDEFF2] sm:text-3xl`}>
          What the control room gets
        </h2>
        <div className="mt-10 grid gap-6 sm:grid-cols-3">
          {DELIVERABLES.map((d) => (
            <div key={d.title} className="rounded-md border border-white/10 bg-[#121821] p-6">
              <div className="inline-flex h-9 w-9 items-center justify-center rounded-sm bg-[#F2A93C]/10 text-[#F2A93C]">
                {d.icon}
              </div>
              <h3 className="mt-4 text-base font-semibold text-[#EDEFF2]">{d.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-[#8B97A6]">{d.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* cta */}
      <section className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col items-start justify-between gap-6 px-6 py-16 sm:flex-row sm:items-center">
          <div>
            <h2 className={`${display.className} text-2xl font-semibold text-[#EDEFF2]`}>
              See today&apos;s events before they jam the city.
            </h2>
            <p className="mt-2 text-sm text-[#8B97A6]">Live forecasts, deployment plans, and post-event reports.</p>
          </div>
          <Link
            href="/dashboard"
            className="shrink-0 rounded-sm bg-[#F2A93C] px-5 py-3 text-sm font-semibold text-[#0B0F14] transition hover:bg-[#f5bb63] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#4FD1C5]"
          >
            Enter control room →
          </Link>
        </div>
      </section>

      {/* footer */}
      <footer className="border-t border-white/10">
        <div className={`${mono.className} mx-auto max-w-6xl px-6 py-8 text-[10px] tracking-widest text-[#8B97A6]`}>
          GRIDPULSE · TRAINED ON HISTORICAL EVENT TRAFFIC RECORDS
        </div>
      </footer>
      <div className="mx-auto max-w-6xl px-6 py-8 text-sm text-[#8B97A6]">See today&apos;s events before they jam the city.</div>
    </main>
  );
}