"use client";
import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield } from "lucide-react"

import { SectionWrapper } from "./section-wrapper"

const certifications = [
  {
    title: "Respiratory Protection Training",
    description: "Training on the safe use and maintenance of respiratory protective equipment",
    year: "2025",
    icon: Award,
    link: "/PolyMTL%20-%20Protections%20respiratoires%20-%20Abderrahmane%20Er-Raqabi%20-%202025-09-24.pdf",
  },
  {
    title: "WHMIS 2015",
    description: "Workplace safety and chemical handling training",
    year: "2025",
    icon: Shield,
    link: "/Attestations%20-%20SIMDUT%202015.pdf",
  },
  {
    title: "Cloud Computing Security",
    description: "Certification focused on securing cloud environments and mitigating modern threats",
    year: "2025",
    icon: Shield,
    link: "/Cloud%20Computing%20Security.pdf",
  },
  {
    title: "Introduction to Quantum Programming",
    description: "Certification in quantum programming fundamentals",
    year: "2025",
    icon: Award,
    link: "/Certification%20grover.pdf",
  },
  {
    title: "Quantum Programming: Grover’s Algorithm",
    description: "Certification focused on Grover’s search algorithm and practical quantum implementation concepts",
    year: "2025",
    icon: Award,
    link: "/Certification%20grover.pdf",
  },
  {
    title: "Battery Safety & IVI Training",
    description: "Training on battery safety, inspection, IVI procedures, and risk prevention for electrical energy storage systems",
    year: "2025",
    icon: Shield,
  }
]

export function Awards() {
  const [activeCert, setActiveCert] = useState<{ title: string; link: string } | null>(null)

  return (
    <SectionWrapper id="awards" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center section-title">Awards & Certifications</h2>
        <div className="mx-auto mt-3 mb-10 h-0.5 w-24 rounded-full bg-[linear-gradient(90deg,transparent,rgba(95,176,255,0.22),rgba(139,124,255,0.18),transparent)]" />
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => {
            const card = (
              <Card
                className="futuristic-card border border-[var(--section-border)] bg-[var(--section-surface)]/92 backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/40 hover:shadow-[0_25px_60px_-45px_rgba(95,176,255,0.55)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-2xl border border-[var(--section-border)] bg-[rgba(255,255,255,0.05)] p-3 text-primary backdrop-blur-xl">
                      <cert.icon className="h-8 w-8" />
                    </div>
                    <div className="flex-1">
                      <div className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary/80">{cert.year}</div>
                      <h3 className="text-lg font-bold text-foreground">{cert.title}</h3>
                      <p className="mt-2 text-sm text-muted-foreground">{cert.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            )

            if (cert.link) {
              return (
                <button
                  key={index}
                  type="button"
                  onClick={() => setActiveCert({ title: cert.title, link: cert.link! })}
                  className="h-full text-left"
                >
                  {card}
                </button>
              )
            }

            return (
              <div key={index} className="h-full">
                {card}
              </div>
            )
          })}
        </div>
      </div>

      {activeCert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4 backdrop-blur-md" onClick={() => setActiveCert(null)}>
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-[1.75rem] bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--section-border)] px-4 py-3">
              <div className="text-sm font-semibold text-foreground">{activeCert.title} (PDF)</div>
              <button
                type="button"
                onClick={() => setActiveCert(null)}
                className="rounded-md px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Close
              </button>
            </div>
            <div className="h-[80vh] bg-muted sm:h-[85vh]">
              <iframe
                src={activeCert.link}
                title={activeCert.title}
                className="h-full w-full border-0"
                allow="fullscreen"
              />
            </div>
          </div>
        </div>
      )}
    </SectionWrapper>
  )
}
