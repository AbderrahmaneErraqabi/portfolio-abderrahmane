"use client"

import { useEffect, useState } from "react"
import { Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function ESP32CodeModal() {
  const [code, setCode] = useState("Loading code...")

  useEffect(() => {
    let mounted = true

    fetch("/camerawebserver.ino")
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unable to load code")
        }

        const content = await response.text()

        if (mounted) {
          setCode(content)
        }
      })
      .catch(() => {
        if (mounted) {
          setCode("Could not load camerawebserver.ino")
        }
      })

    return () => {
      mounted = false
    }
  }, [])

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="inline-flex items-center gap-2 rounded-full border border-primary/50 bg-primary/20 px-5 py-2 text-sm font-semibold text-white transition hover:border-primary/70 hover:bg-primary/30">
          <Code2 className="h-4 w-4" />
          View Arduino Code
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[92vh] max-w-[96vw] overflow-hidden p-0">
        <DialogHeader className="flex items-center justify-between gap-4 border-b border-primary/20 px-6 py-4 bg-gradient-to-r from-primary/6 to-transparent">
          <div>
            <h3 className="text-lg font-semibold">camerawebserver.ino</h3>
            <p className="mt-1 text-xs text-muted-foreground">ESP32 AI Camera Web Server — full sketch</p>
          </div>
        </DialogHeader>

        <div className="h-[78vh] overflow-hidden bg-[var(--section-surface)]">
          <div className="mx-auto max-w-6xl grid grid-cols-1 lg:grid-cols-4 gap-6 p-6">
            <aside className="col-span-1 rounded-lg border border-primary/10 bg-primary/5 p-4">
              <h4 className="text-sm font-semibold text-primary">File Info</h4>
              <ul className="mt-3 text-sm text-muted-foreground space-y-2">
                <li>Language: Arduino C++</li>
                <li>Size: {code.length} chars</li>
                <li>Contains: WiFi, HTTP, camera streaming</li>
              </ul>
            </aside>

            <div className="col-span-1 lg:col-span-3 overflow-auto rounded-lg bg-slate-950 p-6">
              <pre className="text-xs leading-relaxed text-slate-100">
                <code>{code}</code>
              </pre>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}