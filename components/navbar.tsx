"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", href: "#hero" },
  { name: "About", href: "#about" },
  { name: "Experience", href: "#experience" },
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
        boxShadow: isScrolled ? "0 18px 38px -24px rgba(94, 177, 255, 0.45)" : "none",
      }}
      className={`fixed top-0 z-50 w-full border-b transition-all duration-500 ${
        isScrolled ? "backdrop-blur-md" : "backdrop-blur-sm"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <a href="#hero" className="group relative inline-flex items-center">
            <span
              className="relative inline-block text-[33px] uppercase leading-none text-primary drop-shadow-[0_0_7px_rgba(59,130,246,0.21)] transition-transform duration-300 group-hover:scale-[1.02]"
              style={{ fontFamily: "var(--font-signature)", letterSpacing: "0.21em", textShadow: "0 0 8px rgba(59,130,246,0.16)" }}
            >
              AE
              <span className="pointer-events-none absolute inset-[-14%] rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_80%)] opacity-32 transition-[opacity,transform] duration-300 group-hover:opacity-52 group-hover:scale-112" />
            </span>
            <span className="pointer-events-none absolute left-1/2 top-full mt-1 h-3 w-16 -translate-x-1/2 rounded-full bg-[radial-gradient(circle,rgba(59,130,246,0.12),transparent_70%)] opacity-0 transition-opacity duration-300 group-hover:opacity-35" />
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className={`rounded-lg px-3 py-2 text-sm font-medium transition-all duration-300 ${
                  activeSection === item.href.substring(1)
                    ? "bg-[linear-gradient(135deg,rgba(20,32,62,0.9),rgba(54,123,255,0.8))] text-white shadow-[0_14px_40px_-20px_rgba(54,123,255,0.8)]"
                    : "text-muted-foreground hover:text-primary hover:bg-primary/10"
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
            className="md:hidden text-[var(--electric-blue)] hover:bg-primary/10"
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
                  className={`rounded-lg px-3 py-2 text-left text-sm font-medium transition-colors ${
                    activeSection === item.href.substring(1)
                      ? "bg-[linear-gradient(135deg,rgba(20,32,62,0.9),rgba(54,123,255,0.75))] text-white shadow-[0_14px_40px_-18px_rgba(54,123,255,0.8)]"
                      : "text-muted-foreground hover:text-primary hover:bg-primary/10"
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
