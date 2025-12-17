"use client"

import Image from "next/image"
import { ZoomIn, X } from "lucide-react"
import { useState, useRef } from "react"

export function ImageZoomable() {
  const [isOpen, setIsOpen] = useState(false)
  const [scale, setScale] = useState(1)
  const containerRef = useRef<HTMLDivElement>(null)

  return (
    <figure className="overflow-hidden rounded-2xl border border-primary/20">
      <div 
        className="relative cursor-pointer group"
        onClick={() => setIsOpen(true)}
      >
        <Image
          src="/ele1001-circuit.jpg"
          alt="ELE1001 circuit breadboard layout"
          width={640}
          height={400}
          className="w-full max-w-[600px] h-auto object-contain mx-auto transition duration-200"
        />
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-200 bg-black/30">
          <ZoomIn className="w-8 h-8 text-white" />
        </div>
      </div>

      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
          <div className="relative w-[95vw] max-w-[1400px] h-[85vh] max-h-[95vh] bg-background rounded-lg border border-primary/20 overflow-hidden flex flex-col">
            {/* Close button */}
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-4 right-4 z-50 rounded-md bg-black/60 text-white p-2 hover:bg-black/70"
            >
              <X className="w-6 h-6" />
            </button>

            {/* Title */}
            <div className="p-4 border-b border-primary/20">
              <h2 className="text-xl font-semibold">Circuit Breadboard Layout</h2>
            </div>

            {/* Zoom controls */}
            <div className="absolute top-20 right-4 z-50 flex gap-2">
              <button
                onClick={() => setScale((s) => Math.max(0.2, +(s - 0.1).toFixed(2)))}
                className="rounded-md bg-black/60 text-white px-3 py-2 text-sm hover:bg-black/70"
              >−</button>
              <button
                onClick={() => setScale(1)}
                className="rounded-md bg-black/60 text-white px-3 py-2 text-sm hover:bg-black/70"
              >Reset</button>
              <button
                onClick={() => setScale((s) => Math.min(4, +(s + 0.1).toFixed(2)))}
                className="rounded-md bg-black/60 text-white px-3 py-2 text-sm hover:bg-black/70"
              >+</button>
            </div>

            {/* Image container */}
            <div
              ref={containerRef}
              onWheel={(e) => {
                e.preventDefault()
                const delta = e.deltaY
                setScale((s) => {
                  const next = delta < 0 ? +(s * 1.06).toFixed(3) : +(s / 1.06).toFixed(3)
                  return Math.min(4, Math.max(0.2, next))
                })
              }}
              className="relative w-full h-full overflow-auto bg-black/20 flex items-center justify-center p-6"
            >
              <div style={{ transform: `scale(${scale})`, transformOrigin: 'center', transition: 'transform 120ms ease' }}>
                <Image
                  src="/ele1001-circuit.jpg"
                  alt="ELE1001 circuit breadboard layout"
                  width={1280}
                  height={800}
                  className="w-auto object-contain rounded-lg"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      )}
      
      <figcaption className="p-4 text-sm text-muted-foreground text-center">
        Circuit breadboard layout (click to enlarge)
      </figcaption>
    </figure>
  )
}
