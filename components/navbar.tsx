"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
  { name: "Education", href: "#education" },
  { name: "Projects", href: "#projects" },
  { name: "Skills", href: "#skills" },
  { name: "Contact", href: "#contact" },
]

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)

      // Update active section based on scroll position
      const sections = navItems.map((item) => item.href.substring(1))
      const current = sections.find((section) => {
        const element = document.getElementById(section)
        if (element) {
          const rect = element.getBoundingClientRect()
          return rect.top <= 100 && rect.bottom >= 100
        }
        return false
      })
      if (current) setActiveSection(current)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const scrollToSection = (href: string) => {
    const element = document.getElementById(href.substring(1))
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
      setIsMobileMenuOpen(false)
    }
  }

  return (
    <nav
      style={{
        background: isScrolled ? "var(--navbar-bg-scrolled)" : "var(--navbar-bg)",
        color: "var(--navbar-text)",
        borderColor: "var(--section-border)",
        boxShadow: isScrolled ? "0 12px 30px -22px rgba(0, 0, 0, 0.45)" : "none",
      }}
      className={`fixed top-0 z-50 w-full border-b transition-all duration-300 ${
        isScrolled ? "backdrop-blur-2xl" : "backdrop-blur-xl"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-18 items-center justify-between gap-4">
          <a href="#hero" className="group relative inline-flex items-center gap-3">
            <div className="relative flex h-11 w-32 items-center justify-center overflow-hidden rounded-xl border border-[var(--section-border)] bg-white/95 px-3 shadow-[0_10px_30px_-24px_rgba(95,176,255,0.75)] transition-all duration-300 group-hover:-translate-y-0.5 group-hover:shadow-[0_16px_34px_-22px_rgba(95,176,255,0.82)]">
              <Image src="/tab-photo.png" alt="Abderrahmane Er-Raqabi logo" width={112} height={36} className="h-8 w-auto object-contain" />
            </div>
            <div className="hidden sm:block">
              <span className="block text-sm font-semibold leading-none text-foreground">Abderrahmane Er-Raqabi</span>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 rounded-full border border-[var(--section-border)] bg-[rgba(255,255,255,0.04)] px-2 py-1 backdrop-blur-xl">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? "bg-[rgba(95,176,255,0.12)] text-foreground shadow-[inset_0_0_0_1px_rgba(95,176,255,0.15)]"
                    : "text-muted-foreground hover:bg-[rgba(255,255,255,0.04)] hover:text-primary"
                }`}
              >
                {item.name}
              </button>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden text-foreground hover:bg-[rgba(255,255,255,0.08)]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-[var(--section-border)] py-4">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.name}
                  onClick={() => scrollToSection(item.href)}
                  className={`rounded-xl px-3 py-3 text-left text-sm font-medium transition-all duration-300 ${
                    activeSection === item.href.substring(1)
                      ? "bg-[linear-gradient(135deg,rgba(95,176,255,0.18),rgba(139,124,255,0.12))] text-foreground shadow-[var(--shadow-sm)]"
                      : "text-muted-foreground hover:bg-[rgba(255,255,255,0.05)] hover:text-primary"
                  }`}
                >
                  {item.name}
                </button>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
