"use client"

import React, { useEffect, useRef, useState } from "react"

export default function Footer() {
  const ref = useRef<HTMLElement | null>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setVisible(true)
        })
      },
      { threshold: 0.08 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // NOTE: replace the hrefs below with your real profile URLs
  const githubUrl = "https://github.com/abderrahmane"
  const linkedinUrl = "https://www.linkedin.com/in/abderrahmane"
  const twitterUrl = "https://twitter.com/abderrahmane"

  return (
    <footer
      ref={ref}
      className={`w-full border-t border-gray-200 bg-white/80 text-center py-6 print:hidden fade-up ${
        visible ? "visible" : ""
      }`}
    >
      <div className="max-w-4xl mx-auto px-4 text-sm text-gray-600">
        <div className="flex items-center justify-center space-x-4 mb-3">
          <a
            href={githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            className="text-gray-600 hover:text-gray-900 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M12 .5C5.73.5.5 5.73.5 12c0 5.08 3.29 9.36 7.86 10.87.58.11.79-.25.79-.56 0-.28-.01-1.02-.02-2-3.2.7-3.88-1.54-3.88-1.54-.53-1.35-1.3-1.71-1.3-1.71-1.06-.72.08-.7.08-.7 1.17.08 1.78 1.2 1.78 1.2 1.04 1.78 2.73 1.27 3.4.97.11-.76.41-1.27.75-1.56-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.3 1.18-3.11-.12-.29-.51-1.47.11-3.06 0 0 .96-.31 3.15 1.19a10.91 10.91 0 0 1 2.87-.39c.98.01 1.96.13 2.87.39 2.19-1.5 3.15-1.19 3.15-1.19.62 1.59.23 2.77.11 3.06.73.81 1.18 1.85 1.18 3.11 0 4.42-2.7 5.39-5.27 5.67.42.36.8 1.07.8 2.15 0 1.55-.01 2.8-.01 3.18 0 .31.21.68.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.73 18.27.5 12 .5z" />
            </svg>
          </a>

          <a
            href={linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            className="text-gray-600 hover:text-blue-700 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M4.98 3.5C4.98 4.88 3.86 6 2.48 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5zM.2 8h4.56v14H.2V8zm7.72 0h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V22H17.1v-6.5c0-1.55-.03-3.56-2.17-3.56-2.17 0-2.5 1.69-2.5 3.44V22H7.92V8z" />
            </svg>
          </a>

          <a
            href={twitterUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Twitter"
            className="text-gray-600 hover:text-sky-500 transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
              <path d="M23.44 4.83c-.77.34-1.6.57-2.46.67.89-.54 1.57-1.4 1.89-2.42-.83.49-1.75.85-2.72 1.05A4.15 4.15 0 0 0 16.11 3c-2.3 0-4.16 1.86-4.16 4.15 0 .33.04.65.11.95-3.46-.17-6.53-1.83-8.59-4.35-.36.62-.56 1.35-.56 2.12 0 1.46.74 2.75 1.86 3.5-.69-.02-1.34-.21-1.91-.52v.05c0 2.04 1.45 3.74 3.37 4.12-.35.1-.72.16-1.1.16-.27 0-.54-.03-.8-.08.54 1.69 2.1 2.92 3.95 2.95A8.33 8.33 0 0 1 1.56 19.2 11.75 11.75 0 0 0 7.29 21c7.55 0 11.68-6.26 11.68-11.69 0-.18-.01-.36-.02-.54.8-.58 1.5-1.3 2.06-2.12z" />
            </svg>
          </a>
        </div>

        <p>© {new Date().getFullYear()} Abderrahmane Er‑Raqabi. All rights reserved.</p>
        <p className="mt-2">Built with Next.js · Designed for smooth scrolling</p>
      </div>
    </footer>
  )
}
