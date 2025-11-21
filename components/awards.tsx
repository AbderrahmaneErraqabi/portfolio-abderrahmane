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
  },
  {
    title: "WHMIS 2015",
    description: "Workplace safety and chemical handling training",
    year: "2025",
    icon: Shield,
  },
  {
    title: "Cloud Computing Security",
    description: "Certification focused on securing cloud environments and mitigating modern threats",
    year: "2025",
    icon: Shield,
    link: "/Cloud%20Computing%20Security.pdf",
  },
]

export function Awards() {
  const [activePdf, setActivePdf] = useState<string | null>(null)

  return (
    <SectionWrapper id="awards" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-[linear-gradient(120deg,#0f172a,#1d4ed8_55%,#1e293b)] drop-shadow-[0_8px_18px_rgba(29,78,216,0.22)]">
          Awards & Certifications
        </h2>
        <div className="mx-auto mt-3 mb-10 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => {
            const card = (
              <Card
                className="futuristic-card border border-[var(--section-border)] bg-[var(--section-surface)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_25px_60px_-45px_rgba(94,177,255,0.85)]"
              >
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <div className="rounded-lg bg-primary/15 p-3 text-primary">
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
                  onClick={() => setActivePdf(cert.link!)}
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

      {activePdf && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setActivePdf(null)}>
          <div
            className="relative w-full max-w-6xl overflow-hidden rounded-2xl bg-background shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between border-b border-[var(--section-border)] px-4 py-3">
              <div className="text-sm font-semibold text-foreground">Cloud Computing Security (PDF)</div>
              <button
                type="button"
                onClick={() => setActivePdf(null)}
                className="rounded-md px-3 py-1 text-sm font-medium text-muted-foreground hover:bg-muted hover:text-foreground"
              >
                Close
              </button>
            </div>
            <div className="h-[80vh] bg-muted sm:h-[85vh]">
              <iframe
                src={activePdf}
                title="Cloud Computing Security"
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
