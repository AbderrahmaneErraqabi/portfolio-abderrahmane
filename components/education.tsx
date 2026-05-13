import { Card, CardContent } from "@/components/ui/card"
import { Book } from "lucide-react"

import { SectionWrapper } from "./section-wrapper"

const education = [
  {
    year: "2025 — Present",
    title: "Bachelor of Electrical Engineering, Polytechnique Montréal, Canada",
    description:
      "Embedded systems and electronic design. Member of Mr. Ban Solar Car Team, VP of External Relations at GDG Polytechnique Montréal.",
    icon: Book,
  },
  {
    year: "2023 — 2025",
    title: "Diploma of College Studies (DEC) in Natural Science, Collège Bois de Boulogne, Québec",
    description:
      "Science profile focused on physics, chemistry, and advanced mathematics. Tutored peers in these subjects.",
    icon: Book,
  },
]

export function Education() {
  return (
    <SectionWrapper id="education" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center section-title">Education</h2>
        <div className="mx-auto mt-4 mb-10 h-0.5 w-32 bg-[linear-gradient(90deg,transparent,rgba(95,176,255,0.35),rgba(139,124,255,0.28),transparent)]" />
        <div className="mx-auto max-w-4xl">
          <div className="relative grid gap-6">
            <div className="absolute left-6 top-0 hidden h-full w-px bg-[linear-gradient(180deg,transparent,rgba(95,176,255,0.22),rgba(139,124,255,0.2),transparent)] md:block" />
            {education.map((edu, index) => (
              <div key={index} className="flex items-start gap-5 md:gap-6 md:pl-10">
                <div className="relative z-10 mt-2 flex h-14 w-14 items-center justify-center rounded-2xl border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] shadow-[var(--shadow-md)] md:h-16 md:w-16">
                  <edu.icon className="h-7 w-7 text-primary" />
                </div>
                <div className="flex-1">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">{edu.year}</div>
                  <Card className="transition-all duration-300 border-[1px] border-[rgba(255,255,255,0.02)] bg-[rgba(8,12,18,0.6)] shadow-[0_10px_30px_-18px_rgba(5,8,15,0.6)]">
                    <CardContent className="p-6 md:p-8">
                      <h3 className="text-lg md:text-xl font-semibold text-foreground">{edu.title}</h3>
                      <p className="mt-3 text-muted-foreground leading-relaxed">{edu.description}</p>
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
