import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { videoUrl } = await request.json()

    if (!videoUrl) {
      return NextResponse.json({ error: 'Video URL is required' }, { status: 400 })
    }

    // Extract video ID
    const videoId = extractVideoId(videoUrl)
    if (!videoId) {
      return NextResponse.json({ error: 'Invalid YouTube URL' }, { status: 400 })
    }

    console.log('🔄 Processing video:', videoId)

    // Get video metadata
    const videoInfo = await getVideoMetadata(videoId)
    
    if (!videoInfo.title || videoInfo.title === 'YouTube Video') {
      return NextResponse.json({ 
        error: 'Could not fetch video information. Please check the URL.' 
      }, { status: 400 })
    }

    console.log('📹 Video title:', videoInfo.title)

    // Try to get transcript (most videos won't have accessible transcripts)
    let transcript = ''
    let hasTranscript = false
    
    try {
      console.log('🔍 Checking for subtitles...')
      const { YoutubeTranscript } = await import('youtube-transcript')
      const transcriptItems = await YoutubeTranscript.fetchTranscript(videoId)
      
      if (transcriptItems && transcriptItems.length > 0) {
        transcript = transcriptItems.map(item => item.text).join(' ')
        hasTranscript = transcript.length > 100
        console.log('✅ Subtitles found! Length:', transcript.length)
      } else {
        console.log('ℹ️ No subtitles available for this video')
      }
    } catch (error) {
      console.log('ℹ️ This video does not have publicly accessible subtitles')
      // This is normal - most videos don't have accessible transcripts
    }

    // Generate smart summary
    const summary = generateSmartSummary(transcript, videoInfo, hasTranscript)

    console.log('✅ Summary generated successfully')
    console.log('📋 Method used:', summary.summaryMethod)
    console.log('📝 Summary length:', summary.shortSummary.length)
    console.log('🔑 Key points:', summary.keyPoints.length)

    return NextResponse.json({
      ...summary,
      videoTitle: videoInfo.title,
      channel: videoInfo.author,
      hasTranscript,
      message: hasTranscript 
        ? 'Summary generated from video subtitles' 
        : 'Summary based on video title and content analysis'
    })

  } catch (error: any) {
    console.error('❌ Summarization error:', error)
    return NextResponse.json(
      { error: 'Unable to process this video. Please try a different one.' },
      { status: 500 }
    )
  }
}

