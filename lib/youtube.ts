/**
 * YouTube utility functions for fetching video information
 */

export interface VideoInfo {
  videoId: string
  title: string
  channelName: string
  thumbnail: string
  duration?: string
}

/**
 * Extracts the video ID from a YouTube URL
 */
export function extractVideoId(url: string): string | null {
  const patterns = [/[?&]v=([^&]+)/, /youtu\.be\/([^?&]+)/, /embed\/([^?&]+)/, /\/v\/([^?&]+)/, /shorts\/([^?&]+)/]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1].substring(0, 11)
    }
  }

  return null
}

/**
 * Gets the thumbnail URL for a YouTube video
 */
export function getThumbnailUrl(videoId: string, quality: "default" | "medium" | "high" | "maxres" = "maxres"): string {
  const qualityMap = {
    default: "default",
    medium: "mqdefault",
    high: "hqdefault",
    maxres: "maxresdefault",
  }
  return `https://img.youtube.com/vi/${videoId}/${qualityMap[quality]}.jpg`
}

/**
 * Fetches video info using YouTube oEmbed API (no API key required)
 */
export async function fetchVideoInfo(url: string): Promise<VideoInfo | null> {
  const videoId = extractVideoId(url)
  if (!videoId) return null

  try {
    const oembedUrl = `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`
    const response = await fetch(oembedUrl)

    if (!response.ok) {
      throw new Error("Failed to fetch video info")
    }

    const data = await response.json()

    return {
      videoId,
      title: data.title || "Unknown Title",
      channelName: data.author_name || "Unknown Channel",
      thumbnail: getThumbnailUrl(videoId, "high"),
    }
  } catch {
    // Fallback: return basic info with thumbnail
    return {
      videoId,
      title: "YouTube Video",
      channelName: "Unknown Channel",
      thumbnail: getThumbnailUrl(videoId, "high"),
    }
  }
}

/**
 * Validates if a given URL is a valid YouTube video URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false
  }

  const patterns = [
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/v\/[\w-]{11}/,
    /^(https?:\/\/)?youtu\.be\/[\w-]{11}/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]{11}/,
  ]

  return patterns.some((pattern) => pattern.test(url.trim()))
}
