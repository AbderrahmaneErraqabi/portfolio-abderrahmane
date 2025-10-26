"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download, FolderGit2 } from "lucide-react"

import { SectionWrapper } from "./section-wrapper"

export function Hero() {
  const scrollToProjects = () => {
    const element = document.getElementById("projects")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <SectionWrapper
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24"
      style={{ background: "var(--section-alt)" }}
    >
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 opacity-90" style={{ background: "var(--section-alt)" }} />
        <div className="absolute inset-0 bg-[linear-gradient(to_right,var(--grid-line)_1px,transparent_1px),linear-gradient(to_bottom,var(--grid-line)_1px,transparent_1px)] bg-[size:80px_80px]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--primary)/15,transparent_55%),radial-gradient(circle_at_bottom,var(--primary)/20,transparent_60%)]" />
        <div className="absolute left-1/2 top-1/3 h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-primary/20 blur-3xl mix-blend-screen animate-pulse" />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="mx-auto max-w-4xl text-center animate-fade-in-up">
          <div className="relative mx-auto mb-10 h-44 w-44 overflow-hidden rounded-full ring-4 ring-primary/40 shadow-[0_25px_60px_-35px_rgba(94,177,255,0.9)] transition-transform duration-300 hover:scale-[1.03] md:h-56 md:w-56">
            <img
              src="/profile-photo.jpg"
              alt="Abderrahmane Er-Raqabi"
              className="h-full w-full object-cover"
              style={{ objectPosition: "50% 30%" }}
            />
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-[#040611d4]" />
          </div>
          <span className="mb-3 inline-flex items-center justify-center gap-2 rounded-full border border-[var(--section-border)] bg-[var(--section-surface)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.3em] text-primary/90 backdrop-blur">
            Electrical Engineering · AI · Finance
          </span>
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-foreground md:text-7xl">
            Abderrahmane Er-Raqabi
          </h1>
          <p className="mt-4 text-lg text-muted-foreground md:text-xl">
            Electrical Engineering Student at Polytechnique Montréal focused on embedded systems, automation, and
            intelligent power solutions.
          </p>
          <p className="mt-6 text-lg md:text-xl text-primary/90">
            Designing cleaner energy systems and smarter financial technology with a hands-on, system thinking mindset.
          </p>

          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Button
              size="lg"
              onClick={scrollToProjects}
              className="group gap-2 border border-transparent bg-[linear-gradient(135deg,#3f8cff,#72d6ff)] text-slate-950 shadow-[0_25px_65px_-30px_rgba(94,177,255,0.9)] transition-transform hover:-translate-y-0.5"
            >
              <FolderGit2 className="h-5 w-5 transition-transform group-hover:-translate-y-0.5" />
              View My Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 border-[var(--section-border)] bg-[var(--section-surface)] text-foreground hover:border-primary/50 hover:bg-primary/10"
              asChild
            >
              <a href="/Abderrahmane-Er-Raqabi-CV.pdf" download>
                <Download className="h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ArrowDown className="h-6 w-6 text-muted-foreground" />
        </div>
      </div>
    </SectionWrapper>
  )
}
