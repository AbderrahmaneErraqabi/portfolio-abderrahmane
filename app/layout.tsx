import type React from "react"
import type { Metadata } from "next"
import { Bricolage_Grotesque } from "next/font/google"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import { ProjectShellHeader } from "@/components/project-shell-header"
import { WaterBackground } from "@/components/water-background"
const bricolage = Bricolage_Grotesque({ subsets: ["latin"], variable: "--font-bricolage", display: "swap" })

export const metadata: Metadata = {
  title: "Abderrahmane Er-Raqabi",
  description:
    "Portfolio of Abderrahmane Er-Raqabi, Electrical Engineering student at Polytechnique Montréal specializing in embedded systems, AI, and circuit design.",
  icons: {
    icon: [
      { url: "/tab-icon.svg", type: "image/svg+xml" },
      { url: "/tab-photo.png", type: "image/png", sizes: "512x512" },
      { url: "/tab-photo.png", type: "image/png", sizes: "192x192" },
    ],
    shortcut: [{ url: "/tab-icon.svg" }],
    apple: [{ url: "/tab-photo.png", sizes: "180x180", type: "image/png" }],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark">
      <head>
        <link rel="icon" href="/tab-icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/tab-photo.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/tab-photo.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/tab-photo.png" sizes="180x180" />
      </head>
      <body className={`${bricolage.variable} ${GeistSans.variable} ${GeistMono.variable} font-sans`}>
        <WaterBackground />
        <ProjectShellHeader />
        {children}
        <footer className="site-footer"><span>© {new Date().getFullYear()} Abderrahmane Er-Raqabi</span><a href="#hero">Back to top ↑</a></footer>
        <Analytics />
      </body>
    </html>
  )
}
