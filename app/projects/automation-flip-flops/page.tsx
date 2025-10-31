import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Automation System with Flip-Flops",
  description:
    "Detailed breakdown of the automation system project leveraging flip-flops and 7-segment displays for sequential logic control.",
}

export default function AutomationFlipFlopProject() {
  return (
    <main className="min-h-screen bg-[var(--section-alt)] text-foreground">
      <div className="mx-auto max-w-5xl px-6 py-16 lg:px-8">
        <div className="mb-12 flex flex-col gap-6 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-10 shadow-[0_25px_65px_-45px_rgba(94,177,255,0.85)] backdrop-blur-xl">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div>
              <p className="text-sm uppercase tracking-[0.35em] text-primary/70">Digital Logic Project</p>
              <h1 className="mt-4 text-4xl font-semibold text-[var(--electric-blue)] lg:text-5xl">
                Automation System with Flip-Flops
              </h1>
              <p className="mt-2 text-lg text-muted-foreground">
                Sequential control platform orchestrating industrial automation states through robust flip-flop logic and
                real-time visualization.
              </p>
            </div>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-5 py-2 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/20"
            >
              ← Back to projects
            </Link>
          </div>
        </div>

        <section className="mb-12 grid gap-8 lg:grid-cols-[2fr_1fr]">
          <article className="rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-8">
            <h2 className="text-2xl font-semibold text-[var(--electric-blue)]">Project Overview</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The automation system coordinates a multi-stage assembly process using JK and D flip-flops to model state
              transitions. Coupled with 7-segment displays, the controller communicates machine status, validates inputs,
              and prevents unsafe states. The architecture emphasizes deterministic state flow, maintainability, and simple
              diagnostics for operators.
            </p>
          </article>
          <aside className="rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-8">
            <h3 className="text-xl font-semibold text-[var(--electric-blue)]">Tools & Technologies</h3>
            <ul className="mt-4 space-y-2 text-muted-foreground">
              <li>VHDL for sequential logic modeling</li>
              <li>Logisim & Quartus Prime for simulation</li>
              <li>Altera Cyclone FPGA development board</li>
              <li>Custom PCB interface for sensor inputs</li>
              <li>Seven-segment display driver modules</li>
            </ul>
          </aside>
        </section>

        <section className="mb-12 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-8">
          <h2 className="text-2xl font-semibold text-[var(--electric-blue)]">Key Features</h2>
          <ul className="mt-4 grid gap-4 text-muted-foreground md:grid-cols-2">
            <li className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
              Deterministic state machine driving actuators and safety interlocks.
            </li>
            <li className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
              Real-time fault detection with visual alerts on 7-segment indicators.
            </li>
            <li className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
              Modular input layer allowing easy addition of sensors or manual overrides.
            </li>
            <li className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
              Extensive simulation suite ensuring timing closure before deployment.
            </li>
          </ul>
        </section>

        <section className="mb-12 rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-8">
          <h2 className="text-2xl font-semibold text-[var(--electric-blue)]">Gallery</h2>
          <p className="mt-4 text-muted-foreground">
            Snapshots from prototyping and the final deployment dashboard.
          </p>
          <div className="mt-6 grid gap-6 md:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-primary/20 bg-slate-900/40">
              <Image
                src="/placeholder.jpg"
                alt="Flip-flop automation state machine diagram"
                width={640}
                height={400}
                className="h-full w-full object-cover"
              />
              <figcaption className="p-4 text-sm text-muted-foreground">
                State machine diagram highlighting sequential transitions.
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-primary/20 bg-slate-900/40">
              <Image
                src="/placeholder-logo.png"
                alt="FPGA prototype of the automation system"
                width={640}
                height={400}
                className="h-full w-full object-cover"
              />
              <figcaption className="p-4 text-sm text-muted-foreground">
                FPGA prototype driving the automation test bench with live monitoring.
              </figcaption>
            </figure>
          </div>
        </section>

        <section className="rounded-3xl border border-[var(--section-border)] bg-[var(--section-surface)] p-8">
          <h2 className="text-2xl font-semibold text-[var(--electric-blue)]">Challenges & Lessons Learned</h2>
          <ul className="mt-4 space-y-4 text-muted-foreground">
            <li>
              Transitioned from combinational prototypes to synchronous logic, reinforcing the importance of debouncing
              and metastability mitigation.
            </li>
            <li>
              Tuned flip-flop timing constraints to avoid setup/hold violations when interfacing with mechanical sensors.
            </li>
            <li>
              Built reusable VHDL packages for state definitions, accelerating future automation projects.
            </li>
          </ul>
        </section>
      </div>
    </main>
  )
}
