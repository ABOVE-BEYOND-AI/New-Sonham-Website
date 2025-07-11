import type React from "react"
import type { Metadata } from "next"
import localFont from "next/font/local"
import { Analytics } from '@vercel/analytics/react'
import "./globals.css"

const plusJakartaSans = localFont({
  src: [
    {
      path: "./fonts/PlusJakartaSans-VariableFont_wght.ttf",
      weight: "200 800",
      style: "normal",
    },
    {
      path: "./fonts/PlusJakartaSans-Italic-VariableFont_wght.ttf",
      weight: "200 800",
      style: "italic",
    },
  ],
  variable: "--font-jakarta",
  display: "swap",
})

export const metadata: Metadata = {
  title: "Sonham Group - Construction & Development",
  description: "Specialising in turning the impossible into reality with expert construction and development services.",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={plusJakartaSans.variable}>
      <body className="font-jakarta antialiased bg-stone-50 overflow-x-hidden">
        {children}
        <Analytics />
      </body>
    </html>
  )
}
