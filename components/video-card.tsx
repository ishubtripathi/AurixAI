"use client"

import { motion } from "framer-motion"
import { Play, User, ExternalLink } from "lucide-react"
import Image from "next/image"
import type { VideoInfo } from "@/lib/youtube"

interface VideoCardProps {
  videoInfo: VideoInfo
}

/**
 * Video card component displaying thumbnail and video information
 */
export function VideoCard({ videoInfo }: VideoCardProps) {
  const youtubeUrl = `https://www.youtube.com/watch?v=${videoInfo.videoId}`

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mx-auto max-w-2xl mb-8"
    >
      <div className="rounded-2xl overflow-hidden border border-border bg-card shadow-xl shadow-black/20">
        {/* Thumbnail with play overlay */}
        <a
          href={youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative block aspect-video overflow-hidden group"
        >
          <Image
            src={videoInfo.thumbnail || "/placeholder.svg"}
            alt={videoInfo.title}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 672px"
          />
          {/* Play button overlay */}
          <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <motion.div
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg"
            >
              <Play className="h-8 w-8 ml-1" fill="currentColor" />
            </motion.div>
          </div>
          {/* External link indicator */}
          <div className="absolute top-3 right-3 p-2 rounded-lg bg-black/50 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <ExternalLink className="h-4 w-4 text-white" />
          </div>
        </a>

        {/* Video info */}
        <div className="p-4">
          <h3 className="font-semibold text-lg line-clamp-2 text-foreground">{videoInfo.title}</h3>
          <div className="mt-2 flex items-center gap-2 text-sm text-muted-foreground">
            <User className="h-4 w-4" />
            <span>{videoInfo.channelName}</span>
          </div>
        </div>
      </div>
    </motion.div>
  )
}
