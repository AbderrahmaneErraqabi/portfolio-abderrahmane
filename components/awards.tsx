import { Card, CardContent } from "@/components/ui/card"
import { Award, Shield } from "lucide-react"

import { SectionWrapper } from "./section-wrapper"

const certifications = [
  {
    title: "Techniques de réanimation respiratoire",
    description: "CPR / First Aid Certification",
    year: "2025",
    icon: Award,
  },
  {
    title: "SIMDUT",
    description: "Système d'information sur les matières dangereuses utilisées au travail",
    year: "2025",
    icon: Shield,
  },
]

export function Awards() {
  return (
    <SectionWrapper id="awards" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-[linear-gradient(120deg,#0f172a,#1d4ed8_55%,#1e293b)] drop-shadow-[0_8px_18px_rgba(29,78,216,0.22)]">
          Awards & Certifications
        </h2>
        <div className="mx-auto mt-3 mb-10 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-6 md:grid-cols-2">
          {certifications.map((cert, index) => (
            <Card
              key={index}
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
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
