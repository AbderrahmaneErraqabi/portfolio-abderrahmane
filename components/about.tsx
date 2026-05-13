import { Card, CardContent } from "@/components/ui/card"

import { SectionWrapper } from "./section-wrapper"

export function About() {
  return (
    <SectionWrapper id="about" className="py-20" style={{ background: 'var(--section-alt)' }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center section-title">About Me</h2>
        <div className="mx-auto mt-4 mb-8 h-0.5 w-24 bg-[linear-gradient(90deg,transparent,rgba(95,176,255,0.22),rgba(139,124,255,0.18),transparent)]" />
        <Card className="mx-auto max-w-6xl">
          <CardContent className="p-8 md:p-10">
            <div className="grid items-center gap-10 lg:grid-cols-[0.92fr_1.08fr] lg:gap-12">
              <div className="relative overflow-hidden rounded-[2rem] border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] p-4 shadow-[var(--shadow-sm)]">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(95,176,255,0.14),transparent_40%),radial-gradient(circle_at_80%_10%,rgba(139,124,255,0.12),transparent_26%)]" />
                <div className="relative aspect-[3.5/5] overflow-hidden rounded-[1.5rem]">
                  <img
                    src="/imageabout.png"
                    alt="Abderrahmane Er-Raqabi"
                    className="h-full w-full scale-[1.2] object-cover transition-transform duration-700 hover:scale-[1.28]"
                    style={{ objectPosition: "35% 25%" }}
                  />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(8,12,20,0.16)_60%,rgba(8,12,20,0.4))]" />
                </div>
              </div>

              <div className="space-y-5 text-center lg:text-left">
                <div className="flex flex-wrap justify-center gap-2 lg:justify-start">
                  {['Embedded Systems', 'Power Electronics', 'Intelligent Hardware'].map((item) => (
                    <span key={item} className="rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.05)] px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground backdrop-blur-xl hover:bg-[rgba(255,255,255,0.08)] transition-colors">
                      {item}
                    </span>
                  ))}
                </div>

                <p className="text-lg leading-relaxed text-muted-foreground">
                  I'm a hands-on, creative electrical engineering student at Polytechnique Montréal with a passion for
                  AI, embedded systems and circuit design. I thrive on solving complex technical challenges
                  and bringing innovative ideas to life
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
                  As a member of the <span className="font-semibold text-primary">Esteban Solar Car team</span>, I am involved in wiring harness design and embedded systems integration, helping translate innovative engineering concepts into reliable sustainable transportation systems.
                </p>
                <p className="text-lg leading-relaxed text-muted-foreground">
  I currently serve as <span className="font-semibold text-primary">Vice President of External Relations</span> at the
  <span className="font-semibold text-primary"> Google Developers Group Polytechnique Montréal</span>, where I oversee
  strategic partnerships and external collaborations, and contribute to the organization of high impact technical
  events that connect academia with industry.</p>
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
