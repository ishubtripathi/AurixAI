"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import {
  Sparkles,
  Zap,
  Shield,
  Globe,
  Copy,
  Clock,
  Languages,
  Bookmark,
  Share2,
  Brain,
  Layers,
  Smartphone,
} from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered Summaries",
    description:
      "Advanced machine learning models analyze video content to generate accurate, comprehensive summaries in seconds.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description:
      "Get summaries in seconds, not minutes. Our optimized pipeline delivers results quickly without sacrificing quality.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description:
      "We never store your video data. All processing is done securely and data is deleted immediately after use.",
  },
  {
    icon: Globe,
    title: "Any Video",
    description: "Works with any public YouTube video in any language. No limits on video length or content type.",
  },
  {
    icon: Copy,
    title: "One-Click Copy",
    description: "Easily copy summaries to your clipboard for notes, emails, or sharing with a single click.",
  },
  {
    icon: Clock,
    title: "Time Stamps",
    description: "Get key moments with timestamps so you can jump directly to the most important parts of the video.",
  },
  {
    icon: Languages,
    title: "Multi-Language",
    description: "Summarize videos in any language. Our AI understands and processes content from around the world.",
  },
  {
    icon: Bookmark,
    title: "Save for Later",
    description: "Bookmark your favorite summaries and access them anytime from your personal dashboard.",
  },
  {
    icon: Share2,
    title: "Easy Sharing",
    description: "Share summaries with colleagues, friends, or on social media with beautifully formatted exports.",
  },
  {
    icon: Brain,
    title: "Smart Insights",
    description: "Get key takeaways, action items, and important concepts extracted automatically from any video.",
  },
  {
    icon: Layers,
    title: "Multiple Formats",
    description: "Choose between quick summaries, detailed breakdowns, or bullet points based on your needs.",
  },
  {
    icon: Smartphone,
    title: "Mobile Friendly",
    description:
      "Access Aurix from any device. Our responsive design works perfectly on phones, tablets, and desktops.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.05 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function FeaturesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center mb-16"
            >
              <h1
                className="text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                Powerful <span className="text-primary">Features</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to save time and stay informed. Aurix comes packed with features designed to make
                video learning effortless.
              </p>
            </motion.div>

            {/* Features Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
            >
              {features.map((feature) => (
                <motion.div key={feature.title} variants={itemVariants}>
                  <Card className="h-full border-border bg-card hover:bg-secondary/30 transition-colors duration-300">
                    <CardContent className="p-6">
                      <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 mb-4">
                        <feature.icon className="h-6 w-6 text-primary" />
                      </div>
                      <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                      <p className="text-sm text-muted-foreground">{feature.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
