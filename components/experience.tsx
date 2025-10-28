import { Card, CardContent } from "@/components/ui/card"
import { Briefcase, Car, LineChart } from "lucide-react"

const experiences = [
  {
    year: "2025 — Present",
    title: "Équipe Esteban — Groupe câblage",
    description:
      "Participation à la conception et à l’implantation du réseau électrique de la voiture solaire Esteban, incluant le câblage, le routage des faisceaux et l’intégration des sous-systèmes de contrôle et de sécurité.",
    icon: Car,
  },
  {
    year: "2023 — Present",
    title: "Gestionnaire des ventes — Sofmoc",
    description:
      "Leadership d’équipe, suivi des indicateurs clés et initiatives ciblées pour stimuler les ventes et fidéliser la clientèle dans un environnement à haut volume.",
    icon: LineChart,
  },
  {
    year: "2021 — 2023",
    title: "Service à la clientèle — Bopied",
    description:
      "Conseil personnalisé, gestion des commandes et résolution proactive des demandes pour assurer une expérience client fluide et fidèle.",
    icon: Briefcase,
  },
]

import { SectionWrapper } from "./section-wrapper"

export function Experience() {
  return (
    <SectionWrapper id="experience" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-[linear-gradient(120deg,#0f172a,#1d4ed8_55%,#1e293b)] drop-shadow-[0_8px_18px_rgba(29,78,216,0.22)]">
          Experience Timeline
        </h2>
        <div className="mx-auto mt-3 mb-10 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="mx-auto max-w-4xl">
          <div className="relative pb-6 pt-4 md:pb-10">
            {/* Timeline Line */}
            <div
              className="pointer-events-none absolute left-8 top-6 bottom-6 w-[5px] -translate-x-1/2 transform rounded-full md:left-1/2 md:top-0 md:bottom-0"
              style={{
                background: "linear-gradient(180deg, rgba(40, 110, 255, 0.95) 0%, rgba(20, 78, 200, 0.4) 100%)",
                boxShadow: "0 0 20px rgba(20, 78, 200, 0.35)",
              }}
            />

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
                  <div className="absolute left-8 h-4 w-4 -translate-x-1/2 transform rounded-full border-4 border-[var(--section-surface)] bg-primary shadow-[0_0_25px_rgba(94,177,255,0.6)] md:left-1/2" />

                  {/* Content */}
                  <div className={`w-full pl-20 md:w-1/2 md:pl-0 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
                    <Card className="futuristic-card border border-[var(--section-border)] bg-[var(--section-surface)] backdrop-blur-xl transition-transform duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_25px_60px_-45px_rgba(94,177,255,0.9)]">
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
