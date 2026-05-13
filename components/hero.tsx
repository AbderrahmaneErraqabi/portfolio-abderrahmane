"use client"

import { Button } from "@/components/ui/button"
import { ArrowDown, Download, FolderGit2, Cpu, Zap, Satellite } from "lucide-react"

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
      className="relative flex items-center justify-center pt-28 pb-16 md:pt-32"
      style={{ background: "var(--section-alt)" }}
    >
      <div className="container relative mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-[1.12fr_0.88fr] lg:gap-16">
          <div className="mx-auto max-w-3xl text-center lg:mx-0 lg:text-left animate-fade-in-up">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.05)] px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-xl">
              <span className="h-2.5 w-2.5 rounded-full bg-[var(--btn-accent)] shadow-[0_0_20px_rgba(95,176,255,0.65)]" />
              Electrical Engineering Student
            </div>
            <h1 className="text-balance text-5xl font-semibold tracking-[-0.035em] text-foreground md:text-7xl lg:text-[5.2rem]">
              <span className="block">Abderrahmane</span>
              <span className="hero-name-glow mt-1 block">Er-Raqabi</span>
            </h1>
            <div className="mt-5 h-px w-24 bg-[linear-gradient(90deg,rgba(95,176,255,0.85),rgba(139,124,255,0.62),transparent)]" />
            <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground md:text-xl lg:mx-0">
              Electrical Engineering Student at Polytechnique Montréal focused on embedded systems, automation, and
              intelligent power solutions.
            </p>
            <p className="mt-4 max-w-2xl text-lg font-medium text-[var(--primary)] md:text-xl">
              Designing smarter energy and intelligent control systems through a hands-on, systems-driven approach.
            </p>

            <div className="mt-9 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                onClick={() => scrollToSection("projects")}
                className="group flex w-full max-w-64 items-center justify-center gap-3 rounded-2xl px-8 py-3 text-sm font-semibold uppercase tracking-[0.08em] sm:w-auto"
              >
                <FolderGit2 className="h-4.5 w-4.5 transition-transform duration-300 group-hover:-translate-y-0.5 text-primary" />
                <span className="text-[var(--foreground)]">Explore Projects</span>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="gap-2 rounded-2xl px-7 text-base font-semibold"
                asChild
              >
                <a href="/api/download-cv" download="Abderrahmane_ErRaqabi_CV">
                  <Download className="h-5 w-5" />
                  Download CV
                </a>
              </Button>
            </div>

            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 lg:justify-start">
              {[
                { icon: Cpu, label: "Embedded Firmware" },
                { icon: Zap, label: "Power Electronics" },
                { icon: Satellite, label: "Control Systems" },
              ].map((item) => (
                <div
                  key={item.label}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-muted-foreground backdrop-blur-xl"
                >
                  <item.icon className="h-4 w-4 text-[var(--btn-accent)]" />
                  {item.label}
                </div>
              ))}
            </div>
          </div>

          <div className="relative mx-auto flex w-full max-w-2xl justify-center lg:justify-end">
            <div className="absolute -right-12 top-1/2 z-0 hidden transform -translate-y-1/2 rounded-full bg-[rgba(114,214,255,0.18)] blur-2xl shadow-[0_0_80px_rgba(95,176,255,0.22)] lg:block lg:h-72 lg:w-72" />
            <div className="absolute inset-0 -z-10 rounded-[2.5rem] bg-[radial-gradient(circle_at_30%_20%,rgba(95,176,255,0.28),transparent_28%),radial-gradient(circle_at_75%_20%,rgba(139,124,255,0.2),transparent_22%),radial-gradient(circle_at_50%_80%,rgba(116,217,255,0.14),transparent_32%)] blur-3xl animate-float-glow" />
            <div className="relative w-full overflow-hidden rounded-[2.5rem] border border-[var(--section-border)] bg-[rgba(10,14,23,0.35)] p-8 shadow-[var(--shadow-md)] backdrop-blur-2xl">
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.09),transparent_36%,rgba(95,176,255,0.09))]" />
              <div className="relative overflow-hidden rounded-[2rem] border border-primary/25 bg-[radial-gradient(circle_at_50%_25%,rgba(95,176,255,0.24),rgba(255,255,255,0.02)_40%,rgba(5,8,15,0.24)_100%)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(95,176,255,0.16),transparent_36%),radial-gradient(circle_at_80%_0%,rgba(139,124,255,0.14),transparent_24%)]" />
                <div className="relative flex items-center gap-8 border-b border-[var(--section-border)] p-8 sm:p-10">
                  <div className="relative">
                    <div className="absolute -inset-1 -z-10 rounded-2xl bg-[radial-gradient(circle_at_50%_30%,rgba(95,176,255,0.12),transparent_40%)] blur-sm lg:-inset-2" />
                    <div className="h-32 w-32 md:h-40 md:w-40 overflow-hidden rounded-2xl border-2 border-[rgba(95,176,255,0.12)] bg-[rgba(255,255,255,0.06)] shadow-[var(--shadow-md)]">
                      <img
                        src="/profile-photo.jpg"
                        alt="Abderrahmane Er-Raqabi"
                        className="h-full w-full object-cover"
                        style={{ objectPosition: "50% 22%" }}
                      />
                    </div>
                  </div>
                  <div>
                    <p className="text-xs uppercase tracking-[0.22em] text-muted-foreground/80">Professional Profile</p>
                    <p className="mt-3 text-xl md:text-2xl font-bold text-foreground">Bachelor of Electrical Engineering</p>
                    <p className="mt-2 text-sm md:text-base text-muted-foreground">Polytechnique Montréal — 2025 — Present</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-xs md:text-sm font-semibold text-muted-foreground backdrop-blur-sm hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                        <Cpu className="h-3.5 w-3.5 md:h-4 md:w-4 text-[var(--btn-accent)]" /> Embedded Firmware
                      </span>
                      <span className="inline-flex items-center gap-2 rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-3 py-1.5 text-xs md:text-sm font-semibold text-muted-foreground backdrop-blur-sm hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                        <Zap className="h-3.5 w-3.5 md:h-4 md:w-4 text-[var(--btn-accent)]" /> Power Electronics
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex justify-center pb-10 lg:justify-start">
          <button
            type="button"
            onClick={() => scrollToSection("about")}
            aria-label="Scroll to About section"
            className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.05)] text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/45 hover:text-primary hover:shadow-[var(--shadow-sm)] backdrop-blur-xl"
          >
            <ArrowDown className="h-4 w-4 animate-bounce" />
          </button>
        </div>
      </div>
    </SectionWrapper>
  )
}
