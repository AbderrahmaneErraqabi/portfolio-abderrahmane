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
    <section ref={sectionRef} id={id} className={`min-h-screen w-full snap-start ${className}`} style={{ ...style }}>
      {children}
    </section>
  )
}
