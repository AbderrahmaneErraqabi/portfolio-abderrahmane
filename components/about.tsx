import { Card, CardContent } from "@/components/ui/card"

import { SectionWrapper } from "./section-wrapper"

export function About() {
  return (
    <SectionWrapper id="about" className="py-20" style={{ background: 'var(--section-alt)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-[linear-gradient(120deg,#0f172a,#1d4ed8_55%,#1e293b)] drop-shadow-[0_8px_18px_rgba(29,78,216,0.22)]">
          About Me
        </h2>
        <div className="mx-auto mt-3 mb-8 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <Card className="futuristic-card mx-auto max-w-4xl border border-[var(--section-border)] bg-[var(--section-surface)] backdrop-blur-xl shadow-[0_30px_85px_-60px_rgba(94,177,255,0.8)]">
          <CardContent className="p-8">
            <div className="flex flex-col items-center gap-10 md:flex-row">
              <div className="relative h-[420px] w-full overflow-hidden rounded-xl ring-2 ring-primary/30 transition-transform duration-500 hover:scale-[1.03] md:w-[300px]">
                <img
                  src="/imageabout.png"
                  alt="Abderrahmane Er-Raqabi"
                  className="h-full w-full scale-[1.55] object-cover"
                  style={{ objectPosition: "35% 25%" }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#040611ee] via-transparent to-transparent" />
              </div>
              <div className="flex-1 text-center md:text-left">
                <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  I'm a hands-on, creative electrical engineering student at Polytechnique Montréal with a passion for
                  AI, embedded systems, circuit design, and automation. I thrive on solving complex technical challenges
                  and bringing innovative ideas to life
                </p>
                <p className="mb-4 text-lg leading-relaxed text-muted-foreground">
                  As a member of the <span className="font-semibold text-primary">Esteban Solar Car team</span>, I work
                  on wiring harness design and embedded systems integration, contributing to sustainable transportation
                  solutions.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  Beyond engineering, I'm deeply interested in finance, investing, and market analysis, exploring the
                  intersection of technology and financial systems.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </SectionWrapper>
  )
}
