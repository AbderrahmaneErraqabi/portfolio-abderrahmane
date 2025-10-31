import { Card, CardContent } from "@/components/ui/card"
import { Code2, Wrench, Cpu, TrendingUp } from "lucide-react"

const skillCategories = [
  {
    title: "Programming Languages",
    icon: Code2,
    skills: ["C++", "Python", "Rust", "C", "MATLAB", "JavaScript", "TypeScript", "HTML", "CSS"],
  },
  {
    title: "Tools & Frameworks",
    icon: Wrench,
    skills: ["KiCad", "AutoCAD Electrical", "Git", "VS Code", "React", "Next.js", "Tailwind CSS", "Arduino", "STM32", "PlatformIO"],
  },
  {
    title: "Engineering & Concepts",
    icon: Cpu,
    skills: ["Embedded Systems", "PCB Design", "Power Electronics", "Control Systems", "Wiring harness design", "Circuit design and simulation"],
  },
  {
    title: "Other Interests",
    icon: TrendingUp,
    skills: ["Finance", "Trading", "Market Analysis", "Data Visualization"],
  },
]

import { SectionWrapper } from "./section-wrapper"

export function Skills() {
  return (
    <SectionWrapper id="skills" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-[var(--electric-blue)]">Skills & Expertise</h2>
        <div className="mx-auto mt-3 mb-10 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className="futuristic-card animate-fade-in-up border border-[var(--section-border)] bg-[var(--section-surface)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_25px_65px_-50px_rgba(94,177,255,0.85)]"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="rounded-lg bg-primary/15 p-2 text-primary">
                    <category.icon className="h-6 w-6" />
                  </div>
                  <h3 className="text-xl font-bold">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="rounded-md border border-primary/20 bg-primary/5 px-3 py-1.5 text-sm font-medium text-primary transition-colors hover:border-primary/50 hover:bg-primary/10 hover:text-primary"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
