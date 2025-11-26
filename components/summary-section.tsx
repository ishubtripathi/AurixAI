"use client"

import { Copy, Check, FileText, List, Play, User, Clock, Zap, ExternalLink, ChevronDown } from "lucide-react"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import toast from "react-hot-toast"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { VideoCard } from "./video-card"
import type { VideoInfo } from "@/lib/youtube"

interface SummaryData {
  shortSummary: string
  detailedSummary: string[]
  videoTitle?: string
  videoInfo?: VideoInfo
  channel?: string
  hasTranscript?: boolean
}

interface SummarySectionProps {
  summary: SummaryData | null
}

interface ExpandablePoint {
  point: string
  isExpanded: boolean
  detailedDescription?: string
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
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { 
      duration: 0.5, 
      ease: [0.25, 0.46, 0.45, 0.94],
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, x: -10 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.4 }
  }
}

const expandVariants = {
  collapsed: {
    height: 0,
    opacity: 0,
    transition: {
      duration: 0.25,
      ease: "easeInOut"
    }
  },
  expanded: {
    height: "auto",
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: "easeOut"
    }
  }
}

/**
 * Professional summary section with enhanced styling and animations
 */
export function SummarySection({ summary }: SummarySectionProps) {
  const [copiedShort, setCopiedShort] = useState(false)
  const [copiedDetailed, setCopiedDetailed] = useState(false)
  const [expandedPoints, setExpandedPoints] = useState<ExpandablePoint[]>([])
  const [currentlyExpandedIndex, setCurrentlyExpandedIndex] = useState<number | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  // Check screen size on mount and resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768)
    }

    checkScreenSize()
    window.addEventListener('resize', checkScreenSize)
    
    return () => window.removeEventListener('resize', checkScreenSize)
  }, [])

  if (!summary) return null

  // Initialize expandable points
  if (expandedPoints.length === 0 && summary.detailedSummary.length > 0) {
    setExpandedPoints(
      summary.detailedSummary.map(point => ({
        point,
        isExpanded: false,
        detailedDescription: generateDetailedDescription(point, summary.hasTranscript || false)
      }))
    )
  }

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

  const handleThumbnailClick = () => {
    if (summary.videoInfo?.videoId) {
      window.open(`https://www.youtube.com/watch?v=${summary.videoInfo.videoId}`, '_blank')
    }
  }

  const togglePointExpansion = (index: number) => {
    setExpandedPoints(prev => 
      prev.map((item, i) => {
        if (i === index) {
          // Toggle the clicked item
          const newExpandedState = !item.isExpanded
          setCurrentlyExpandedIndex(newExpandedState ? index : null)
          return { ...item, isExpanded: newExpandedState }
        } else {
          // Collapse all other items
          return { ...item, isExpanded: false }
        }
      })
    )
  }

  const expandAllPoints = () => {
    // For "Expand All", we'll only expand the first one to maintain single-expansion behavior
    if (expandedPoints.length > 0) {
      setExpandedPoints(prev => 
        prev.map((item, i) => {
          if (i === 0) {
            setCurrentlyExpandedIndex(0)
            return { ...item, isExpanded: true }
          }
          return { ...item, isExpanded: false }
        })
      )
    }
  }

  const collapseAllPoints = () => {
    setExpandedPoints(prev => prev.map(item => ({ ...item, isExpanded: false })))
    setCurrentlyExpandedIndex(null)
  }

  // Update button text and behavior based on current state
  const expandButtonText = isMobile ? "First" : "Expand First"
  const expandButtonDisabled = currentlyExpandedIndex !== null

  return (
    <section className="px-3 sm:px-4 md:px-6 lg:px-8 pb-16 sm:pb-20">
      <motion.div 
        variants={containerVariants} 
        initial="hidden" 
        animate="visible" 
        className="mx-auto max-w-4xl lg:max-w-6xl"
      >
        {/* Enhanced Header Section */}
        <motion.div variants={cardVariants} className="mb-8 sm:mb-10 lg:mb-12 text-center">
          <div className="inline-flex items-center gap-2 sm:gap-3 mb-3 sm:mb-4">
            <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-xl sm:rounded-2xl bg-gradient-to-br from-primary to-primary/80 shadow-lg">
              <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-br from-foreground to-foreground/70 bg-clip-text text-transparent">
              AI Video Summary
            </h2>
          </div>
          <p className="text-base sm:text-lg text-muted-foreground max-w-xs sm:max-w-sm md:max-w-2xl mx-auto px-2">
            Intelligent analysis powered by advanced AI technology
          </p>
        </motion.div>

        {/* Video Information Card */}
        {summary.videoInfo && (
          <motion.div variants={cardVariants} className="mb-6 sm:mb-8">
            <Card className="border bg-gradient-to-br from-card to-card/50 shadow-lg sm:shadow-2xl shadow-primary/5 backdrop-blur-sm">
              <CardContent className="p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row items-start gap-4 sm:gap-6">
                  {/* Enhanced Thumbnail with Click Action */}
                  <div className="relative flex-shrink-0 group cursor-pointer w-full sm:w-auto mx-auto sm:mx-0" onClick={handleThumbnailClick}>
                    <div className="relative overflow-hidden rounded-xl sm:rounded-xl shadow-lg border transition-all duration-300 group-hover:scale-105 group-hover:shadow-xl max-w-xs mx-auto sm:max-w-none">
                      <img
                        src={summary.videoInfo.thumbnail}
                        alt={summary.videoTitle || "Video thumbnail"}
                        className="w-full h-40 sm:h-32 sm:w-48 object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent rounded-xl" />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <div className="flex h-10 w-10 sm:h-12 sm:w-12 items-center justify-center rounded-full bg-red-600/90 backdrop-blur-sm transform transition-transform group-hover:scale-110">
                          <Play className="h-4 w-4 sm:h-5 sm:w-5 text-white ml-0.5" />
                        </div>
                      </div>
                      <div className="absolute bottom-2 sm:bottom-3 left-2 sm:left-3 right-2 sm:right-3 flex items-center justify-between">
                        <Badge variant="secondary" className="bg-black/60 text-white backdrop-blur-sm text-xs">
                          Watch Video
                        </Badge>
                        <ExternalLink className="h-3 w-3 sm:h-4 sm:w-4 text-white opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                    </div>
                  </div>
                  
                  {/* Video Info */}
                  <div className="flex-1 min-w-0 text-center sm:text-left w-full">
                    <h3 className="text-lg sm:text-xl font-semibold text-foreground mb-2 line-clamp-2">
                      {summary.videoTitle}
                    </h3>
                    <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3 sm:gap-4 text-xs sm:text-sm text-muted-foreground">
                      {summary.channel && (
                        <div className="flex items-center gap-1.5">
                          <User className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span className="truncate max-w-32 sm:max-w-none">{summary.channel}</span>
                        </div>
                      )}
                      {summary.videoInfo.duration && (
                        <div className="flex items-center gap-1.5">
                          <Clock className="h-3 w-3 sm:h-4 sm:w-4" />
                          <span>{summary.videoInfo.duration}</span>
                        </div>
                      )}
                      <Badge 
                        variant={summary.hasTranscript ? "default" : "secondary"} 
                        className="gap-1.5 text-xs"
                      >
                        <Play className="h-3 w-3" />
                        {summary.hasTranscript ? "With Transcript" : "Title Analysis"}
                      </Badge>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )}

        {/* Summary Cards Grid */}
        <div className="grid gap-4 sm:gap-6 lg:gap-8 lg:grid-cols-2">
          {/* Overview Card */}
          <motion.div variants={cardVariants}>
            <Card className="h-full border bg-gradient-to-br from-card to-card/80 shadow-lg sm:shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10">
                      <FileText className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-semibold">
                        {summary.hasTranscript ? "AI Summary" : "Content Overview"}
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                        {summary.hasTranscript ? "Generated from transcript" : "AI-powered analysis"}
                      </p>
                    </div>
                  </div>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => handleCopy(summary.shortSummary, "short")}
                    className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                    aria-label="Copy short summary to clipboard"
                  >
                    {copiedShort ? (
                      <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                    ) : (
                      <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                    )}
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3 sm:space-y-4">
                  <p className="text-foreground leading-relaxed text-base sm:text-lg font-light">
                    {summary.shortSummary}
                  </p>
                  {summary.hasTranscript === false && (
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="h-1 w-1 rounded-full bg-muted-foreground/50" />
                      <span>AI-generated content analysis</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Content Breakdown Card */}
          <motion.div variants={cardVariants}>
            <Card className="h-full border bg-gradient-to-br from-card to-card/80 shadow-lg sm:shadow-2xl shadow-primary/5 hover:shadow-primary/10 transition-all duration-300 backdrop-blur-sm">
              <CardHeader className="pb-3 sm:pb-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 sm:gap-0">
                  <div className="flex items-center gap-2 sm:gap-3">
                    <div className="flex h-8 w-8 sm:h-10 sm:w-10 items-center justify-center rounded-lg sm:rounded-xl bg-primary/10">
                      <List className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
                    </div>
                    <div>
                      <CardTitle className="text-lg sm:text-xl font-semibold">
                        Content Breakdown
                      </CardTitle>
                      <p className="text-xs sm:text-sm text-muted-foreground mt-0.5 sm:mt-1">
                        {summary.detailedSummary.length} key {summary.detailedSummary.length === 1 ? 'point' : 'points'} • Click to expand
                        {currentlyExpandedIndex !== null && !isMobile && " • One expanded at a time"}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 justify-end">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={expandAllPoints}
                      disabled={expandButtonDisabled}
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {expandButtonText}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={collapseAllPoints}
                      className="h-7 px-2 text-xs text-muted-foreground hover:text-foreground"
                    >
                      {isMobile ? "Collapse" : "Collapse All"}
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => handleCopy(detailedText, "detailed")}
                      className="h-8 w-8 sm:h-9 sm:w-9 rounded-lg text-muted-foreground hover:text-foreground hover:bg-accent/50 transition-colors"
                      aria-label="Copy detailed summary to clipboard"
                    >
                      {copiedDetailed ? (
                        <Check className="h-3 w-3 sm:h-4 sm:w-4 text-green-600" />
                      ) : (
                        <Copy className="h-3 w-3 sm:h-4 sm:w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                {expandedPoints.length > 0 ? (
                  <motion.ul className="space-y-2 sm:space-y-3">
                    {expandedPoints.map((item, index) => (
                      <motion.li
                        key={index}
                        variants={itemVariants}
                        className={`rounded-lg border border-accent/20 overflow-hidden transition-all duration-200 ${
                          item.isExpanded 
                            ? 'bg-accent/30 shadow-sm sm:shadow-md' 
                            : 'bg-accent/20 hover:bg-accent/30'
                        }`}
                      >
                        {/* Clickable Header */}
                        <div 
                          className="flex items-start gap-3 sm:gap-4 p-3 sm:p-4 cursor-pointer group"
                          onClick={() => togglePointExpansion(index)}
                        >
                          <div className={`flex h-6 w-6 sm:h-7 sm:w-7 shrink-0 items-center justify-center rounded-full text-xs sm:text-sm font-semibold text-white shadow-sm mt-0.5 ${
                            item.isExpanded
                              ? 'bg-gradient-to-br from-primary to-primary/90'
                              : 'bg-gradient-to-br from-primary/80 to-primary/70'
                          }`}>
                            {index + 1}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium leading-relaxed text-sm sm:text-base transition-colors ${
                              item.isExpanded
                                ? 'text-foreground'
                                : 'text-foreground group-hover:text-foreground/90'
                            }`}>
                              {item.point}
                            </p>
                          </div>
                          <div className="flex-shrink-0">
                            <motion.div
                              animate={{ rotate: item.isExpanded ? 180 : 0 }}
                              transition={{ duration: 0.3 }}
                              className={`transition-colors ${
                                item.isExpanded
                                  ? 'text-primary'
                                  : 'text-muted-foreground group-hover:text-foreground'
                              }`}
                            >
                              <ChevronDown className="h-3 w-3 sm:h-4 sm:w-4" />
                            </motion.div>
                          </div>
                        </div>

                        {/* Expandable Content */}
                        <AnimatePresence>
                          {item.isExpanded && (
                            <motion.div
                              variants={expandVariants}
                              initial="collapsed"
                              animate="expanded"
                              exit="collapsed"
                              className="overflow-hidden"
                            >
                              <div className="px-3 sm:px-4 pb-3 sm:pb-4 ml-9 sm:ml-11 border-l-2 border-primary/30">
                                <div className="pl-3 sm:pl-4">
                                  <p className="text-foreground/80 leading-relaxed text-xs sm:text-sm">
                                    {item.detailedDescription}
                                  </p>
                                  <div className="flex items-center gap-2 mt-2 sm:mt-3 pt-2 sm:pt-3 border-t border-accent/30">
                                    <div className="h-1.5 w-1.5 sm:h-2 sm:w-2 rounded-full bg-primary/60" />
                                    <span className="text-xs text-muted-foreground">
                                      Detailed analysis based on {summary.hasTranscript ? 'video transcript' : 'content patterns'}
                                    </span>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </motion.li>
                    ))}
                  </motion.ul>
                ) : (
                  <div className="text-center py-6 sm:py-8 text-muted-foreground">
                    <List className="h-8 w-8 sm:h-12 sm:w-12 mx-auto mb-2 sm:mb-3 opacity-50" />
                    <p className="text-sm sm:text-base">No content points available</p>
                    <p className="text-xs sm:text-sm mt-1">Try a video with more descriptive content</p>
                  </div>
                )}
                
                {/* Analysis Method Note */}
                <div className="mt-4 sm:mt-6 p-2 sm:p-3 rounded-lg bg-accent/5 border border-accent/30">
                  <div className="flex items-start gap-2">
                    <div className="flex h-4 w-4 sm:h-5 sm:w-5 shrink-0 items-center justify-center rounded-full bg-primary/20 mt-0.5">
                      <Zap className="h-2 w-2 sm:h-3 sm:w-3 text-primary" />
                    </div>
                    <div>
                      <p className="text-xs sm:text-sm font-medium text-foreground mb-1">
                        {summary.hasTranscript ? 'Transcript Analysis' : 'AI Content Analysis'}
                      </p>
                      <p className="text-xs text-muted-foreground leading-relaxed">
                        {summary.hasTranscript 
                          ? 'Click on any point to see detailed explanations. Only one point can be expanded at a time for better focus.'
                          : 'Click on any point to explore AI-generated insights. Only one point expands at a time for clear reading.'
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Action Buttons */}
        <motion.div 
          variants={cardVariants}
          className="mt-8 sm:mt-10 lg:mt-12 flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center"
        >
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button
              size="lg"
              onClick={() => handleCopy(`${summary.shortSummary}\n\nKey Points:\n${detailedText}`, "detailed")}
              className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary shadow-lg hover:shadow-primary/25 transition-all duration-300 w-full sm:w-auto px-6 py-5 sm:px-8 sm:py-6 text-base font-semibold"
            >
              <Copy className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Copy Full Summary
            </Button>
          </motion.div>
          
          <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="w-full sm:w-auto">
            <Button
              variant="outline"
              size="lg"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="border-2 w-full sm:w-auto px-6 py-5 sm:px-8 sm:py-6 text-base font-semibold hover:bg-accent/50 transition-all duration-300"
            >
              <Play className="mr-2 sm:mr-3 h-4 w-4 sm:h-5 sm:w-5" />
              Analyze Another Video
            </Button>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  )
}

/**
 * Generate detailed descriptions for each point based on the content
 */
function generateDetailedDescription(point: string, hasTranscript: boolean): string {
  const pointLower = point.toLowerCase()
  
  if (pointLower.includes('step') || pointLower.includes('guide') || pointLower.includes('tutorial')) {
    return `This instructional element provides practical guidance and actionable steps. The process is designed to be followed sequentially, with each step building upon the previous one to achieve the desired outcome. This methodology ensures comprehensive understanding and effective implementation.`
  } else if (pointLower.includes('benefit') || pointLower.includes('advantage') || pointLower.includes('value')) {
    return `These advantages represent significant improvements or positive outcomes that can be expected. Each benefit contributes to the overall value proposition, addressing specific needs or pain points while delivering measurable improvements in efficiency, effectiveness, or user experience.`
  } else if (pointLower.includes('technique') || pointLower.includes('method') || pointLower.includes('approach')) {
    return `This methodology represents a systematic way of addressing challenges or achieving objectives. The approach has been refined through practical application and is supported by proven principles that ensure reliability and consistent results across different scenarios.`
  } else if (pointLower.includes('example') || pointLower.includes('case study') || pointLower.includes('scenario')) {
    return `This real-world illustration demonstrates practical application and contextual understanding. The example serves to clarify abstract concepts by showing how they manifest in actual situations, making complex ideas more accessible and easier to comprehend.`
  } else if (pointLower.includes('challenge') || pointLower.includes('problem') || pointLower.includes('issue')) {
    return `This represents a significant obstacle or difficulty that requires careful consideration. Understanding these challenges is crucial for developing effective solutions and anticipating potential roadblocks in the implementation process.`
  } else if (pointLower.includes('solution') || pointLower.includes('resolution') || pointLower.includes('answer')) {
    return `This approach effectively addresses the core issues while considering various constraints and requirements. The solution has been designed to be both practical and sustainable, offering long-term benefits rather than temporary fixes.`
  } else {
    return `This important aspect contributes significantly to the overall understanding of the topic. The concept is explored in depth to provide comprehensive insights and practical applications that enhance learning and implementation effectiveness. Additional context and examples help illustrate how this element functions within the broader framework.`
  }
}