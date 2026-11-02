"use client"

import Image from "next/image"
import { useEffect, useState } from "react"
import type React from "react"
import { CV_DOWNLOAD_NAME, CV_URL, PORTRAIT_URL, certifications, education, experience, projects, skillGroups, technologyColor } from "@/lib/portfolio-data"
import { Logo } from "@/components/logo"
import { CertificateViewer } from "@/components/certificate-viewer"

function Section({ id, eyebrow, title, children }: { id: string; eyebrow: string; title: string; children: React.ReactNode }) {
  return <section id={id} className="site-section reveal-on-scroll"><div className="section-inner"><p className="eyebrow">{eyebrow}</p><h2>{title}</h2>{children}</div></section>
}

function TechnologyLabels({ items }: { items: string[] }) {
  return <div className="tag-row">{items.map((item) => <span className={`tech-label tech-${technologyColor(item)}`} key={item}>{item}</span>)}</div>
}

function ExperienceEntry({ item }: { item: (typeof experience)[number] }) {
  return <article className="experience-entry reveal-on-scroll">
    <span className="timeline-marker" aria-hidden="true" />
    <time>{item.date}</time>
    <div className="experience-content">
      <p className="org">{item.organization}</p>
      <h3>{item.role}</h3>
      <p>{item.description}</p>
      <TechnologyLabels items={item.technologies} />
      {item.project && <a className="project-action" href={item.project}>Related project <span>↗</span></a>}
    </div>
  </article>
}

type IntroPhase = "black" | "header" | "post" | "resources" | "complete" | "ready"

function Intro({ onSkip, onStart }: { onSkip: () => void; onStart: () => void }) {
  const [phase, setPhase] = useState<IntroPhase>("black")
  const [resourceFrame, setResourceFrame] = useState(0)
  const reducedMotion = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  useEffect(() => {
    if (reducedMotion) { setPhase("ready"); return }
    const timers = [
      window.setTimeout(() => setPhase("header"), 80),
      window.setTimeout(() => setPhase("post"), 650),
      window.setTimeout(() => setPhase("resources"), 1500),
      window.setTimeout(() => setResourceFrame(1), 1640),
      window.setTimeout(() => setResourceFrame(2), 1780),
      window.setTimeout(() => setResourceFrame(3), 1920),
      window.setTimeout(() => setResourceFrame(4), 2300),
      window.setTimeout(() => setResourceFrame(5), 2450),
      window.setTimeout(() => setResourceFrame(6), 2750),
      window.setTimeout(() => setPhase("complete"), 3800),
      window.setTimeout(() => setPhase("ready"), 4400),
    ]
    return () => timers.forEach(window.clearTimeout)
  }, [])
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => { if (event.key === "Escape") onSkip(); if (event.key === "Enter" && phase === "ready") onStart() }
    window.addEventListener("keydown", handleKey)
    return () => window.removeEventListener("keydown", handleKey)
  }, [onSkip, onStart, phase])
  const postLines = ["memory controller", "CMOS configuration", "PCI devices", "USB controller", "video initialization"]
  const resources = ["display font", "body font", "portrait", "project index", "navigation", "contact links"]
  return <div className="bios bios-screen" role="dialog" aria-label="Portfolio introduction">
    <button className="bios-skip" onClick={onSkip}>Skip intro <span>Esc</span></button>
    <div className="bios-console">
      <div className="bios-content">
      {phase !== "black" && phase !== "ready" && <><div className="bios-header"><div><p>Er-Raqabi</p><p>/ Abderrahmane</p></div><div><p>System BIOS</p><p>Personal Computer Startup</p></div></div><p className="bios-description">PC-compatible system initialization.</p><p>Power-On Self-Test (POST)</p><p className="bios-muted">Memory initialization complete.</p></>}
      {phase === "post" && <div className="post-table">{postLines.map((line) => <div className="post-row visible" key={line}><span>{line}</span><span>OK</span></div>)}</div>}
      {phase === "resources" && <div className="bios-resources"><strong>LOADING RESOURCES ({resourceFrame}/{resources.length})</strong>{resources.slice(Math.max(0, resourceFrame - 8), resourceFrame).map((resource, index) => { const completed = Math.max(0, resourceFrame - 8) + index + 1; return <span key={resource}>Loaded {resource.padEnd(18, ".")} {Math.round(100 * completed / resources.length)}%</span> })}<span className="bios-cursor">_</span></div>}
      {phase === "complete" && <div className="bios-resources"><strong>FINISHED LOADING RESOURCES (6/6) 100%</strong><span>Launching Abderrahmane Er-Raqabi portfolio</span><span className="bios-cursor">_</span></div>}
      {phase === "ready" && <div className="bios-ready"><strong>Abderrahmane Er-Raqabi — Portfolio</strong><span className="boot-prompt">Click START or press ENTER to begin.</span><button autoFocus onClick={onStart}>START</button></div>}
      </div>
    </div>
    <div className="bios-footer">ESC to skip intro · {new Date().toLocaleDateString("en-CA")}</div>
  </div>
}