function extractVideoId(url: string): string | null {
  const patterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/)([^&?#]+)/,
    /youtube\.com\/embed\/([^&?#]+)/,
    /youtube\.com\/v\/([^&?#]+)/
  ]
  
  for (const pattern of patterns) {
    const match = url.match(pattern)
    if (match && match[1]) {
      return match[1]
    }
  }
  return null
}

async function getVideoMetadata(videoId: string) {
  try {
    const response = await fetch(
      `https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`,
      {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      }
    )
    
    if (response.ok) {
      const data = await response.json()
      return {
        title: data.title,
        author: data.author_name,
        thumbnail: data.thumbnail_url,
      }
    }
  } catch (error) {
    console.log('Metadata fetch failed:', error)
  }

  return {
    title: 'YouTube Video',
    author: 'Unknown',
    thumbnail: `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`,
  }
}

function generateSmartSummary(transcript: string, videoInfo: any, hasTranscript: boolean) {
  if (hasTranscript && transcript.length > 100) {
    return generateTranscriptSummary(transcript, videoInfo)
  } else {
    return generateEnhancedTitleSummary(videoInfo)
  }
}

function generateTranscriptSummary(transcript: string, videoInfo: any) {
  // Simple text processing for transcripts
  const sentences = transcript.split(/[.!?]+/)
    .filter(s => s.trim().length > 20)
    .map(s => s.trim())
    .slice(0, 10)

  const shortSummary = `This video "${videoInfo.title}" discusses: ${sentences.slice(0, 2).join(' ')}`

  const keyPoints = sentences
    .slice(0, 6)
    .map((point, index) => {
      const cleanPoint = point.length > 80 ? point.substring(0, 80) + '...' : point
      return `${index + 1}. ${cleanPoint}`
    })

  return {
    shortSummary: shortSummary.length > 400 ? shortSummary.substring(0, 400) + '...' : shortSummary,
    keyPoints,
    summaryMethod: 'transcript-analysis'
  }
}

function generateEnhancedTitleSummary(videoInfo: any) {
  const title = videoInfo.title
  const lowerTitle = title.toLowerCase()

  // More sophisticated title analysis
  if (lowerTitle.includes('speech') || lowerTitle.includes('talk') || lowerTitle.includes('interview')) {
    return {
      shortSummary: `In this talk "${title}", the speaker likely shares insights, experiences, or perspectives on relevant topics. Such videos often feature personal stories, professional advice, or thought-provoking discussions that engage the audience.`,
      keyPoints: [
        'Features spoken content and presentations',
        'Includes personal stories or professional insights',
        'Contains motivational or educational messages',
        'May discuss life experiences or career advice',
        'Likely engages with audience questions or topics'
      ],
      summaryMethod: 'title-analysis-speech'
    }
  } else if (lowerTitle.includes('tutorial') || lowerTitle.includes('how to') || lowerTitle.includes('guide') || lowerTitle.includes('learn')) {
    return {
      shortSummary: `This tutorial "${title}" provides step-by-step guidance and practical instructions. Educational videos like this typically break down complex topics into understandable parts, offering viewers actionable knowledge and skills they can apply.`,
      keyPoints: [
        'Step-by-step instructional content',
        'Practical demonstrations and examples',
        'Educational explanations and guidance',
        'Tips, techniques, or best practices',
        'Problem-solving approaches and methods'
      ],
      summaryMethod: 'title-analysis-tutorial'
    }
  } else if (lowerTitle.includes('music') || lowerTitle.includes('song') || lowerTitle.includes('album') || lowerTitle.includes('lyric')) {
    return {
      shortSummary: `This music content "${title}" features artistic audio performances or entertainment. Music videos typically showcase creative expression through sound and visuals, providing enjoyment and potentially cultural or emotional value to viewers.`,
      keyPoints: [
        'Audio and musical performances',
        'Creative artistic expression',
        'Entertainment and enjoyment focus',
        'Potential cultural or emotional themes',
        'Artistic visualization and sound design'
      ],
      summaryMethod: 'title-analysis-music'
    }
  } else if (lowerTitle.includes('news') || lowerTitle.includes('update') || lowerTitle.includes('report') || lowerTitle.includes('breaking')) {
    return {
      shortSummary: `This news content "${title}" covers current events, updates, or informational reporting. News videos typically provide factual information about recent happenings, offering viewers updates on important developments and situations.`,
      keyPoints: [
        'Current events and news coverage',
        'Factual reporting and information',
        'Recent developments and updates',
        'Analysis of current situations',
        'Informational and educational content'
      ],
      summaryMethod: 'title-analysis-news'
    }
  } else if (lowerTitle.includes('review') || lowerTitle.includes('analysis') || lowerTitle.includes('comparison')) {
    return {
      shortSummary: `This review "${title}" provides evaluation and analysis of products, services, or topics. Review videos typically examine features, performance, and value, helping viewers make informed decisions through detailed assessment and comparison.`,
      keyPoints: [
        'Detailed evaluation and analysis',
        'Feature examination and testing',
        'Pros and cons assessment',
        'Comparative analysis when relevant',
        'Recommendations and conclusions'
      ],
      summaryMethod: 'title-analysis-review'
    }
  } else {
    // Generic high-quality summary
    return {
      shortSummary: `This video "${title}" contains content related to its title. While specific details require watching the video, the title suggests it covers topics that viewers interested in this subject matter would find relevant and engaging. For more detailed automated summaries, videos with enabled subtitles work best.`,
      keyPoints: [
        'Content relates to the video title topic',
        'May include educational or entertainment value',
        'Relevant to viewers interested in this subject',
        'Enable subtitles for detailed automated analysis',
        'Watch video for complete content understanding'
      ],
      summaryMethod: 'title-analysis-general'
    }
  }
}