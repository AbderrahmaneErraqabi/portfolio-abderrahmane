import Link from "next/link"
import type { Metadata } from "next"

const DEMO_URL = "https://drive.google.com/file/d/1BvmcJRrGGzl15Fru2iU-1DnLWqhQrGwJ/preview"
const GITHUB_URL = "https://github.com/AbderrahmaneErraqabi/RegulAi"
const LIVE_URL = "https://regul-ai.vercel.app"

export const metadata: Metadata = {
  title: "RegulAI – PolyFinances Datathon 2025",
  description:
    "PolyFinances Datathon 2025 build that ingests regulations, enriches them with Yahoo Finance data, and translates the impact into portfolio-ready insights.",
}

const highlights = [
  "LLM summary + tone analysis with AWS Bedrock, combined with entity extraction via AWS Comprehend.",
  "Market enrichment layer pulls tickers/sectors from Yahoo Finance and normalizes them for portfolio scoring.",
  "Custom risk engine ranks sector/holding exposure and renders call-to-action insights in the React dashboard.",
  "Demo dashboards plus AWS QuickSight snapshots used in PolyFinances Datathon judging session.",
]

const responsibilities = [
  "Architected the end-to-end serverless workflow (API Gateway → Lambda → Bedrock/Comprehend).",
  "Implemented the React/Vite front-end with animated insights, uploads, and QuickSight hand-off.",
  "Developed the portfolio risk calculation layer (sector scoring + exposure deltas + hedging guidance).",
  "Produced demo assets & recorded walkthrough once the Datathon AWS credits expired.",
]

export default function PersonalInvestingDashboardProject() {
  return (
    <main className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_top,_rgba(63,140,255,0.15),transparent_55%),_var(--section-alt)] text-foreground">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-16 h-96 w-96 rounded-full bg-[rgba(114,214,255,0.35)] blur-[140px] animate-pulse" />
        <div className="absolute -bottom-24 -left-10 h-[28rem] w-[28rem] rounded-full bg-[rgba(63,140,255,0.25)] blur-[160px]" />
        <div className="absolute inset-x-0 top-1/3 h-px bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      </div>
      <div className="relative mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-primary/30 bg-[var(--section-surface)]/95 p-10 shadow-[0_35px_80px_-55px_rgba(94,177,255,0.95)] backdrop-blur-2xl">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.35em] text-primary/70">PolyFinances Datathon 2025</p>
              <h1 className="mt-4 text-4xl font-semibold text-[var(--electric-blue)] lg:text-5xl">
                RegulAI – Portfolio Intelligence
              </h1>
              <p className="mt-3 text-lg text-muted-foreground">
                Turns dense regulations into actionable portfolio guidance by orchestrating AWS Bedrock, Comprehend, and live Yahoo
                Finance data inside a React/Vite experience.
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href="/#projects"
                className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/20"
              >
                ← Back to projects
              </Link>
              <a
                href={GITHUB_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-[var(--section-border)] bg-[var(--section-surface)] px-5 py-2 text-sm font-semibold text-foreground transition hover:border-primary/60 hover:text-primary"
              >
                View GitHub ↗
              </a>
              <a
                href={LIVE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-gradient-to-r from-primary/80 to-[#72d6ff] px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_18px_55px_-30px_rgba(94,177,255,0.9)] transition hover:-translate-y-0.5"
              >
                Live Site ↗
              </a>
            </div>
          </div>
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[1.5fr_1fr]">
          <article className="rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)]/95 p-8 backdrop-blur-xl">
            <h2 className="text-2xl font-semibold text-[var(--electric-blue)]">Architecture at a Glance</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Users upload or paste a regulation inside the React front-end. API Gateway proxied Lambdas clean the text, store a raw copy
              in S3, then invoke Bedrock (summaries, tone, impact) and Comprehend (entity extraction). The resulting entities drive Yahoo
              Finance lookups, which feed a portfolio engine that scores sector/asset exposure and recommendations. Insights render in the
              dashboard and are mirrored to AWS QuickSight for BI.
            </p>
          </article>
          <aside className="rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)]/95 p-8 backdrop-blur-xl">
            <h3 className="text-xl font-semibold text-[var(--electric-blue)]">Stack</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>React / Vite + Tailwind for the UI</li>
              <li>AWS API Gateway & Lambda</li>
              <li>AWS Bedrock (Claude) & AWS Comprehend</li>
              <li>Yahoo Finance API enrichment</li>
              <li>AWS QuickSight dashboards</li>
            </ul>
          </aside>
        </section>

        <section className="mb-12 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)]/95 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-[var(--electric-blue)]">Demo Walkthrough</h2>
          <p className="mt-2 text-muted-foreground">
            After PolyFinances Datathon 2025 we no longer have AWS Bedrock access, so this recording captures the full live workflow—
            uploading regulations, running AI analysis, and reviewing portfolio guidance.
          </p>
          <div className="mt-6 overflow-hidden rounded-[32px] border border-primary/30 bg-black shadow-[0_18px_55px_-30px_rgba(94,177,255,0.9)]">
            <div className="aspect-video">
              <iframe
                title="RegulAI demo video"
                src={DEMO_URL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap justify-center gap-3 text-sm text-muted-foreground">
            <span>Prefer an interactive run-through?</span>
            <a
              href={LIVE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1 font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/20"
            >
              Visit regul-ai.vercel.app ↗
            </a>
          </div>
        </section>

        <section className="mb-12 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)]/95 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-[var(--electric-blue)]">Key Highlights</h2>
          <ul className="mt-4 grid gap-4 text-muted-foreground md:grid-cols-2">
            {highlights.map((item) => (
              <li key={item} className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className="rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)]/95 p-8 backdrop-blur-xl">
          <h2 className="text-2xl font-semibold text-[var(--electric-blue)]">My Contributions</h2>
          <ul className="mt-4 space-y-4 text-muted-foreground">
            {responsibilities.map((item) => (
              <li key={item} className="rounded-2xl border border-primary/10 bg-primary/5 p-4">
                {item}
              </li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  )
}
