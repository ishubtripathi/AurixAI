"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Shield, Globe, Target, Heart, Users } from "lucide-react"

const features = [
  {
    icon: Sparkles,
    title: "AI-Powered",
    description:
      "Advanced machine learning models analyze video content to generate accurate, comprehensive summaries.",
  },
  {
    icon: Zap,
    title: "Lightning Fast",
    description: "Get summaries in seconds, not minutes. Our optimized pipeline delivers results quickly.",
  },
  {
    icon: Shield,
    title: "Privacy First",
    description: "We never store your video data. All processing is done securely and data is deleted after use.",
  },
  {
    icon: Globe,
    title: "Any Video",
    description: "Works with any public YouTube video in any language. No limits on video length.",
  },
]

const values = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To democratize access to knowledge by making video content instantly digestible for everyone.",
  },
  {
    icon: Heart,
    title: "Our Values",
    description:
      "We believe in transparency, user privacy, and building tools that genuinely help people learn faster.",
  },
  {
    icon: Users,
    title: "Our Team",
    description:
      "A passionate group of engineers and designers dedicated to revolutionizing how we consume video content.",
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
}

export default function AboutPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {/* Page Header */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center"
            >
              <h1
                className="text-4xl font-bold tracking-tight sm:text-5xl"
                style={{ fontFamily: "var(--font-poppins)" }}
              >
                About <span className="text-primary">Aurix</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Aurix is an AI-powered tool designed to help you extract valuable insights from YouTube videos without
                watching them in full. Save time while staying informed.
              </p>
            </motion.div>

            {/* Mission Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mt-16"
            >
              <Card className="border-border bg-card">
                <CardContent className="p-8 text-center">
                  <h2 className="text-2xl font-semibold mb-4" style={{ fontFamily: "var(--font-poppins)" }}>
                    Watch Less, Understand More
                  </h2>
                  <p className="text-muted-foreground text-lg leading-relaxed">
                    In a world overflowing with video content, we believe everyone deserves quick access to knowledge.
                    Aurix transforms hours of video into minutes of reading, helping you learn faster and more
                    efficiently. Whether you are a student, professional, or lifelong learner, we are here to help you
                    make the most of your time.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Values */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-16">
              <h2 className="text-2xl font-semibold text-center mb-8" style={{ fontFamily: "var(--font-poppins)" }}>
                What Drives Us
              </h2>
              <div className="grid gap-6 sm:grid-cols-3">
                {values.map((value) => (
                  <motion.div key={value.title} variants={itemVariants}>
                    <Card className="h-full border-border bg-card">
                      <CardContent className="p-6 text-center">
                        <div className="flex h-12 w-12 mx-auto items-center justify-center rounded-xl bg-primary/10 mb-4">
                          <value.icon className="h-6 w-6 text-primary" />
                        </div>
                        <h3 className="font-semibold text-lg mb-2">{value.title}</h3>
                        <p className="text-sm text-muted-foreground">{value.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Features Grid */}
            <motion.div variants={containerVariants} initial="hidden" animate="visible" className="mt-16">
              <h2 className="text-2xl font-semibold text-center mb-8" style={{ fontFamily: "var(--font-poppins)" }}>
                Why Choose Aurix?
              </h2>
              <div className="grid gap-6 sm:grid-cols-2">
                {features.map((feature) => (
                  <motion.div key={feature.title} variants={itemVariants}>
                    <Card className="h-full border-border bg-card">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                            <feature.icon className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-semibold text-lg">{feature.title}</h3>
                            <p className="mt-2 text-sm text-muted-foreground">{feature.description}</p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* How It Works */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="mt-16"
            >
              <h2 className="text-2xl font-semibold text-center mb-8" style={{ fontFamily: "var(--font-poppins)" }}>
                How It Works
              </h2>
              <div className="flex flex-col gap-4 sm:flex-row sm:gap-8">
                {[
                  { step: "1", title: "Paste URL", desc: "Copy any YouTube video link" },
                  { step: "2", title: "AI Analysis", desc: "Our AI processes the content" },
                  { step: "3", title: "Get Summary", desc: "Receive instant insights" },
                ].map((item, index) => (
                  <motion.div
                    key={item.step}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + index * 0.1 }}
                    className="flex-1 text-center p-6 rounded-xl bg-secondary/50"
                  >
                    <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold">
                      {item.step}
                    </div>
                    <h3 className="mt-4 font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-muted-foreground">{item.desc}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
