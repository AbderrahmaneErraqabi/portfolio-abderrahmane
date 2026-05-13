import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

type Project = {
  title: string
  description: string
  tags: string[]
  github: string
  demo: string
}

const projects: Project[] = [
  {
    title: "Solar Car Wiring System",
    description:
      "Designed and implemented wiring harness for the Esteban Solar Car team, integrating embedded systems for optimal power distribution.",
    tags: ["Embedded Systems", "KiCad", "Power Electronics"],
    github: "#",
    demo: "https://esteban.polymtl.ca",
  },
  {
    title: "ELE1001 BCD Keypad Display",
    description:
      "Embedded Arduino system that reads a 4×4 keypad and drives a two-digit BCD display, with validation and synchronization signals.",
    tags: ["Arduino", "Embedded", "BCD"],
    github: "https://github.com/AbderrahmaneErraqabi/ELE1001-Keypad-7Segment-System",
    demo: "/projects/automation-flip-flops",
  },
  {
    title: "AM Radio Receiver",
    description:
      "Designed and built an AM radio receiver using an LC resonant loop antenna, 1N34A germanium diode demodulation, and LM386 audio amplification.",
    tags: ["Electromagnetics", "Analog Electronics", "LC Resonance", "LM386", "Prototyping"],
    github: "https://github.com/AbderrahmaneErraqabi/am-radio-receiver",
    demo: "/projects/am-radio-receiver",
  },
  {
    title: "Image Processing & Pixel Manipulation Tool",
    description: "Developed a C++ image processor that performs grayscale conversion, brightness adjustment, and pixel filtering.",
    tags: ["C++", "Image Processing", "Algorithms"],
    github: "https://github.com/AbderrahmaneErraqabi/Image-processor",
    demo: "https://github.com/AbderrahmaneErraqabi/Image-processor",
  },
  {
    title: "RegulAI – Portfolio Intelligence",
    description:
      "PolyFinances Datathon 2025 build that ingests regulations, enriches them with Yahoo Finance data, and translates the impact into portfolio-ready insights.",
    tags: ["React", "AWS", "Serverless", "Finance AI"],
    github: "https://github.com/AbderrahmaneErraqabi/RegulAi",
    demo: "/projects/personal-investing-dashboard",
  },
  {
    title: "MedBot",
    description:
      "Smart Medication Companion — Arduino-based embedded system that automates medication reminders, alerts, and pill dispensing through a compact hardware prototype.",
    tags: ["Arduino", "Embedded C++", "Electronics", "Hardware Design", "Prototyping"],
    github: "https://github.com/AnisLalaoui/Starhack-2026",
    demo: "/projects/medbot",
  },
  {
    title: "ESP32 AI Camera Web Server",
    description:
      "An embedded computer vision project combining an ESP32 camera stream, a local web server, and an Edge Impulse image classification model.",
    tags: ["ESP32", "Edge Impulse", "Computer Vision", "Arduino", "Python"],
    github: "https://github.com/AbderrahmaneErraqabi/ESP32-AI-Camera-WebServer",
    demo: "/projects/esp32-ai-camera-web-server",
  },
]

import { SectionWrapper } from "./section-wrapper"

export function Projects() {
  return (
    <SectionWrapper id="projects" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center section-title">Projects</h2>
        <div className="mx-auto mt-4 mb-8 h-0.5 w-16 bg-[linear-gradient(90deg,transparent,rgba(95,176,255,0.12),transparent)]" />
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          A collection of my engineering and software projects, showcasing my skills in embedded systems, circuit
          design, and software development.
        </p>
        <div className="mx-auto grid max-w-[92rem] grid-cols-1 gap-7 md:grid-cols-2 xl:grid-cols-12">
          {projects.map((project, index) => {
            const sizeClass = index < 2 ? 'xl:col-span-6' : 'xl:col-span-6'
            const isInternal = project.demo.startsWith("/") && !project.demo.startsWith("//")

            return (
              <Card
                key={index}
                className={`group relative min-h-[20.5rem] transition-all duration-300 ${sizeClass}`}
              >
                <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(95,176,255,0.34),rgba(139,124,255,0.28),transparent)] opacity-70" />
                <CardHeader>
                  <div className="mb-2 inline-flex w-fit items-center rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.05)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.22em] text-muted-foreground">
                    {String(index + 1).padStart(2, "0")}
                  </div>
                  <CardTitle className="transition-colors duration-300 group-hover:text-primary">{project.title}</CardTitle>
                  <CardDescription className="leading-relaxed text-muted-foreground">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-5 flex flex-wrap gap-2">
                    {project.tags.map((tag, tagIndex) => (
                      <span
                        key={tagIndex}
                        className="rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-3 py-1 text-[11px] font-medium text-muted-foreground transition-all duration-300 group-hover:border-primary/25 group-hover:text-foreground"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" variant="outline" className="flex-1 gap-2 rounded-xl" asChild>
                      <a href={project.github} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4" />
                        GitHub
                      </a>
                    </Button>
                    <Button
                      size="sm"
                      className="flex-1 gap-2 rounded-xl border border-primary/45 bg-primary/14 text-primary shadow-[0_12px_28px_-24px_rgba(94,177,255,0.65)] transition duration-300 hover:-translate-y-0.5 hover:bg-primary/22 hover:border-primary/60"
                      asChild
                    >
                      <a
                        href={project.demo}
                        target={isInternal ? undefined : "_blank"}
                        rel={isInternal ? undefined : "noopener noreferrer"}
                      >
                        <ExternalLink className="h-4 w-4 drop-shadow-sm" />
                        Details
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </SectionWrapper>
  )
}
