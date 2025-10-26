import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Github, ExternalLink } from "lucide-react"

const projects = [
  {
    title: "Solar Car Wiring System",
    description:
      "Designed and implemented wiring harness for the Esteban Solar Car team, integrating embedded systems for optimal power distribution.",
    tags: ["Embedded Systems", "KiCad", "Power Electronics"],
    github: "#",
    demo: "https://esteban.polymtl.ca",
  },
  {
    title: "Mini-SPICE DC Circuit Solver",
    description:
      "Built a C++ circuit analysis tool that solves DC circuits using nodal analysis and matrix operations.",
    tags: ["C++", "Circuit Analysis", "Algorithms"],
    github: "https://github.com/AbderrahmaneErraqabi/mini-spice-dc",
    demo: "https://github.com/AbderrahmaneErraqabi/mini-spice-dc",
  },
  {
    title: "Automation System with Flip-Flops",
    description: "Designed an automation system using flip-flops and 7-segment displays for sequential logic control.",
    tags: ["Digital Logic", "VHDL", "Hardware Design"],
    github: "#",
    demo: "#",
  },
  {
    title: "Image Processing & Pixel Manipulation Tool",
    description: "Developed a C++ image processor that performs grayscale conversion, brightness adjustment, and pixel filtering.",
    tags: ["C++", "Image Processing", "Algorithms"],
    github: "https://github.com/AbderrahmaneErraqabi/Image-processor",
    demo: "https://github.com/AbderrahmaneErraqabi/Image-processor",
  },
  {
    title: "Personal Investing Dashboard",
    description: "Interactive dashboard for tracking investments and visualizing market data with real-time analysis.",
    tags: ["Finance", "Data Visualization", "Python"],
    github: "#",
    demo: "#",
  },
]

import { SectionWrapper } from "./section-wrapper"

export function Projects() {
  return (
    <SectionWrapper id="projects" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="mb-4 text-center text-4xl font-bold text-[var(--electric-blue)]">Projects</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          A collection of my engineering and software projects, showcasing my skills in embedded systems, circuit
          design, and software development.
        </p>
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="futuristic-card group border border-[var(--section-border)] bg-[var(--section-surface)] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_25px_65px_-45px_rgba(94,177,255,0.85)]"
            >
              <CardHeader>
                <CardTitle className="transition-colors group-hover:text-primary">{project.title}</CardTitle>
                <CardDescription className="leading-relaxed text-muted-foreground">{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tags.map((tag, tagIndex) => (
                    <span
                      key={tagIndex}
                      className="rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1 gap-2 border-[var(--section-border)] bg-transparent text-foreground hover:border-primary/50 hover:bg-primary/10"
                    asChild
                  >
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github className="h-4 w-4" />
                      GitHub
                    </a>
                  </Button>
                  <Button
                    size="sm"
                    className="flex-1 gap-2 bg-[linear-gradient(135deg,#3f8cff,#72d6ff)] text-slate-950 shadow-[0_18px_55px_-30px_rgba(94,177,255,0.9)] hover:-translate-y-0.5"
                    asChild
                  >
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink className="h-4 w-4" />
                      Details
                    </a>
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </SectionWrapper>
  )
}
