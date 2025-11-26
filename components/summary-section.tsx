"use client"

import { Copy, Check, FileText, List } from "lucide-react"
import { useState } from "react"
import { motion } from "framer-motion"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { VideoCard } from "./video-card"
import type { VideoInfo } from "@/lib/youtube"

interface SummaryData {
  shortSummary: string
  detailedSummary: string[]
  videoTitle?: string
  videoInfo?: VideoInfo
}

interface SummarySectionProps {
  summary: SummaryData | null
}

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
}

/**
 * Summary section component that displays video info, short and detailed summaries
 * Includes copy-to-clipboard functionality with toast notifications
 */
export function SummarySection({ summary }: SummarySectionProps) {
  const [copiedShort, setCopiedShort] = useState(false)
  const [copiedDetailed, setCopiedDetailed] = useState(false)

  if (!summary) return null

  const handleCopy = async (text: string, type: "short" | "detailed") => {
    try {
      await navigator.clipboard.writeText(text)
      if (type === "short") {
        setCopiedShort(true)
        setTimeout(() => setCopiedShort(false), 2000)
      } else {
        setCopiedDetailed(true)
        setTimeout(() => setCopiedDetailed(false), 2000)
      }
      toast.success("Copied to clipboard!")
    } catch {
      toast.error("Failed to copy to clipboard")
    }
  }

  const detailedText = summary.detailedSummary.map((point, i) => `${i + 1}. ${point}`).join("\n")

  return (
    <section className="px-4 pb-20 sm:px-6 lg:px-8">
      <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mx-auto max-w-4xl">
        {/* Section Header */}
        <motion.div variants={cardVariants} className="mb-8 text-center">
          <h2 className="text-2xl font-bold sm:text-3xl" style={{ fontFamily: "var(--font-poppins)" }}>
            Video Summary
          </h2>
        </motion.div>

        {/* Video Card with Thumbnail */}
        {summary.videoInfo && <VideoCard videoInfo={summary.videoInfo} />}

        <div className="grid gap-6 lg:grid-cols-2">
          {/* Short Summary Card */}
          <motion.div variants={cardVariants}>
            <Card className="h-full border-border bg-card shadow-xl shadow-black/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <FileText className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Quick Summary</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(summary.shortSummary, "short")}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  aria-label="Copy short summary to clipboard"
                >
                  {copiedShort ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <p className="text-lg leading-relaxed text-foreground">{summary.shortSummary}</p>
              </CardContent>
            </Card>
          </motion.div>

          {/* Detailed Summary Card */}
          <motion.div variants={cardVariants}>
            <Card className="h-full border-border bg-card shadow-xl shadow-black/10">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div className="flex items-center gap-2">
                  <List className="h-5 w-5 text-primary" />
                  <CardTitle className="text-lg">Key Points</CardTitle>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => handleCopy(detailedText, "detailed")}
                  className="h-8 px-2 text-muted-foreground hover:text-foreground"
                  aria-label="Copy detailed summary to clipboard"
                >
                  {copiedDetailed ? <Check className="h-4 w-4 text-primary" /> : <Copy className="h-4 w-4" />}
                </Button>
              </CardHeader>
              <CardContent>
                <ul className="space-y-3">
                  {summary.detailedSummary.map((point, index) => (
                    <motion.li
                      key={index}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.3 + index * 0.1 }}
                      className="flex gap-3 text-muted-foreground"
                    >
                      <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-medium text-primary">
                        {index + 1}
                      </span>
                      <span className="leading-relaxed">{point}</span>
                    </motion.li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Copy All Button */}
        <motion.div variants={cardVariants} className="mt-6 flex justify-center">
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
            <Button
              variant="outline"
              onClick={() => handleCopy(`${summary.shortSummary}\n\nKey Points:\n${detailedText}`, "detailed")}
              className="border-border hover:bg-secondary"
            >
              <Copy className="mr-2 h-4 w-4" />
              Copy Full Summary
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}
