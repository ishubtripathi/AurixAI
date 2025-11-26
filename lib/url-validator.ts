/**
 * Validates if a given URL is a valid YouTube video URL
 * Supports various YouTube URL formats including:
 * - youtube.com/watch?v=
 * - youtu.be/
 * - youtube.com/embed/
 * - youtube.com/v/
 *
 * @param url - The URL string to validate
 * @returns boolean indicating if the URL is a valid YouTube video URL
 */
export function isValidYouTubeUrl(url: string): boolean {
  if (!url || typeof url !== "string") {
    return false
  }

  // Regex patterns for various YouTube URL formats
  const patterns = [
    /^(https?:\/\/)?(www\.)?youtube\.com\/watch\?v=[\w-]{11}/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/embed\/[\w-]{11}/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/v\/[\w-]{11}/,
    /^(https?:\/\/)?youtu\.be\/[\w-]{11}/,
    /^(https?:\/\/)?(www\.)?youtube\.com\/shorts\/[\w-]{11}/,
  ]

  return patterns.some((pattern) => pattern.test(url.trim()))
}

/**
 * Extracts the video ID from a YouTube URL
 *
 * @param url - The YouTube URL
 * @returns The video ID or null if not found
 */
export function extractVideoId(url: string): string | null {
  if (!isValidYouTubeUrl(url)) {
    return null
  }

  const patterns = [/[?&]v=([^&]+)/, /youtu\.be\/([^?&]+)/, /embed\/([^?&]+)/, /\/v\/([^?&]+)/, /shorts\/([^?&]+)/]

  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }

  return null
}
