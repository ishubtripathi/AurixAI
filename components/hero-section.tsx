"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"
import { Play, Sparkles, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

interface HeroSectionProps {
  onSubmit: (url: string) => void
  isLoading: boolean
  error: string | null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

/**
 * Hero section with tagline, description, and YouTube URL input
 * Uses Framer Motion for smooth animations
 */
export function HeroSection({ onSubmit, isLoading, error }: HeroSectionProps) {
  const [url, setUrl] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (url.trim()) {
      onSubmit(url.trim())
    }
  }

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] flex-col items-center justify-center px-4 py-20 sm:px-6 lg:px-8">
      {/* Background gradient effect */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="absolute top-1/4 left-1/2 -translate-x-1/2 h-96 w-96 rounded-full bg-primary/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 0.5, scale: 1 }}
          transition={{ duration: 1.2, delay: 0.2, ease: "easeOut" }}
          className="absolute bottom-1/4 right-1/4 h-64 w-64 rounded-full bg-primary/5 blur-3xl"
        />
      </div>

      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="relative z-10 mx-auto max-w-3xl text-center"
      >
        {/* Badge */}
        <motion.div
          variants={itemVariants}
          className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-1.5 text-sm text-muted-foreground"
        >
          <Sparkles className="h-4 w-4 text-primary" />
          <span>AI-Powered Video Intelligence</span>
        </motion.div>

        {/* Tagline */}
        <motion.h1
          variants={itemVariants}
          className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl"
          style={{ fontFamily: "var(--font-poppins)" }}
        >
          <span className="text-balance">Watch Less,</span>
          <br />
          <span className="text-primary">Understand More.</span>
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          variants={itemVariants}
          className="mt-6 text-lg text-muted-foreground sm:text-xl max-w-2xl mx-auto text-pretty"
        >
          Paste any YouTube video URL and let Aurix generate comprehensive summaries instantly. Save hours of watching
          with AI-powered insights.
        </motion.p>

        {/* Input Form */}
        <motion.form
          variants={itemVariants}
          onSubmit={handleSubmit}
          className="mt-10 flex flex-col gap-3 sm:flex-row sm:gap-2 max-w-xl mx-auto"
        >
          <div className="relative flex-1">
            <Play className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="url"
              placeholder="Paste YouTube video URL here..."
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className={cn(
                "h-14 pl-12 pr-4 text-base bg-input border-border rounded-xl shadow-lg shadow-black/20",
                "placeholder:text-muted-foreground/60",
                "focus:ring-2 focus:ring-primary/50 focus:border-primary",
                "transition-all duration-200",
                error && "border-destructive focus:ring-destructive/50",
              )}
              disabled={isLoading}
              aria-label="YouTube video URL"
            />
          </div>
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              type="submit"
              size="lg"
              disabled={isLoading || !url.trim()}
              className={cn(
                "h-14 px-8 text-base font-semibold rounded-xl w-full sm:w-auto",
                "bg-primary text-primary-foreground",
                "hover:bg-primary/90",
                "disabled:opacity-50 disabled:cursor-not-allowed",
                "transition-all duration-200",
                "shadow-lg shadow-primary/25",
              )}
            >
              {isLoading ? (
                <span className="flex items-center gap-2">
                  <motion.span
                    className="h-4 w-4 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                  />
                  Processing
                </span>
              ) : (
                <span className="flex items-center gap-2">
                  Summarize
                  <ArrowRight className="h-4 w-4" />
                </span>
              )}
            </Button>
          </motion.div>
        </motion.form>

        {/* Error Message */}
        {error && (
          <motion.p
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-4 text-sm text-destructive"
            role="alert"
          >
            {error}
          </motion.p>
        )}

        {/* Features */}
        <motion.div
          variants={itemVariants}
          className="mt-12 flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground"
        >
          {["Instant summaries", "Key takeaways", "Copy to clipboard"].map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-primary" />
              <span>{feature}</span>
            </div>
          ))}
        </motion.div>
      </motion.div>
    </section>
  )
}
