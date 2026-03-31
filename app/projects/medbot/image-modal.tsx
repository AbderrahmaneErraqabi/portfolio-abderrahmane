"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { ZoomIn, X } from "lucide-react"

type ZoomableImageModalProps = {
  src: string
  alt: string
  title: string
  caption?: string
}

export function ZoomableImageModal({ src, alt, title, caption }: ZoomableImageModalProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)

  useEffect(() => {
    if (!isOpen) {
      return
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setIsOpen(false)
      }
    }

    document.addEventListener("keydown", handleKeyDown)

    return () => {
      document.removeEventListener("keydown", handleKeyDown)
    }
  }, [isOpen])

  return (
    <figure className="overflow-hidden rounded-2xl border border-primary/20 bg-primary/5">
      <button
        type="button"
        className="relative block w-full cursor-zoom-in group"
        onClick={() => {
          setScale(1)
          setIsOpen(true)
        }}
      >
        <Image
          src={src}
          alt={alt}
          width={1400}
          height={900}
          className="h-auto w-full object-cover"
        />
        <span className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition duration-200 group-hover:opacity-100">
          <ZoomIn className="h-8 w-8 text-white" />
        </span>
      </button>

      {caption ? <figcaption className="p-4 text-center text-sm text-muted-foreground">{caption}</figcaption> : null}

      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4" onClick={() => setIsOpen(false)}>
          <div className="relative flex h-[90vh] w-[96vw] max-w-screen-2xl flex-col overflow-hidden rounded-2xl border border-primary/20 bg-background" onClick={(e) => e.stopPropagation()}>
            <button
              type="button"
              onClick={() => setIsOpen(false)}
              className="absolute right-4 top-4 z-50 rounded-md bg-black/60 p-2 text-white hover:bg-black/70"
              aria-label="Close image viewer"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="border-b border-primary/20 p-4 pr-24">
              <h3 className="text-lg font-semibold text-foreground">{title}</h3>
              <p className="mt-1 text-xs text-muted-foreground">Use mouse wheel to zoom and drag scrollbars to pan. Press Esc to close.</p>
            </div>

            <div className="absolute right-4 top-16 z-50 flex gap-2">
              <button
                type="button"
                onClick={() => setScale((s) => Math.max(0.2, +(s - 0.1).toFixed(2)))}
                className="rounded-md bg-black/60 px-3 py-2 text-sm text-white hover:bg-black/70"
              >
                −
              </button>
              <button
                type="button"
                onClick={() => setScale(1)}
                className="rounded-md bg-black/60 px-3 py-2 text-sm text-white hover:bg-black/70"
              >
                Reset
              </button>
              <button
                type="button"
                onClick={() => setScale((s) => Math.min(5, +(s + 0.1).toFixed(2)))}
                className="rounded-md bg-black/60 px-3 py-2 text-sm text-white hover:bg-black/70"
              >
                +
              </button>
              <div className="rounded-md bg-black/60 px-3 py-2 text-sm text-white">{Math.round(scale * 100)}%</div>
            </div>

            <div
              onClick={(e) => e.stopPropagation()}
              onWheel={(e) => {
                e.preventDefault()
                const delta = e.deltaY
                setScale((s) => {
                  const next = delta < 0 ? +(s * 1.06).toFixed(3) : +(s / 1.06).toFixed(3)
                  return Math.min(5, Math.max(0.2, next))
                })
              }}
              className="flex h-full w-full items-center justify-center overflow-auto bg-black/20 p-6"
            >
              <div style={{ transform: `scale(${scale})`, transformOrigin: "center", transition: "transform 120ms ease" }}>
                <Image src={src} alt={alt} width={1800} height={1200} className="h-auto w-auto max-w-none rounded-lg" priority />
              </div>
            </div>
          </div>
        </div>
      )}
    </figure>
  )
}
