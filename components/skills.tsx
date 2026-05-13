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
        <h2 className="text-center section-title">Skills & Expertise</h2>
        <div className="mx-auto mt-4 mb-10 h-0.5 w-24 bg-[linear-gradient(90deg,transparent,rgba(95,176,255,0.22),rgba(139,124,255,0.2),transparent)]" />
        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 lg:grid-cols-12">
          {skillCategories.map((category, index) => (
            <Card key={index} className={index === 0 || index === 2 ? "lg:col-span-7" : "lg:col-span-5"}>
              <CardContent className="p-6">
                <div className="mb-4 flex items-center gap-3">
                  <div className="rounded-xl border border-[var(--section-border)] bg-[rgba(255,255,255,0.05)] p-2 text-primary">
                    <category.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">{category.title}</h3>
                </div>
                <div className="flex flex-wrap gap-2.5">
                  {category.skills.map((skill, skillIndex) => (
                    <span
                      key={skillIndex}
                      className="inline-flex items-center rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.06)] px-3.5 py-1.5 text-sm font-medium tracking-wide text-foreground/80 transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/35 hover:bg-[rgba(95,176,255,0.08)] hover:text-foreground"
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
