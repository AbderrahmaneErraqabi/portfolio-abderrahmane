import Link from "next/link"
import type { Metadata } from "next"
import { MedBotCodeModal } from "./code-modal"
import { ZoomableImageModal } from "./image-modal"

const GITHUB_URL = "https://github.com/AnisLalaoui/Starhack-2026"
const DEMO_URL = "https://youtube.com/shorts/HksG5nQMoSc?feature=share"

const problemPoints = [
  "forgetting to take medication",
  "taking it at the wrong time",
  "missing proper follow-up",
  "struggling with daily routine management",
]

const solutionPoints = [
  "scheduled medication reminders using a real-time clock",
  "progressive alerts that become more noticeable over time",
  "automatic pill dispensing",
  "on-screen guidance through an LCD display",
  "user confirmation through a keypad",
  "a simple embedded system that works offline",
]

const keyFeatures = [
  "multiple reminders per day",
  "progressive alert escalation",
  "automatic pill release mechanism",
  "user confirmation through keypad input",
  "LCD feedback and status display",
  "full hardware and software integration",
  "standalone embedded operation without internet connection",
]

const workflow = [
  "The RTC module continuously tracks the current time.",
  "When a scheduled medication time is reached, MedBot triggers an alert.",
  "The buzzer and LED notify the user.",
  "The LCD displays a message indicating that it is time to take the medication.",
  "The servo opens the trap door.",
  "Pills are dispensed into the container.",
  "The user confirms the intake using the keypad.",
  "The stepper motor prepares the next dose cycle.",
  "The system resets and waits for the next programmed reminder.",
]

const hardwareRows = [
  ["Arduino Uno R3", "Main controller"],
  ["RTC DS1307", "Keeps track of real time"],
  ["LCD 1602", "Displays time and system messages"],
  ["Servo Motor", "Controls the trap door"],
  ["Stepper Motor + ULN2003", "Rotates the dispensing mechanism"],
  ["Keypad", "User input and confirmation"],
  ["Buzzer", "Audio alert"],
  ["LED", "Visual alert"],
]

const pinRows = [
  ["LCD 1602", "2, 12, 13, A0, A1, A2"],
  ["RTC DS1307", "A4 (SDA), A5 (SCL)"],
  ["Servo Motor", "7"],
  ["Stepper Motor + ULN2003", "8, 9, 10, 11"],
  ["Buzzer", "3"],
  ["LED", "A3"],
  ["Keypad", "4, 5, 6"],
]

const futureImprovements = [
  "voice interaction",
  "mobile application integration",
  "IoT connectivity",
  "health monitoring and usage analytics",
  "improved pill detection",
  "more secure dose verification",
  "multi-user support",
  "compact enclosure redesign",
]

export const metadata: Metadata = {
  title: "MedBot – Smart Medication Companion",
  description:
    "Arduino-based smart medication assistance prototype with reminders, progressive alerts, user confirmation, and automatic pill dispensing.",
}

