import Link from "next/link"
import type { Metadata } from "next"
import { ZoomableImageModal } from "./image-modal"

const GITHUB_URL = "https://github.com/AbderrahmaneErraqabi/am-radio-receiver"
const VIDEO_URL = "https://youtube.com/shorts/N03W0twUTz0"
const VIDEO_EMBED_URL = "https://www.youtube.com/embed/N03W0twUTz0"

const technicalValues = [
  ["Target AM band", "540 kHz to 1600 kHz"],
  ["Variable capacitance range", "14 pF to 200 pF (2x TRC210 in parallel)"],
  ["Fixed capacitor", "10 pF"],
  ["Maximum equivalent capacitance", "210 pF"],
  ["Calculated inductance", "413.65 uH"],
  ["Diode", "1N34A germanium"],
  ["Amplifier", "LM386"],
  ["Potentiometer", "10 kOhm"],
  ["Supply", "9 V battery"],
]

const geometryValues = [
  ["Frame shape", "Square"],
  ["Frame side length", "26.5 cm"],
  ["Wire gauge", "26 AWG"],
  ["Number of turns", "18 turns"],
]

const architecture = [
  "Loop antenna / copper coil receives the AM electromagnetic wave and acts as the tuning inductance.",
  "LC resonant stage selects the desired station by maximizing response near the resonant frequency.",
  "1N34A germanium diode demodulates the AM signal by envelope detection.",
  "LM386 audio stage amplifies the recovered audio for low-impedance earphones.",
]

const principles = [
  "Electromagnetic induction in the loop converts changing magnetic flux into an induced voltage.",
  "The loop antenna behaves electrically as an inductor and is part of the resonant network.",
  "LC resonance creates frequency selectivity around f0 = 1 / (2*pi*sqrt(L*C)).",
  "AM audio information is encoded in the carrier envelope and recovered by diode rectification.",
  "Audio amplification is necessary because detected RF envelopes are too weak to drive headphones directly.",
]

const buildNotes = [
  "Built on breadboard for rapid iteration and easy debugging.",
  "Coil wound manually on a 26.5 cm cardboard square frame.",
  "Two variable capacitors wired in parallel to extend tuning range toward lower AM frequencies.",
  "Careful lead routing and stable contacts used to limit parasitic effects.",
]

const testNotes = [
  "Tuning is highly sensitive to small capacitance adjustments.",
  "Loop orientation strongly influences reception quality.",
  "Signal levels are low, so clean wiring and short RF paths are critical.",
  "Amplifier polarity and grounding details affect noise and stability.",
]

export const metadata: Metadata = {
  title: "AM Radio Receiver",
  description:
    "Design and construction of an AM radio receiver using an LC resonant circuit, 1N34A germanium diode, and LM386 audio amplifier.",
}

