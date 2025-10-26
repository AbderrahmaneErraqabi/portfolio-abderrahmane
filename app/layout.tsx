import type React from "react"
import type { Metadata } from "next"
import { Inter, Great_Vibes } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"], variable: "--font-sans" })
const signature = Great_Vibes({ subsets: ["latin"], weight: "400", variable: "--font-signature" })

export const metadata: Metadata = {
  title: "Abderrahmane Er-Raqabi",
  description:
    "Portfolio of Abderrahmane Er-Raqabi, Electrical Engineering student at Polytechnique Montréal specializing in embedded systems, AI, and circuit design.",
  generator: "v0.app",
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
    <html lang="en" className="light">
      <head>
        <link rel="icon" href="/tab-icon.svg" type="image/svg+xml" />
        <link rel="icon" href="/tab-photo.png" type="image/png" sizes="512x512" />
        <link rel="icon" href="/tab-photo.png" type="image/png" sizes="192x192" />
        <link rel="apple-touch-icon" href="/tab-photo.png" sizes="180x180" />
      </head>
      <body className={`${inter.className} ${signature.variable} font-sans antialiased bg-white text-black`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
