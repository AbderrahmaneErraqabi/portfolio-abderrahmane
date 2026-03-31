"use client"

import { useEffect, useState } from "react"
import { Code2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"

export function MedBotCodeModal() {
  const [code, setCode] = useState("Loading code...")

  useEffect(() => {
    let mounted = true

    fetch("/code_complet.ino")
      .then(async (res) => {
        if (!res.ok) {
          throw new Error("Unable to load code")
        }

        const content = await res.text()

        if (mounted) {
          setCode(content)
        }
      })
      .catch(() => {
        if (mounted) {
          setCode("Could not load code_complet.ino")
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
      <DialogContent className="max-h-[88vh] max-w-5xl overflow-hidden p-0">
        <DialogHeader className="border-b border-primary/20 px-6 py-4">
          <DialogTitle>code_complet.ino</DialogTitle>
        </DialogHeader>
        <div className="h-[70vh] overflow-auto bg-slate-950 p-6">
          <pre className="text-xs leading-relaxed text-slate-100">
            <code>{code}</code>
          </pre>
        </div>
      </DialogContent>
    </Dialog>
  )
}
