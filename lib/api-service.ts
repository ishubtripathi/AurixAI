import { isValidYouTubeUrl, fetchVideoInfo, type VideoInfo } from "./youtube"

/**
 * Response type for the summarization API
 */
export interface SummaryResponse {
  success: boolean
  data?: {
    shortSummary: string
    detailedSummary: string[]
    videoTitle?: string
    videoInfo?: VideoInfo
  }
  error?: string
}

/**
 * Mock API service that simulates YouTube video summarization
 * In production, this would call a real backend API
 */
export async function summarizeVideo(url: string): Promise<SummaryResponse> {
  // Validate URL first
  if (!isValidYouTubeUrl(url)) {
    return {
      success: false,
      error: "Please enter a valid YouTube URL (e.g., youtube.com/watch?v=... or youtu.be/...)",
    }
  }

  // Fetch actual video info
  const videoInfo = await fetchVideoInfo(url)

  // Simulate API delay (2-4 seconds)
  const delay = Math.random() * 2000 + 2000
  await new Promise((resolve) => setTimeout(resolve, delay))

  // Simulate occasional API errors (5% chance - reduced for better UX)
  if (Math.random() < 0.05) {
    return {
      success: false,
      error: "Failed to process video. Please try again later.",
    }
  }

  // Mock response data with actual video info
  return {
    success: true,
    data: {
      videoTitle: videoInfo?.title || "Understanding Modern Web Development",
      videoInfo: videoInfo || undefined,
      shortSummary:
        "This video provides a comprehensive overview of modern web development practices, covering key frameworks like React and Next.js, essential tools for productivity, and best practices for building scalable applications.",
      detailedSummary: [
        "Introduction to component-based architecture and its benefits for code reusability and maintainability",
        "Deep dive into React hooks and state management patterns including useState, useEffect, and custom hooks",
        "Overview of Next.js features like server-side rendering, static generation, and API routes",
        "Best practices for TypeScript integration to improve code quality and developer experience",
        "Performance optimization techniques including code splitting, lazy loading, and caching strategies",
        "Testing strategies with Jest and React Testing Library for reliable applications",
        "Deployment and CI/CD pipelines using modern platforms like Vercel and GitHub Actions",
      ],
    },
  }
}
