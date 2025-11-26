import { isValidYouTubeUrl, fetchVideoInfo, type VideoInfo } from "./youtube"

export interface SummaryResponse {
  success: boolean
  data?: {
    shortSummary: string
    detailedSummary: string[]
    videoTitle?: string
    videoInfo?: VideoInfo
    channel?: string
    hasTranscript?: boolean
  }
  error?: string
}

export async function summarizeVideo(url: string): Promise<SummaryResponse> {
  // Validate URL first
  if (!isValidYouTubeUrl(url)) {
    return {
      success: false,
      error: "Please enter a valid YouTube URL (e.g., youtube.com/watch?v=... or youtu.be/...)",
    }
  }

  try {
    // Fetch actual video info
    const videoInfo = await fetchVideoInfo(url)
    
    if (!videoInfo) {
      return {
        success: false,
        error: "Could not fetch video information. Please check the URL and try again.",
      }
    }

    // Call your backend API for summarization
    const response = await fetch('/api/summarize', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        videoUrl: url,
      }),
    })

    const result = await response.json()

    if (!response.ok) {
      // Provide more specific error messages
      if (result.error?.includes('transcript') || result.error?.includes('subtitles')) {
        throw new Error('This video does not have subtitles available. Try a video with enabled captions.')
      }
      throw new Error(result.error || `Failed to summarize video`)
    }

    return {
      success: true,
      data: {
        videoTitle: result.videoTitle || videoInfo.title,
        videoInfo: videoInfo,
        shortSummary: result.shortSummary,
        detailedSummary: result.keyPoints || [],
        channel: result.channel,
        hasTranscript: result.hasTranscript
      },
    }

  } catch (error) {
    console.error('Error summarizing video:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : "Failed to summarize video. Please try a video with enabled subtitles.",
    }
  }
}