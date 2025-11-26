import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import { Toaster } from "react-hot-toast"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
})

export const metadata: Metadata = {
  title: "Aurix - AI-Powered YouTube Video Summarization",
  description:
    "Watch Less, Understand More. Aurix uses AI to instantly summarize YouTube videos, saving you time while keeping you informed.",
  keywords: ["YouTube", "video summarization", "AI", "summary", "Aurix"],
    generator: 'v0.app'
}

export const viewport: Viewport = {
  themeColor: "#1a1a2e",
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${poppins.variable} font-sans antialiased min-h-screen`}>
        {children}
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "oklch(0.16 0.01 260)",
              color: "oklch(0.98 0 0)",
              border: "1px solid oklch(0.28 0.01 260)",
            },
            success: {
              iconTheme: {
                primary: "oklch(0.72 0.19 160)",
                secondary: "oklch(0.13 0.01 260)",
              },
            },
            error: {
              iconTheme: {
                primary: "oklch(0.55 0.22 25)",
                secondary: "oklch(0.98 0 0)",
              },
            },
          }}
        />
      </body>
    </html>
  )
}