export default function AMRadioReceiverProject() {
  const sectionClass = "mb-16 rounded-3xl border border-(--section-border) bg-(--section-surface) p-10"
  const sectionTitleClass = "text-3xl font-bold text-(--electric-blue)"

  return (
    <main className="min-h-screen bg-(--section-alt) text-foreground">
      <div className="mx-auto max-w-6xl px-6 py-16 lg:px-8">
        <section className="mb-16 flex flex-col gap-6 rounded-3xl border border-(--section-border) bg-(--section-surface) p-10 shadow-[0_25px_65px_-45px_rgba(94,177,255,0.85)] backdrop-blur-xl">
          <p className="text-sm uppercase tracking-[0.35em] text-primary/70">Electromagnetics / Analog Electronics / RF</p>
          <h1 className="mt-4 text-5xl font-bold text-(--electric-blue) lg:text-6xl">
            AM Radio Receiver
          </h1>
          <p className="mt-4 max-w-4xl text-lg leading-relaxed text-muted-foreground">
            Design and construction of a functional AM radio receiver using an LC resonant circuit, a 1N34A germanium
            detector diode, and an LM386 audio amplifier. The system receives AM broadcast signals, tunes the desired
            station, demodulates the envelope, and reproduces audible sound through standard low-impedance earphones.
          </p>

          <div className="mt-3 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="inline-flex items-center justify-center rounded-full border border-primary/40 bg-primary/10 px-6 py-3 text-sm font-semibold text-primary transition hover:border-primary/60 hover:bg-primary/20"
            >
              ← Back to projects
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-primary/35 bg-primary/5 px-6 py-3 text-sm font-semibold text-foreground transition hover:border-primary/70 hover:bg-primary/10 hover:text-primary"
            >
              GitHub ↗
            </a>
            <a
              href={VIDEO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-[linear-gradient(135deg,#3f8cff,#72d6ff)] px-6 py-3 text-sm font-semibold text-slate-950 shadow-[0_18px_55px_-30px_rgba(94,177,255,0.9)] transition hover:-translate-y-0.5"
            >
              YouTube Demo ↗
            </a>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Project Objective</h2>
          <p className="mt-6 text-lg leading-relaxed text-muted-foreground">
            The engineering objective was to build a simple but reliable AM receiver that can receive ambient AM
            broadcasts, tune across the standard AM band, recover transmitted audio, and deliver an audible output on
            common low-impedance earphones. The implementation combines theoretical sizing and practical breadboard
            prototyping.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Demo Video</h2>
          <p className="mt-4 text-muted-foreground">
            Embedded demonstration of the AM receiver in operation.
          </p>
          <div className="mt-6 overflow-hidden rounded-[28px] border border-primary/30 bg-black shadow-[0_18px_55px_-30px_rgba(94,177,255,0.9)]">
            <div className="aspect-video">
              <iframe
                title="AM radio receiver demo video"
                src={VIDEO_EMBED_URL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Functional Chain</h2>
          <ol className="mt-5 space-y-3 text-muted-foreground">
            {architecture.map((step, index) => (
              <li key={step} className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 leading-relaxed">
                <span className="font-semibold text-primary">{index + 1}. </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-(--section-border) bg-(--section-surface) p-10">
            <h2 className={sectionTitleClass}>Physical Principles</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {principles.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-(--section-border) bg-(--section-surface) p-10">
            <h2 className={sectionTitleClass}>Design Logic</h2>
            <ol className="mt-4 list-decimal space-y-2 pl-6 text-muted-foreground marker:text-primary">
              <li>Define the target AM band coverage.</li>
              <li>Measure realistic variable capacitor range from available components.</li>
              <li>Compute required inductance to reach the low-frequency limit.</li>
              <li>Design loop geometry and turns to match the target inductance.</li>
              <li>Validate tuning behavior experimentally and iterate physically.</li>
            </ol>
          </article>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Real Circuit Prototype</h2>
          <p className="mt-3 text-muted-foreground">Click to open the image in a zoomable viewer.</p>
          <div className="mx-auto mt-6 max-w-2xl">
            <ZoomableImageModal
              src="/realcircuit.png"
              alt="AM radio receiver real breadboard circuit"
              title="AM Radio Receiver - Real Circuit"
              caption="Breadboard implementation of the AM radio receiver"
            />
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Circuit Schematic</h2>
          <p className="mt-3 text-muted-foreground">Click to open the schematic and zoom in for wiring details.</p>
          <div className="mt-6">
            <ZoomableImageModal
              src="/circuitradio.png"
              alt="AM radio receiver circuit schematic"
              title="AM Radio Receiver - Circuit Schematic"
              caption="Schematic of the LC tuning, demodulation, and amplification chain"
            />
          </div>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-(--section-border) bg-(--section-surface) p-10">
            <h2 className={sectionTitleClass}>Electrical Values</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-primary/15">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary/10 text-primary">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Parameter</th>
                    <th className="px-4 py-3 font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {technicalValues.map(([name, value]) => (
                    <tr key={name} className="border-t border-primary/10 odd:bg-primary/3 even:bg-transparent">
                      <td className="px-4 py-3 text-foreground">{name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>

          <article className="rounded-3xl border border-(--section-border) bg-(--section-surface) p-10">
            <h2 className={sectionTitleClass}>Coil Geometry</h2>
            <div className="mt-5 overflow-hidden rounded-2xl border border-primary/15">
              <table className="w-full text-left text-sm">
                <thead className="bg-primary/10 text-primary">
                  <tr>
                    <th className="px-4 py-3 font-semibold">Parameter</th>
                    <th className="px-4 py-3 font-semibold">Value</th>
                  </tr>
                </thead>
                <tbody>
                  {geometryValues.map(([name, value]) => (
                    <tr key={name} className="border-t border-primary/10 odd:bg-primary/3 even:bg-transparent">
                      <td className="px-4 py-3 text-foreground">{name}</td>
                      <td className="px-4 py-3 text-muted-foreground">{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </article>
        </section>

        <section className="mb-16 grid gap-8 lg:grid-cols-2">
          <article className="rounded-3xl border border-(--section-border) bg-(--section-surface) p-10">
            <h2 className={sectionTitleClass}>Build Method</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {buildNotes.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>

          <article className="rounded-3xl border border-(--section-border) bg-(--section-surface) p-10">
            <h2 className={sectionTitleClass}>Testing and Tuning Notes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {testNotes.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>What This Demonstrates</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            This project shows the complete chain from electromagnetic wave capture to audible output using foundational
            circuit theory: induction, LC resonance, envelope detection, and analog audio amplification. It translates
            textbook electromagnetics into a functional communication prototype built with accessible components.
          </p>
        </section>
      </div>
    </main>
  )
}
