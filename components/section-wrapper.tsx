"use client"

import { useEffect, useRef, useState } from 'react'
import type { ReactNode } from 'react'

interface SectionWrapperProps {
  children: ReactNode
  id: string
  className?: string
  style?: React.CSSProperties
}

export function SectionWrapper({ children, id, className = "", style = {} }: SectionWrapperProps) {
  const sectionRef = useRef<HTMLElement>(null)
  useEffect(() => {
    // Keep simple: observe visibility but do not add classes or lock the page.
    const section = sectionRef.current
    if (!section) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          // No class toggles or document locks -> natural scroll behavior
          // We could update local state if other UI needs it, but avoid any forced transitions
        })
      },
      { threshold: 0.5, rootMargin: '-10% 0px' }
    )

    observer.observe(section)

    return () => observer.disconnect()
  }, [])

  return (
    <section ref={sectionRef} id={id} className={`relative isolate min-h-screen w-full snap-start overflow-hidden ${className}`} style={{ ...style }}>
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-tech-grid opacity-70" />
      <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(95,176,255,0.09),transparent_35%),radial-gradient(circle_at_85%_12%,rgba(139,124,255,0.08),transparent_28%),radial-gradient(circle_at_15%_88%,rgba(116,217,255,0.06),transparent_26%)] opacity-90" />
      <div aria-hidden className="pointer-events-none absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(95,176,255,0.28),rgba(139,124,255,0.22),transparent)]" />
      <div className="relative z-10">{children}</div>
    </section>
  )
}