export default function MedBotProject() {
  const sectionClass =
    "rounded-3xl border border-primary/25 bg-(--section-surface)/95 p-6 backdrop-blur-xl ring-1 ring-primary/10 shadow-[0_22px_65px_-45px_rgba(94,177,255,0.7)] sm:p-8"
  const sectionTitleClass = "text-2xl font-semibold tracking-tight text-(--electric-blue)"

  return (
    <main className="min-h-screen bg-(--section-alt) text-foreground selection:bg-primary/30">
      <div className="mx-auto max-w-6xl space-y-10 px-6 py-14 lg:px-8 lg:py-16">
        <section className="mb-10 rounded-3xl border border-primary/35 bg-(--section-surface) p-8 shadow-[0_30px_70px_-45px_rgba(94,177,255,0.95)] backdrop-blur-xl ring-1 ring-primary/15 lg:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-primary/70">Embedded Systems / Arduino / Hardware</p>
          <h1 className="mt-4 text-3xl font-bold tracking-tight text-(--electric-blue) sm:text-4xl lg:text-6xl">MedBot | Smart Medication Companion</h1>
          <div className="mt-4 h-0.5 w-28 rounded-full bg-linear-to-r from-primary/90 via-[#72d6ff] to-transparent" />
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-muted-foreground">
            MedBot is an embedded smart medication assistance system designed to help users take their pills on time,
            reduce missed doses, and simplify daily medication management through reminders, alerts, and automatic
            dispensing.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-primary/90">
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1">Offline-first</span>
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1">Embedded intelligence</span>
            <span className="rounded-full border border-primary/40 bg-primary/10 px-3 py-1">Arduino prototype</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
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
              className="inline-flex items-center justify-center rounded-full border border-primary/35 bg-primary/5 px-5 py-2 text-sm font-semibold text-foreground transition hover:border-primary/70 hover:bg-primary/10 hover:text-primary"
            >
              GitHub ↗
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center rounded-full border border-primary/50 bg-linear-to-r from-primary/80 to-[#72d6ff] px-5 py-2 text-sm font-semibold text-slate-950 shadow-[0_18px_55px_-30px_rgba(94,177,255,0.9)] transition hover:-translate-y-0.5"
            >
              Demo Video ↗
            </a>
            <MedBotCodeModal />
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Overview</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            Medication adherence can be difficult for many people, especially elderly users, busy individuals, or
            anyone managing multiple prescriptions. MedBot was developed as a compact embedded solution that reminds,
            guides, and assists the user during the medication process.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The system combines real-time scheduling, progressive alerts, user confirmation, and automatic pill
            dispensing in a single Arduino-based prototype.
          </p>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>Problem Statement</h2>
            <p className="mt-4 text-muted-foreground">Many users face challenges such as:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {problemPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
            <p className="mt-4 text-muted-foreground">
              These issues can reduce treatment effectiveness and increase health risks.
            </p>
          </article>

          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>Proposed Solution</h2>
            <p className="mt-4 text-muted-foreground">MedBot addresses this problem by providing:</p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {solutionPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Prototype</h2>
          <p className="mt-3 text-muted-foreground">Click the image to open, zoom in/out, and inspect details.</p>
          <div className="mt-6 mx-auto max-w-xl">
            <ZoomableImageModal
              src="/medbot-prototype.png"
              alt="MedBot physical prototype"
              title="MedBot Prototype"
              caption="MedBot physical prototype"
            />
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Circuit Design</h2>
          <p className="mt-3 text-muted-foreground">Click the image to open, zoom in/out, and inspect wiring like a document viewer.</p>
          <div className="mt-6">
            <ZoomableImageModal
              src="/medbot-circuit.png"
              alt="MedBot circuit design"
              title="MedBot Circuit Design"
              caption="Hardware circuit design used in MedBot"
            />
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>Key Features</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>Technologies Used</h2>
            <h3 className="mt-5 text-lg font-semibold text-primary">Hardware</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-muted-foreground marker:text-primary">
              <li>Arduino Uno R3</li>
              <li>RTC DS1307</li>
              <li>LCD 1602</li>
              <li>Servo motor</li>
              <li>28BYJ-48 stepper motor</li>
              <li>ULN2003 driver</li>
              <li>Keypad</li>
              <li>Buzzer</li>
              <li>LED</li>
            </ul>

            <h3 className="mt-6 text-lg font-semibold text-primary">Software</h3>
            <ul className="mt-3 list-disc space-y-1.5 pl-6 text-muted-foreground marker:text-primary">
              <li>Arduino IDE</li>
              <li>Embedded C++ with Arduino</li>
            </ul>
          </article>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Hardware Architecture</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-primary/15">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary/10 text-primary">
                <tr>
                  <th className="px-4 py-3 font-semibold">Component</th>
                  <th className="px-4 py-3 font-semibold">Function</th>
                </tr>
              </thead>
              <tbody>
                {hardwareRows.map(([component, functionText]) => (
                  <tr key={component} className="border-t border-primary/10 odd:bg-primary/3 even:bg-transparent">
                    <td className="px-4 py-3 text-foreground">{component}</td>
                    <td className="px-4 py-3 text-muted-foreground">{functionText}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Pin Configuration</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-primary/15">
            <table className="w-full text-left text-sm">
              <thead className="bg-primary/10 text-primary">
                <tr>
                  <th className="px-4 py-3 font-semibold">Component</th>
                  <th className="px-4 py-3 font-semibold">Pins</th>
                </tr>
              </thead>
              <tbody>
                {pinRows.map(([component, pins]) => (
                  <tr key={component} className="border-t border-primary/10 odd:bg-primary/3 even:bg-transparent">
                    <td className="px-4 py-3 text-foreground">{component}</td>
                    <td className="px-4 py-3 text-muted-foreground">{pins}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>System Workflow</h2>
          <ol className="mt-5 space-y-3 text-muted-foreground">
            {workflow.map((step, index) => (
              <li key={step} className="rounded-2xl border border-primary/15 bg-primary/5 px-4 py-3 leading-relaxed">
                <span className="font-semibold text-primary">{index + 1}. </span>
                {step}
              </li>
            ))}
          </ol>
        </section>

        <section className="grid gap-8 lg:grid-cols-2">
          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>Why This Project Matters</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              MedBot is not just a dispensing mechanism. It is a user-centered embedded system designed to improve
              autonomy, safety, and medication adherence in a simple and accessible way.
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              <li>practical real-world use case</li>
              <li>complete integration of electronics, programming, and mechanical design</li>
              <li>offline operation</li>
              <li>strong potential for future healthcare applications</li>
            </ul>
          </article>

          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>Innovation</h2>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              MedBot simulates intelligent assistance using embedded logic only. It does not rely on cloud services or
              internet connectivity. Instead, it uses local scheduling, hardware control, and contextual feedback to
              create a reliable and self-contained user experience.
            </p>
          </article>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Future Improvements</h2>
          <ul className="mt-5 grid gap-2.5 text-muted-foreground md:grid-cols-2">
            {futureImprovements.map((item) => (
              <li key={item} className="rounded-xl border border-primary/15 bg-primary/5 px-4 py-2.5">{item}</li>
            ))}
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Project Status</h2>
          <p className="mt-4 text-muted-foreground">
            This project is currently a functional prototype developed for academic and demonstration purposes.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Disclaimer</h2>
          <p className="mt-4 text-muted-foreground">
            MedBot is a prototype and is not a certified medical device. It should not be used as a replacement for
            professional medical equipment or medical supervision.
          </p>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Repository Structure</h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-primary/15 bg-slate-950 p-5">
            <pre className="text-xs leading-relaxed text-slate-100">
{`Starhack-2026/
├── medbot-prototype.png
├── medbot-circuit.png
├── README.md
└── Code_Starhack_2026_equipe2.ino`}
            </pre>
          </div>
        </section>
      </div>
    </main>
  )
}
