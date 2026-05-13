import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Car, LineChart } from "lucide-react"

const experiences = [
  {
    year: "2026 — Present",
    title: "VP External Relations — Google Developers Group Polytechnique Montréal",
    description:
      "Lead communications with companies and partners, manage external relationships, coordinate sponsorships, and help organize technical events, workshops, and networking sessions connecting industry professionals with the student developer community.",
    icon: Briefcase,
  },  
  {
    year: "2025 — Present",
    title: "Wiring Team — Esteban Solar Car Team",
    description:
      "Design and implementation of the electrical network of the Esteban solar car, including harness routing, high and low voltage wiring, and integration of control and safety subsystems.",
    icon: Car,
  },
  {
    year: "2023 — Present",
    title: "Sales Manager — SoftMoc",
    description:
      "Team supervision and performance monitoring to optimize sales and customer experience. Implemented loyalty-focused initiatives and managed operations in a high-volume retail environment.",
    icon: LineChart,
  },
  {
    year: "2021 — 2023",
    title: "Keyholder — Bopied",
    description:
      "Responsible for customer service, order management, and inventory operations. Contributed to training new employees and maintaining an efficient and welcoming store environment.",
    icon: Briefcase,
  },
]

import { SectionWrapper } from "./section-wrapper"

export function Experience() {
  return (
    <SectionWrapper id="experience" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center section-title">Experience Timeline</h2>
        <div className="mx-auto mt-4 mb-10 h-0.5 w-24 bg-[linear-gradient(90deg,transparent,rgba(95,176,255,0.2),rgba(139,124,255,0.18),transparent)]" />
        <div className="mx-auto max-w-4xl">
          <div className="relative grid gap-6">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-[linear-gradient(180deg,transparent,rgba(95,176,255,0.22),rgba(139,124,255,0.2),transparent)] md:block" />
            {experiences.map((exp, index) => (
              <div key={index} className="flex items-start gap-5 md:gap-6 md:pl-10">
                <div className="relative z-10 mt-2 flex h-12 w-12 items-center justify-center rounded-2xl border border-[var(--section-border)] bg-[rgba(255,255,255,0.05)] shadow-[var(--shadow-sm)] backdrop-blur-xl">
                  <exp.icon className="h-6 w-6 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{exp.year}</div>
                  <Card className="transition-all duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-foreground">{exp.title}</h3>
                      <p className="mt-2 text-muted-foreground leading-relaxed">{exp.description}</p>
                    </CardContent>
                  </Card>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
