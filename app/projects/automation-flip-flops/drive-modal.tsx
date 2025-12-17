"use client"

import { useState } from "react"

const DRIVE_PREVIEW_URL = "https://drive.google.com/file/d/1sKwunO8FNPja6azoVtO5Po1LtSb3o1Y7/view?usp=sharing"

export default function DriveModal() {
  const [open, setOpen] = useState(false)

  function openPopup() {
    // Try to open a small popup window; browsers may still open a new tab.
    const features = `toolbar=0,status=0,width=${Math.min(1200, window.innerWidth - 100)},height=${Math.min(800, window.innerHeight - 100)}`
    window.open(DRIVE_PREVIEW_URL, "ele1001_drive_preview", features)
  }

  return (
    <div>
      <div className="relative cursor-pointer group" onClick={() => setOpen(true)}>
        <div className="w-full h-[65vh] bg-black rounded overflow-hidden flex items-center justify-center text-white">
          <div className="text-center">
            <div className="text-lg font-semibold">ELE1001 Project Presentation</div>
            <div className="mt-2 text-sm text-muted-foreground">Click to open preview (Drive)</div>
          </div>
        </div>
      </div>

      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 px-4" onClick={() => setOpen(false)}>
          <div className="relative w-full max-w-4xl rounded-2xl bg-background p-6" onClick={(e) => e.stopPropagation()}>
            <h3 className="text-lg font-semibold mb-2">Drive Preview: ELE1001 Presentation</h3>
            <p className="text-sm text-muted-foreground mb-4">Google Drive blocks embedding this file. Click the button below to open it in a popup window. If the popup opens in a new tab, that's a browser behavior.</p>
            <div className="flex gap-3">
              <button
                onClick={openPopup}
                className="rounded-md bg-primary px-4 py-2 text-white hover:opacity-95"
              >
                Open Drive Preview
              </button>
              <button
                onClick={() => setOpen(false)}
                className="rounded-md border px-4 py-2"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
