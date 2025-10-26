import { Card, CardContent } from "@/components/ui/card"
import { GraduationCap, Car } from "lucide-react"

const experiences = [
  {
    year: "2025",
    title: "Entered Polytechnique Montréal",
    description: "Started Electrical Engineering program",
    icon: GraduationCap,
  },
  {
    year: "2025",
    title: "Joined Esteban Solar Car Team",
    description: "Wiring & Embedded Systems Division",
    icon: Car,
  },
]

import { SectionWrapper } from "./section-wrapper"

export function Experience() {
  return (
    <SectionWrapper id="experience" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="mb-12 text-center text-4xl font-bold text-[var(--electric-blue)]">Experience Timeline</h2>
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-px bg-[var(--section-border)] md:left-1/2" />

            {/* Timeline Items */}
            <div className="space-y-12">
              {experiences.map((exp, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  } flex-row`}
                >
                  {/* Timeline Dot */}
                  <div className="absolute left-8 -ml-2 h-4 w-4 rounded-full border-4 border-[var(--section-surface)] bg-primary shadow-[0_0_25px_rgba(94,177,255,0.6)] md:left-1/2" />

                  {/* Content */}
                  <div className={`w-full pl-20 md:w-1/2 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <Card className="border border-[var(--section-border)] bg-[var(--section-surface)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_25px_60px_-45px_rgba(94,177,255,0.9)]">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="rounded-lg bg-primary/15 p-2 text-primary">
                            <exp.icon className="h-6 w-6" />
                          </div>
                          <div className="flex-1">
                            <div className="mb-1 text-sm font-semibold uppercase tracking-widest text-primary/80">
                              {exp.year}
                            </div>
                            <h3 className="text-xl font-bold text-foreground">{exp.title}</h3>
                            <p className="mt-2 text-muted-foreground">{exp.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
