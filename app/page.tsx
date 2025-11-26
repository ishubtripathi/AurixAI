"use client"

import { useState, useCallback } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { HeroSection } from "@/components/hero-section"
import { SummarySection } from "@/components/summary-section"
import { Preloader } from "@/components/preloader"
import { summarizeVideo, type SummaryResponse } from "@/lib/api-service"

/**
 * Main home page component for Aurix
 * Handles video URL submission, loading states, and summary display
 */
export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [summary, setSummary] = useState<SummaryResponse["data"] | null>(null)
  const [showPreloader, setShowPreloader] = useState(false)

  const handleSubmit = useCallback(async (url: string) => {
    // Clear previous state
    setError(null)
    setSummary(null)
    setIsLoading(true)
    setShowPreloader(true)

    try {
      const response = await summarizeVideo(url)

      if (response.success && response.data) {
        setSummary(response.data)
      } else {
        setError(response.error || "An unexpected error occurred")
      }
    } catch {
      setError("Failed to connect to the server. Please check your connection.")
    } finally {
      setIsLoading(false)
      setShowPreloader(false)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Preloader Overlay */}
      <Preloader isVisible={showPreloader} />

      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <HeroSection onSubmit={handleSubmit} isLoading={isLoading} error={error} />

        {/* Summary Section with Video Thumbnail */}
        {summary && <SummarySection summary={summary} />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  )
}
