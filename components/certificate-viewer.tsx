"use client"

import { useEffect, useRef, useState } from "react"

type CertificateViewerProps = {
  title: string
  issuer: string
  year: string
  previewUrl: string
}

export function CertificateViewer({ title, issuer, year, previewUrl }: CertificateViewerProps) {
  const [open, setOpen] = useState(false)
  const [expanded, setExpanded] = useState(false)
  const [loaded, setLoaded] = useState(false)
  const [failed, setFailed] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const wasOpen = useRef(false)
  const dialogRef = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!open) {
      if (wasOpen.current) triggerRef.current?.focus({ preventScroll: true })
      wasOpen.current = false
      return
    }
    wasOpen.current = true
    const previousOverflow = window.document.body.style.overflow
    window.document.body.style.overflow = "hidden"
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false)
      if (event.key !== "Tab" || !dialogRef.current) return
      const focusable = [...dialogRef.current.querySelectorAll<HTMLElement>("button, [href], input, textarea, select, [tabindex]:not([tabindex='-1'])")]
      if (!focusable.length) return
      const first = focusable[0]
      const last = focusable[focusable.length - 1]
      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault()
        last.focus()
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault()
        first.focus()
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => {
      window.document.body.style.overflow = previousOverflow
      window.removeEventListener("keydown", handleKeyDown)
    }
  }, [open])

  return <>
    <button ref={triggerRef} type="button" className="project-action" onClick={() => setOpen(true)}>
      View certificate preview <span>↗</span>
    </button>
    {open && <div className="certificate-backdrop" role="presentation" onMouseDown={(event) => {
      if (event.target === event.currentTarget) setOpen(false)
    }}>
      <section ref={dialogRef} className={`certificate-dialog ${expanded ? "certificate-dialog-expanded" : ""}`} role="dialog" aria-modal="true" aria-labelledby={`${title}-certificate-title`}>
        <header className="certificate-dialog-header">
          <div>
            <h2 id={`${title}-certificate-title`}>{title}</h2>
            <p>{issuer} · {year}</p>
          </div>
          <div className="certificate-dialog-actions">
            <button type="button" onClick={() => setExpanded((value) => !value)}>{expanded ? "Restore" : "Expand"}</button>
            <button type="button" aria-label="Close certificate viewer" onClick={() => setOpen(false)}>Close</button>
          </div>
        </header>
        <div className="certificate-frame">
          {!loaded && !failed && <p className="certificate-loading">Loading certificate preview…</p>}
          {!failed && <img src={previewUrl} alt={`${title} certificate preview`} onLoad={() => setLoaded(true)} onError={() => setFailed(true)} />}
          {failed && <p className="certificate-fallback">Preview unavailable. <button type="button" onClick={() => { setFailed(false); setLoaded(false) }}>Retry</button> or Close.</p>}
        </div>
      </section>
    </div>}
  </>
}
