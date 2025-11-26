"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import Link from "next/link"
import { Button } from "@/components/ui/button"

const faqs = [
  {
    question: "What is Aurix?",
    answer:
      "Aurix is an AI-powered tool that summarizes YouTube videos instantly. Simply paste a video URL and get a comprehensive summary in seconds, saving you hours of watching time.",
  },
  {
    question: "How does Aurix work?",
    answer:
      "Aurix uses advanced AI models to analyze video content, including audio transcription and visual analysis. Our algorithms extract key points, main themes, and important details to create accurate summaries.",
  },
  {
    question: "Is Aurix free to use?",
    answer:
      "Yes! Aurix offers a free tier with 5 video summaries per day. For unlimited access and additional features, you can upgrade to our Pro or Team plans.",
  },
  {
    question: "What types of videos can I summarize?",
    answer:
      "Aurix works with any public YouTube video, regardless of length or language. This includes educational content, tutorials, podcasts, lectures, interviews, and more.",
  },
  {
    question: "How accurate are the summaries?",
    answer:
      "Our AI is trained on millions of videos and continuously improved. While no AI is perfect, Aurix consistently delivers accurate, comprehensive summaries that capture the essence of the video content.",
  },
  {
    question: "Is my data safe?",
    answer:
      "Absolutely. We prioritize your privacy. We don't store video content or personal data beyond what's necessary for the service. All processing is done securely, and data is deleted immediately after use.",
  },
  {
    question: "Can I export or share summaries?",
    answer:
      "Yes! You can easily copy summaries to your clipboard with one click. Pro users get additional export options including PDF, Markdown, and direct sharing to social platforms.",
  },
  {
    question: "Do you support videos in other languages?",
    answer:
      "Yes, Aurix supports videos in any language. Our AI can process and summarize content from around the world, delivering summaries in the video's original language.",
  },
  {
    question: "What's the maximum video length?",
    answer:
      "Free users can summarize videos up to 30 minutes. Pro and Team users have no length restrictions and can summarize videos of any duration.",
  },
  {
    question: "How can I get support?",
    answer:
      "You can reach us through our contact page, email us at support@aurix.ai, or check our documentation. Pro and Team users get priority support with faster response times.",
  },
]

export default function FAQPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-3xl">
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
                Frequently Asked <span className="text-primary">Questions</span>
              </h1>
              <p className="mt-6 text-lg text-muted-foreground">
                Everything you need to know about Aurix. Can not find what you are looking for?{" "}
                <Link href="/contact" className="text-primary hover:underline">
                  Contact us
                </Link>
              </p>
            </motion.div>

            {/* FAQ Accordion */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Accordion type="single" collapsible className="space-y-4">
                {faqs.map((faq, index) => (
                  <AccordionItem
                    key={index}
                    value={`item-${index}`}
                    className="border border-border rounded-lg bg-card px-6 data-[state=open]:bg-secondary/30"
                  >
                    <AccordionTrigger className="text-left hover:no-underline py-4">
                      <span className="font-medium">{faq.question}</span>
                    </AccordionTrigger>
                    <AccordionContent className="pb-4 text-muted-foreground">{faq.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>

            {/* CTA */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-16 text-center"
            >
              <p className="text-muted-foreground mb-4">Still have questions?</p>
              <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                <Button asChild>
                  <Link href="/contact">Contact Support</Link>
                </Button>
              </motion.div>
            </motion.div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
