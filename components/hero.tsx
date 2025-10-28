"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download, FolderGit2 } from "lucide-react"

import { SectionWrapper } from "./section-wrapper"

export function Hero() {
  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,var(--primary)/18,transparent_60%),radial-gradient(circle_at_bottom,var(--primary)/24,transparent_65%)]" />
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
          <h1 className="text-balance text-5xl font-semibold tracking-tight text-transparent bg-clip-text bg-[linear-gradient(120deg,#0f172a,#1d4ed8_55%,#1e293b)] drop-shadow-[0_8px_20px_rgba(29,78,216,0.25)] md:text-7xl">
            Abderrahmane Er-Raqabi
          </h1>
          <div className="mx-auto mt-3 h-px w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
          <p className="mt-5 text-lg text-muted-foreground/90 backdrop-blur-sm md:text-xl">
            Electrical Engineering Student at Polytechnique Montréal focused on embedded systems, automation, and
            intelligent power solutions.
          </p>
          <p className="mt-4 text-lg font-medium text-primary/85 md:text-xl">
            Designing cleaner energy systems and smarter financial technology with a hands-on, system thinking mindset.
          </p>

          <div className="mt-8 flex flex-col items-center justify-center gap-5 sm:flex-row">
            <Button
              size="lg"
              onClick={() => scrollToSection("projects")}
              className="group flex w-full max-w-[260px] items-center justify-center gap-3 rounded-full border border-primary/40 bg-[linear-gradient(135deg,#0e1730,#1d4ed8_48%,#3f8cff)] px-9 py-3 text-sm font-semibold uppercase tracking-[0.18em] text-white shadow-[0_32px_100px_-42px_rgba(59,130,246,0.92)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_40px_120px_-45px_rgba(59,130,246,0.98)] sm:w-auto"
            >
              <FolderGit2 className="h-[18px] w-[18px] transition-transform duration-300 group-hover:-translate-y-0.5" />
              <span>Explore Projects</span>
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="gap-2 rounded-full border border-primary/40 bg-white/70 px-7 text-base font-semibold text-primary shadow-[0_30px_70px_-45px_rgba(29,78,216,0.55)] backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:bg-primary/10 hover:text-primary/90"
              asChild
            >
              <a href="/cv.html" download="Abderrahmane_ErRaqabi_CV.html">
                <Download className="h-5 w-5" />
                Download CV
              </a>
            </Button>
          </div>

          <div className="mt-5 flex justify-center pb-10">
            <button
              type="button"
              onClick={() => scrollToSection("about")}
              aria-label="Scroll to About section"
              className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-[var(--section-border)] bg-[var(--section-surface)] text-muted-foreground transition-all duration-300 hover:border-primary/60 hover:text-primary"
            >
              <ArrowDown className="h-5 w-5 animate-bounce" />
            </button>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
