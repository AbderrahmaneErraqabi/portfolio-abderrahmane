import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { Analytics } from "@vercel/analytics/next"
import "./globals.css"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Abderrahmane Er-Raqabi | Electrical Engineering Portfolio",
  description:
    "Portfolio of Abderrahmane Er-Raqabi, Electrical Engineering student at Polytechnique Montréal specializing in embedded systems, AI, and circuit design.",
  generator: "v0.app",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="light">
  <body className={`${inter.className} font-sans antialiased bg-white text-black`}>
        {children}
        <Footer />
        <Analytics />
      </body>
    </html>
  )
}
