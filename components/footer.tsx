"use client"

import React from "react"

export default function Footer() {
  return (
    <footer className="w-full border-t border-[var(--section-border)] bg-transparent py-8">
      <div className="max-w-6xl mx-auto px-4">
        <div className="mx-auto mb-6 h-1 w-44">
          <div className="accent-flow mx-auto rounded-full" aria-hidden />
        </div>

        <div className="grid gap-6 rounded-[1.75rem] border border-[var(--section-border)] bg-[var(--section-surface)]/88 px-6 py-6 shadow-[var(--shadow-sm)] backdrop-blur-2xl md:grid-cols-[1.1fr_0.9fr_0.9fr] md:items-center">
          <div>
            <div className="flex items-center gap-3">
              <div className="rounded-xl border border-[var(--section-border)] bg-[rgba(255,255,255,0.05)] px-3 py-2 text-sm font-semibold text-foreground">AE</div>
              <div>
                <div className="text-sm font-medium text-foreground">Abderrahmane Er‑Raqabi</div>
                <div className="text-sm text-muted-foreground">Electrical engineering, embedded systems, and AI hardware.</div>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-center">
            <a href="https://github.com/AbderrahmaneErraqabi" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary">GitHub</a>
            <a href="https://www.linkedin.com/in/abderrahmane-er-raqabi-7381b0354/" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary">LinkedIn</a>
            <a href="https://x.com/abderrtrades" target="_blank" rel="noopener noreferrer" className="rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary">Twitter</a>
          </div>

          <div className="flex flex-wrap gap-2 md:justify-end">
            <a href="/api/download-cv" className="rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary">Download CV</a>
            <a href="mailto:abderrahmane.erraqabi@gmail.com" className="rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-4 py-2 text-sm text-muted-foreground transition-all duration-300 hover:-translate-y-0.5 hover:text-primary">Contact</a>
          </div>
        </div>

        <div className="mt-4 text-center text-sm text-muted-foreground">© {new Date().getFullYear()} Abderrahmane Er-Raqabi. All rights reserved.</div>
      </div>
    </footer>
  )
}
