"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Logo } from "@/components/logo"

export function ProjectShellHeader() {
  const pathname = usePathname()
  if (!pathname.startsWith("/projects/")) return null
  return <header className="project-shell-header"><Logo /><Link className="text-link" href="/#work">Back to projects <span>↗</span></Link></header>
}
