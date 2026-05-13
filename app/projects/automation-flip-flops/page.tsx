import Image from "next/image"
import Link from "next/link"
import type { Metadata } from "next"
import { ChevronRight } from "lucide-react"
import CodeModal from "./code-modal"
import { ImageZoomable } from "./image-modal"

export const metadata: Metadata = {
  title: "ELE1001 BCD Keypad Display & Pill Bottling System",
  description: "Complete embedded system for automated pill bottling with Arduino keypad input, BCD display, and discrete logic counting stages.",
}


export default function ELE1001Project() {
  return (
    <main className="min-h-screen bg-[var(--page-gradient)] text-foreground selection:bg-primary/20">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        {/* Header */}
        <div className="project-hero mb-16 flex flex-col gap-6 p-10">
          <div className="flex flex-wrap items-start justify-between gap-6">
            <div className="flex-1">
              <p className="text-sm uppercase tracking-[0.35em] text-primary/70">ELE1001 — Digital Systems & Embedded</p>
              <h1 className="mt-4 text-5xl font-bold text-[var(--electric-blue)] lg:text-6xl">
                BCD Keypad Display & Pill Bottling System
              </h1>
              <div className="mt-4 w-28">
                <div className="accent-flow rounded-full" />
              </div>
              <p className="mt-4 text-lg leading-relaxed text-muted-foreground max-w-3xl">
                A complete three-stage automated system combining Arduino-based user input with discrete digital logic for accurate pill counting and bottling control. Demonstrates microcontroller integration with TTL components in a real-world industrial application.
              </p>
            </div>
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/20 whitespace-nowrap"
            >
              ← Back to projects
            </Link>
          </div>
        </div>

        {/* Objective */}
        <section className="project-section mb-16 p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)]">General Objective</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The objective of this project is to design an embedded digital system capable of reading a user-defined quantity through a 4×4 keypad, displaying that value in BCD on two seven-segment displays, and using this value to control an automated pill bottling process. The system must be reliable, deterministic, and compatible with downstream digital logic, combining discrete logic components with Arduino-based optimization for a modular and maintainable architecture.
          </p>
        </section>

        {/* System Overview */}
        <section className="project-section mb-16 p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)] mb-8">System Architecture: Three Stages</h2>
          <div className="grid gap-6 md:grid-cols-3">
            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white font-bold">1</div>
                <h3 className="text-xl font-semibold text-[var(--electric-blue)]">User Input & Display</h3>
              </div>
              <p className="text-muted-foreground">Arduino manages keypad scanning, BCD conversion, and seven-segment display control entirely in software.</p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white font-bold">2</div>
                <h3 className="text-xl font-semibold text-[var(--electric-blue)]">Pill Counting</h3>
              </div>
              <p className="text-muted-foreground">Cascaded BCD counters and magnitude comparator detect when the correct number of pills has been counted.</p>
            </div>

            <div className="rounded-2xl border border-primary/20 bg-primary/5 p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white font-bold">3</div>
                <h3 className="text-xl font-semibold text-[var(--electric-blue)]">Bottle Counting</h3>
              </div>
              <p className="text-muted-foreground">Modulo-8 counter tracks filled bottles (0–7) with seven-segment display and automatic wraparound detection.</p>
            </div>
          </div>
        </section>

        {/* Stage 1 */}
        <section className="project-section mb-16 p-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-10 h-10 rounded-full bg-[var(--electric-blue)] flex items-center justify-center text-white text-lg font-bold">1</div>
            <h2 className="text-3xl font-bold text-[var(--electric-blue)]">Stage 1: User Input & Display (Arduino)</h2>
          </div>

          <div className="space-y-8">
            {/* Keypad Reading */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Keypad Reading
              </h3>
              <p className="text-muted-foreground mb-4">
                A 4×4 matrix keypad serves as the human-machine interface. The Arduino performs matrix scanning:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Columns are driven LOW one at a time</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Rows are read using INPUT_PULLUP configuration</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>A key is detected when a row reads LOW while its column is active</span>
                </li>
              </ul>
              <div className="mt-4 p-4 border-l-4 border-primary/40 bg-transparent rounded">
                <p className="text-sm text-muted-foreground font-semibold">Key Design Decision:</p>
                <p className="text-sm text-muted-foreground mt-2">
                  The system detects <strong>key release</strong>, not key press. This naturally eliminates switch bounce and prevents repeated inputs when a key is held—a crucial reliability improvement.
                </p>
              </div>
            </div>

            {/* BCD Conversion */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Conversion to BCD
              </h3>
              <p className="text-muted-foreground mb-4">
                When a numeric key (0–9) is released:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The key is converted to its BCD representation</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The system automatically alternates between units and tens digits</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>An internal state variable handles this alternation</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This design allows intuitive two-digit entry without additional confirmation steps.
              </p>
            </div>

            {/* BCD Output */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                BCD Output Generation
              </h3>
              <p className="text-muted-foreground mb-4">
                The Arduino drives eight dedicated GPIO pins:
              </p>
              <div className="grid md:grid-cols-2 gap-4 ml-6 text-muted-foreground">
                <div className="p-3 border border-primary/20 rounded bg-transparent flex items-center justify-center">
                  <CodeModal />
                </div>
                <ul className="space-y-3">
                  <li className="flex items-start gap-3">
                    <span className="text-primary font-semibold">•</span>
                    <span>Naturally wraps around after 7 (no extra detection logic needed)</span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Display */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Display of Bottle Count (74LS247)
              </h3>
              <p className="text-muted-foreground">
                The three-bit counter output drives a 74LS247 BCD-to-seven-segment decoder, which controls a dedicated seven-segment display showing the number of filled bottles (0–7). This provides real-time visual feedback on production progress.
              </p>
            </div>

            {/* Global Reset */}
            <div className="rounded-2xl border border-primary/15 bg-primary/5 p-6">
              <h3 className="text-xl font-semibold text-[var(--electric-blue)] mb-4 flex items-center gap-2">
                <ChevronRight className="w-5 h-5" />
                Global Reset Using <code className="text-primary font-semibold">#</code>
              </h3>
              <p className="text-muted-foreground mb-4">
                Pressing the <code className="text-primary font-semibold">#</code> key resets:
              </p>
              <ul className="space-y-3 text-muted-foreground ml-6">
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>Both pill counters</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The bottle counter</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-primary font-semibold">•</span>
                  <span>The display system</span>
                </li>
              </ul>
              <p className="text-muted-foreground mt-4">
                This guarantees a clean return to a known and stable initial state for the next production cycle.
              </p>
            </div>
          </div>
        </section>

        {/* Why Arduino */}
        <section className="project-section mb-16 p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)] mb-6">Why Arduino Was Chosen</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            Migrating the display and keypad logic to an Arduino provided significant engineering advantages over a purely discrete implementation:
          </p>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Reduced Hardware Complexity</p>
                <p className="text-sm text-muted-foreground">Eliminates dozens of debounce capacitors and logic gates</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Elimination of Debounce Circuits</p>
                <p className="text-sm text-muted-foreground">Release-detection algorithm handles bounce inherently</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Improved Signal Stability</p>
                <p className="text-sm text-muted-foreground">Software control ensures clean, predictable BCD outputs</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Easier Future Modifications</p>
                <p className="text-sm text-muted-foreground">Firmware changes require no PCB redesign</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">Better Synchronization</p>
                <p className="text-sm text-muted-foreground">Precise timing control for Z and # signal pulses</p>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="text-primary font-bold mt-1">✓</div>
              <div>
                <p className="font-semibold text-foreground">TTL Compatibility</p>
                <p className="text-sm text-muted-foreground">Direct BCD outputs work seamlessly with discrete logic</p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section className="project-section mb-16 p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)] mb-8">Project Resources & Media</h2>
          
          <div className="space-y-6 mb-8">
            <ImageZoomable />

            <figure className="overflow-hidden rounded-2xl border border-primary/20">
              <div className="w-full h-[65vh] bg-black rounded overflow-hidden">
                <iframe
                  src="https://www.youtube.com/embed/AgQNyCCDQiU"
                  title="ELE1001 Project Presentation"
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
              <figcaption className="p-4 text-sm text-muted-foreground text-center">
                Project Presentation Video (YouTube)
              </figcaption>
            </figure>
          </div>

          <div className="space-y-3 flex flex-col">
            <CodeModal />

            <a
              href="https://github.com/AbderrahmaneErraqabi/ELE1001-Keypad-7Segment-System"
              className="inline-flex items-center gap-2 rounded-lg border border-primary/30 bg-primary/10 px-6 py-3 text-sm font-medium text-primary hover:bg-primary/20 transition"
              target="_blank"
              rel="noopener noreferrer"
            >
              🔗 GitHub Repository
            </a>
          </div>
        </section>

        {/* Summary */}
        <section className="project-section p-10">
          <h2 className="text-3xl font-bold text-[var(--electric-blue)] mb-6">Final Result</h2>
          <p className="text-muted-foreground mb-6 leading-relaxed">
            The complete system delivers a robust, production-ready solution for automated pill bottling:
          </p>
          <ul className="grid md:grid-cols-2 gap-4">
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Intuitive user input via matrix keypad</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Stable, synchronized BCD output signals</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Accurate pill counting from 0 to 99</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Automatic bottle completion detection</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Modular bottle tracking (0–7 bottles per box)</span>
            </li>
            <li className="flex gap-3">
              <span className="text-primary font-bold">→</span>
              <span className="text-muted-foreground">Clean, predictable state resets</span>
            </li>
          </ul>
          <p className="text-muted-foreground mt-8 italic">
            The design respects digital logic principles, modularity, and real-world reliability constraints, demonstrating professional engineering practice in embedded systems.
          </p>
        </section>
      </div>
    </main>
  )
}
