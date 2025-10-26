"use client"

import { useEffect } from 'react'

export function useSectionAnimation() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('section-visible')
          }
        })
      },
      {
        threshold: 0.1, // Trigger when 10% of the section is visible
        rootMargin: '0px'
      }
    )

    // Observe all sections
    document.querySelectorAll('section').forEach((section) => {
      section.classList.add('section-animate')
      observer.observe(section)
    })

    // Cleanup
    return () => observer.disconnect()
  }, [])
}