import Link from "next/link"
import type { Metadata } from "next"
import { ESP32CodeModal } from "./code-modal"

const GITHUB_URL = "https://github.com/AbderrahmaneErraqabi/ESP32-AI-Camera-WebServer"
const DEMO_URL = "https://youtube.com/shorts/_FmC6DXuqRQ?feature=share"
const DEMO_EMBED_URL = "https://www.youtube.com/embed/_FmC6DXuqRQ"

const objectClasses = ["apple", "orange", "cucumber", "manette/controller", "background"]

const technologies = [
  "ESP32 Wrover Module",
  "ESP32 Camera",
  "Arduino IDE",
  "Edge Impulse",
  "Python",
  "WiFi camera web server",
  "Image classification model",
  "Quantized int8 Arduino deployment",
]

const keyFeatures = [
  "Live camera stream accessible from a browser",
  "Object classification directly on the ESP32",
  "Custom dataset collected using the ESP32 camera",
  "Python script to automatically capture dataset images",
  "Edge Impulse model trained on custom object classes",
  "Static IP configuration for stable local access",
  "Real-time recognition demo with browser streaming",
]

const workflow = [
  "The ESP32 camera captures images and hosts a local web server for the video stream.",
  "A Python script was used to collect training images from the ESP32 camera endpoint.",
  "The dataset was uploaded to Edge Impulse and used to train an image classification model.",
  "The model was exported as a quantized int8 Arduino library.",
  "The exported model was integrated into the ESP32 CameraWebServer code.",
  "The final system streams video in the browser while running AI predictions on the ESP32.",
]

const results = [
  "The final demo successfully shows the ESP32 camera recognizing multiple objects in real time.",
  "The project demonstrates a complete embedded AI pipeline: dataset collection, model training, deployment to microcontroller, live inference, and web streaming.",
]

export const metadata: Metadata = {
  title: "ESP32 AI Camera Web Server",
  description:
    "Embedded AI computer vision project using an ESP32 camera, a live web streaming interface, and an Edge Impulse image classification model.",
}

export default function ESP32AICameraWebServerProject() {
  const sectionClass = "project-section mb-12 p-10"
  const sectionTitleClass = "text-3xl font-semibold tracking-tight text-[var(--electric-blue)]"

  return (
    <main className="min-h-screen bg-[var(--page-gradient)] text-foreground selection:bg-primary/20">
      <div className="mx-auto max-w-6xl px-6 py-14 lg:px-8 lg:py-16">
        <section className="project-hero mb-10 p-8 sm:p-10">
          <p className="text-sm uppercase tracking-[0.35em] text-primary/70">ESP32 / Edge Impulse / Embedded AI</p>
          <h1 className="text-balance mt-4 text-4xl font-bold tracking-tight text-[var(--electric-blue)] sm:text-5xl lg:text-6xl">
            ESP32 AI Camera Web Server
          </h1>
          <div className="mt-4 w-28">
            <div className="accent-flow rounded-full" />
          </div>
          <div className="mt-4 h-0.5 w-16 bg-primary/20" />
          <p className="mt-5 max-w-4xl text-lg leading-relaxed text-muted-foreground">
            An embedded AI computer vision project using an ESP32 camera, a live web streaming interface, and an
            Edge Impulse image classification model to recognize objects in real time.
          </p>

          <div className="mt-5 flex flex-wrap gap-2 text-xs font-semibold uppercase tracking-wide text-primary/80">
            <span className="project-chip rounded-full px-3 py-1">Live browser stream</span>
            <span className="project-chip rounded-full px-3 py-1">On-device inference</span>
            <span className="project-chip rounded-full px-3 py-1">ESP32 prototype</span>
          </div>

          <div className="mt-7 flex flex-wrap gap-3">
            <Link
              href="/#projects"
              className="project-btn project-btn-soft"
            >
              ← Back to projects
            </Link>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn project-btn-neutral"
            >
              GitHub ↗
            </a>
            <ESP32CodeModal />
          </div>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Overview</h2>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            This project combines live camera streaming with edge AI object recognition. The ESP32 hosts a local web
            server so the camera feed can be viewed directly in a browser, while a quantized Edge Impulse model runs
            alongside the stream and classifies objects through the Serial Monitor.
          </p>
          <p className="mt-4 leading-relaxed text-muted-foreground">
            The result is a compact embedded AI pipeline that covers data collection, training, deployment, streaming,
            and real-time inference on constrained hardware.
          </p>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>What It Recognizes</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {objectClasses.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>

          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>Technologies Used</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {technologies.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </article>
        </section>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>Key Features</h2>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-muted-foreground marker:text-primary">
              {keyFeatures.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </article>

          <article className={sectionClass}>
            <h2 className={sectionTitleClass}>How It Works</h2>
            <ol className="mt-4 space-y-3 text-muted-foreground">
              {workflow.map((step, index) => (
                <li key={step} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 leading-relaxed">
                  <span className="font-semibold text-primary">{index + 1}. </span>
                  {step}
                </li>
              ))}
            </ol>
          </article>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Results</h2>
          <ul className="mt-4 space-y-3 text-muted-foreground">
            {results.map((item) => (
              <li key={item} className="rounded-lg border border-primary/15 bg-primary/5 px-4 py-3 leading-relaxed">
                {item}
              </li>
            ))}
          </ul>
        </section>

        <section className={sectionClass}>
          <h2 className={sectionTitleClass}>Demo Video</h2>
          <p className="mt-3 text-muted-foreground">Watch the demo directly on this page.</p>
          <div className="mt-6 overflow-hidden rounded-[28px] border border-primary/20 bg-black shadow-[0_18px_55px_-30px_rgba(94,177,255,0.9)]">
            <div className="aspect-video">
              <iframe
                title="ESP32 AI Camera Web Server demo video"
                src={DEMO_EMBED_URL}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="h-full w-full"
              />
            </div>
          </div>
          <div className="mt-4 flex flex-wrap gap-3">
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn project-btn-primary"
            >
              GitHub Repository ↗
            </a>
            <a
              href={DEMO_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="project-btn project-btn-neutral"
            >
              YouTube Link ↗
            </a>
          </div>
        </section>
      </div>
    </main>
  )
}