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
    href: "https://linkedin.com",
    color: "hover:border-primary/60 hover:bg-primary/10",
  },
  {
    name: "GitHub",
    icon: Github,
    href: "https://github.com",
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
    href: "mailto:contact@example.com",
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    console.log("Form submitted:", formData)
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
        <h2 className="mb-4 text-center text-4xl font-bold text-[var(--electric-blue)]">Get In Touch</h2>
        <p className="mx-auto mb-12 max-w-2xl text-center text-muted-foreground">
          Let's collaborate and innovate together.
        </p>

        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {/* Contact Form */}
          <Card className="border border-[var(--section-border)] bg-[var(--section-surface)] backdrop-blur-xl shadow-[0_25px_65px_-55px_rgba(94,177,255,0.85)]">
            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium mb-2">
                    Name
                  </label>
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your name"
                    className="border-[var(--section-border)] bg-[rgba(12,20,38,0.65)] focus-visible:border-primary/60 focus-visible:ring-primary/30"
                    required
                  />
                </div>
                <div>
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
                    className="border-[var(--section-border)] bg-[rgba(12,20,38,0.65)] focus-visible:border-primary/60 focus-visible:ring-primary/30"
                    required
                  />
                </div>
                <div>
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
                    className="border-[var(--section-border)] bg-[rgba(12,20,38,0.65)] focus-visible:border-primary/60 focus-visible:ring-primary/30"
                    required
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full bg-[linear-gradient(135deg,#3f8cff,#72d6ff)] text-slate-950 shadow-[0_20px_55px_-30px_rgba(94,177,255,0.85)] hover:-translate-y-0.5"
                >
                  Send Message
                </Button>
              </form>
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
                  className={`flex items-center gap-3 rounded-lg border border-[var(--section-border)] bg-[var(--section-surface)] p-4 text-foreground transition-all duration-300 backdrop-blur ${link.color}`}
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