export function PortfolioHome() {
  const [intro, setIntro] = useState<boolean | null>(null)
  const [mode, setMode] = useState<"browsing" | "preparing" | "entering">("browsing")
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "", website: "" })
  const [contactStatus, setContactStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [contactError, setContactError] = useState("")
  useEffect(() => { setIntro(window.location.hash ? false : !sessionStorage.getItem("portfolio-intro-v2")) }, [])
  useEffect(() => {
    const revealSections = () => document.querySelectorAll<HTMLElement>(".reveal-on-scroll:not(.is-visible)").forEach((section) => section.classList.add("is-visible"))
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => entry.isIntersecting && entry.target.classList.add("is-visible")), { threshold: .12 })
    document.querySelectorAll(".reveal-on-scroll").forEach((section) => observer.observe(section))
    revealSections()
    return () => observer.disconnect()
  }, [])
  const prepareHero = (animate: boolean) => {
    const previousRestoration = window.history.scrollRestoration
    window.history.scrollRestoration = "manual"
    const hero = document.getElementById("hero")
    window.history.replaceState(window.history.state, "", `${window.location.pathname}${window.location.search}#hero`)
    window.scrollTo({ top: hero?.offsetTop ?? 0, behavior: "instant" as ScrollBehavior })
    document.documentElement.scrollTop = hero?.offsetTop ?? 0
    document.body.scrollTop = hero?.offsetTop ?? 0
    if (animate && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setMode("preparing")
      requestAnimationFrame(() => {
        setIntro(false)
        setMode("entering")
        window.dispatchEvent(new Event("hero-reveal"))
      })
    } else {
      setIntro(false)
      setMode("browsing")
      window.history.scrollRestoration = previousRestoration
    }
    return previousRestoration
  }
  const skipIntro = () => { sessionStorage.setItem("portfolio-intro-v2", "1"); prepareHero(false) }
  const startIntro = () => {
    sessionStorage.setItem("portfolio-intro-v2", "1")
    prepareHero(true)
  }
  const handleHeroAnimationEnd = (event: React.AnimationEvent<HTMLDivElement>) => {
    if (event.animationName !== "hero-zoom") return
    setMode("browsing")
    window.history.scrollRestoration = "auto"
  }
  const replayIntro = () => {
    sessionStorage.removeItem("portfolio-intro-v2")
    prepareHero(false)
    setMode("browsing")
    setIntro(true)
  }
  const submitContact = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (contactStatus === "sending") return
    setContactStatus("sending")
    setContactError("")
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(contactForm),
      })
      const result = await response.json() as { success?: boolean; error?: string }
      if (!response.ok || !result.success) throw new Error(result.error || "Unable to send your message.")
      setContactForm({ name: "", email: "", message: "", website: "" })
      setContactStatus("success")
    } catch (error) {
      setContactStatus("error")
      setContactError(error instanceof Error ? error.message : "Unable to send your message right now.")
    }
  }
  return <>{intro && <Intro onSkip={skipIntro} onStart={startIntro} />}
    <header className={`site-nav ${mode === "entering" || mode === "preparing" ? "nav-entering" : ""}`}><Logo /><nav>{["work", "experience", "skills", "about", "education", "certifications", "contact"].map((item) => <a key={item} href={`#${item}`}>{item}</a>)}<a className="nav-cv" href={CV_URL} download={CV_DOWNLOAD_NAME}>Download CV</a></nav></header>
    <main>
      <section id="hero" className="hero"><div className={`hero-group ${mode}`} onAnimationEnd={handleHeroAnimationEnd}><p className="eyebrow">Electrical Engineering Student</p><h1 tabIndex={-1}>Abderrahmane<br className="mobile-break" /> Er-Raqabi</h1><p className="hero-title">Polytechnique Montréal · Embedded systems, electronics, and hardware-software integration</p></div><a className={`scroll-cue ${mode}`} href="#work">Scroll to explore ↓</a></section>
      <Section id="work" eyebrow="01 / selected work" title="Selected projects"><div className="project-grid">{projects.map((project, index) => <article className={`project-card reveal-on-scroll ${index < 3 ? "featured" : ""}`} key={project.slug}><div className="project-meta"><span>{String(index + 1).padStart(2, "0")}</span><span>{project.status ?? project.date}</span></div><h3>{project.title}</h3><p>{project.summary}</p><TechnologyLabels items={project.technologies} /><a className="project-action" href={project.href}>View project <span>↗</span></a></article>)}</div></Section>
      <Section id="experience" eyebrow="02 / experience" title="Experience"><div className="experience-timeline">{experience.map((item) => <ExperienceEntry key={item.role} item={item} />)}</div></Section>
      <Section id="skills" eyebrow="03 / technical skills" title="Skills"><div className="skills-list">{skillGroups.map(([name, values]) => <div key={name}><h3>{name}</h3><TechnologyLabels items={values.split(" · ")} /></div>)}</div></Section>
      <Section id="about" eyebrow="04 / about" title="About"><div className="about-grid"><div className="portrait"><Image src={PORTRAIT_URL} alt="Portrait of Abderrahmane Er-Raqabi" fill sizes="(max-width: 700px) 100vw, 340px" /></div><div className="about-copy"><p>I&apos;m an electrical engineering student at Polytechnique Montréal. I like understanding a system all the way through: how a signal is acquired, how the electronics handle it, and how the software turns it into something useful.</p><p>My projects span embedded platforms, on-device computer vision, analog signal processing, and hardware prototypes. I&apos;m especially interested in the point where circuits and firmware meet, and in making the full system work together.</p><p>Alongside my studies, I contribute to the electronics and PCB work on Esteban&apos;s solar car and serve as VP External Relations at GDG Polytechnique Montréal.</p></div></div></Section>
      <Section id="education" eyebrow="05 / education" title="Education"><div className="education-list">{education.map(([date, title, institution]) => <article key={title}><time>{date}</time><div><h3>{title}</h3><p>{institution}</p></div></article>)}</div></Section>
      <Section id="certifications" eyebrow="06 / certifications" title="Certifications"><div className="certification-list">{certifications.map((cert) => <article key={cert.title}><div><h3>{cert.title}</h3><p>{cert.issuer} · {cert.year}</p></div>{cert.document && <CertificateViewer title={cert.title} issuer={cert.issuer} year={cert.year} previewUrl={cert.document} />}</article>)}</div></Section>
      <Section id="contact" eyebrow="07 / contact" title="Contact"><div className="contact-grid"><div className="contact-copy"><p>If you&apos;d like to discuss embedded systems, electronics, or a future collaboration, reach out by email or find me online.</p><div className="contact-links"><a href="mailto:abderrahmane.erraqabi@gmail.com">Email ↗</a><a href="https://github.com/AbderrahmaneErraqabi">GitHub ↗</a><a href="https://www.linkedin.com/in/abderrahmane-er-raqabi-7381b0354/">LinkedIn ↗</a><a href={CV_URL} download={CV_DOWNLOAD_NAME}>Download CV ↓</a></div></div><form className="contact-form" aria-label="Send a message" onSubmit={submitContact} aria-busy={contactStatus === "sending"}><div className="contact-form-header"><span>~/contact</span><span>NEW MESSAGE</span></div><div className="contact-form-body"><div className="contact-field contact-honeypot" aria-hidden="true"><label htmlFor="website">Website</label><input id="website" name="website" tabIndex={-1} autoComplete="off" value={contactForm.website} onChange={(event) => setContactForm({ ...contactForm, website: event.target.value })} /></div><div className="contact-fields-row"><div className="contact-field"><label htmlFor="contact-name">Name</label><input id="contact-name" name="name" autoComplete="name" required value={contactForm.name} onChange={(event) => setContactForm({ ...contactForm, name: event.target.value })} /></div><div className="contact-field"><label htmlFor="contact-email">Email</label><input id="contact-email" name="email" type="email" autoComplete="email" required value={contactForm.email} onChange={(event) => setContactForm({ ...contactForm, email: event.target.value })} /></div></div><div className="contact-field"><label htmlFor="contact-message">Message</label><textarea id="contact-message" name="message" required value={contactForm.message} onChange={(event) => setContactForm({ ...contactForm, message: event.target.value })} /></div><div className="contact-form-footer"><button className="contact-submit" type="submit" disabled={contactStatus === "sending"}><span className="contact-prompt" aria-hidden="true">&gt;</span>{contactStatus === "sending" ? "Sending…" : "Send message"}</button></div><div className={`contact-status ${contactStatus}`} role="status" aria-live="polite">{contactStatus === "success" ? "Message sent successfully." : contactStatus === "error" ? contactError : ""}</div></div></form></div></Section>
    </main>
    <div className="replay-wrap"><button className="text-link" onClick={replayIntro}>Replay intro</button></div>
  </>
}
