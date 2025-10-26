"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Github, Linkedin, Twitter, Mail } from "lucide-react"

const socialLinks = [
  {
    name: "LinkedIn",
    icon: Linkedin,
    href: "https://www.linkedin.com/in/abderrahmane-er-raqabi-7381b0354/",
    color: "hover:border-primary/60 hover:bg-primary/10",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com/AbderrahmaneErraqabi",
    color: "hover:border-primary/60 hover:bg-primary/10",
  },
  {
    name: "Twitter",
    icon: Twitter,
    href: "https://twitter.com/abderrtrades",
    color: "hover:border-primary/60 hover:bg-primary/10",
  },
  {
    name: "Email",
    icon: Mail,
    href: "mailto:abderrahmane.erraqabi@gmail.com",
    color: "hover:border-primary/60 hover:bg-primary/10",
  },
]

import { SectionWrapper } from "./section-wrapper"

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setFeedback(null)

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        const data = await response.json().catch(() => ({}))
        throw new Error(data.error ?? "Failed to send message.")
      }

      setFeedback({
        type: "success",
        message: "Message sent! I’ll get back to you soon.",
      })
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      console.error("Contact form submission failed:", error)
      setFeedback({
        type: "error",
        message: "Hmm, something went wrong. Please try again in a moment.",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  return (
    <SectionWrapper id="contact" className="py-20" style={{ background: "var(--section-alt)" }}>
      <div className="container mx-auto px-4">
        <h2 className="text-center text-4xl font-bold text-transparent bg-clip-text bg-[linear-gradient(120deg,#0f172a,#1d4ed8_55%,#1e293b)] drop-shadow-[0_8px_18px_rgba(29,78,216,0.22)]">
          Get In Touch
        </h2>
        <div className="mx-auto mt-3 mb-10 h-0.5 w-24 rounded-full bg-gradient-to-r from-transparent via-primary to-transparent" />
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Let&apos;s collaborate and innovate together.
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <Card className="futuristic-card border border-[var(--section-border)] bg-[var(--section-surface)] backdrop-blur-xl shadow-[0_25px_65px_-55px_rgba(94,177,255,0.85)]">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="field-wrapper">
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="border-[var(--section-border)] bg-white/90 focus-visible:border-primary/60 focus-visible:ring-primary/25"
                    required
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="email" className="block text-sm font-medium mb-2">
                    Email
                  </label>
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your.email@example.com"
                    className="border-[var(--section-border)] bg-white/90 focus-visible:border-primary/60 focus-visible:ring-primary/25"
                    required
                  />
                </div>
                <div className="field-wrapper">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Your message..."
                    rows={5}
                    className="border-[var(--section-border)] bg-white/90 focus-visible:border-primary/60 focus-visible:ring-primary/25"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[linear-gradient(135deg,#3f8cff,#72d6ff)] text-slate-950 shadow-[0_20px_55px_-30px_rgba(94,177,255,0.85)] hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-70"
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </Button>
              </form>
              {feedback && (
                <p
                  className={`mt-4 text-sm ${
                    feedback.type === "success" ? "text-primary" : "text-destructive"
                  }`}
                >
                  {feedback.message}
                </p>
              )}
            </CardContent>
          </Card>

          {/* Social Links */}
          <div className="flex flex-col justify-center">
            <h3 className="mb-6 text-2xl font-bold text-foreground">Connect With Me</h3>
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`futuristic-tile flex items-center gap-3 rounded-lg border border-[var(--section-border)] bg-[var(--section-surface)] p-4 text-foreground transition-all duration-300 backdrop-blur ${link.color}`}
                >
                  <link.icon className="h-6 w-6 text-primary" />
                  <span className="font-medium">{link.name}</span>
                </a>
              ))}
            </div>
            <p className="mt-8 text-muted-foreground leading-relaxed">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out!
            </p>
          </div>
        </div>
      </div>
    </SectionWrapper>
  )
}
