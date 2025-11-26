"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function PrivacyPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />

      <main className="flex-1 pt-16">
        <section className="px-4 py-20 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-3xl prose prose-invert"
          >
            <h1 style={{ fontFamily: "var(--font-poppins)" }} className="text-foreground">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground text-lg">Last updated: January 2025</p>

            <h2 className="text-foreground">1. Introduction</h2>
            <p className="text-muted-foreground">
              At Aurix, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and
              safeguard your information when you use our AI-powered video summarization service.
            </p>

            <h2 className="text-foreground">2. Information We Collect</h2>
            <p className="text-muted-foreground">We collect information that you provide directly to us, including:</p>
            <ul className="text-muted-foreground">
              <li>YouTube video URLs you submit for summarization</li>
              <li>Account information (email, name) if you create an account</li>
              <li>Communication data when you contact us</li>
              <li>Usage data and analytics</li>
            </ul>

            <h2 className="text-foreground">3. How We Use Your Information</h2>
            <p className="text-muted-foreground">We use the information we collect to:</p>
            <ul className="text-muted-foreground">
              <li>Provide and improve our video summarization service</li>
              <li>Send you updates and marketing communications (with your consent)</li>
              <li>Respond to your comments and questions</li>
              <li>Analyze usage patterns to improve our service</li>
            </ul>

            <h2 className="text-foreground">4. Data Retention</h2>
            <p className="text-muted-foreground">
              We do not permanently store video content. Video data is processed in real-time and deleted immediately
              after summarization. Account data is retained until you request deletion.
            </p>

            <h2 className="text-foreground">5. Data Security</h2>
            <p className="text-muted-foreground">
              We implement appropriate technical and organizational security measures to protect your personal
              information against unauthorized access, alteration, disclosure, or destruction.
            </p>

            <h2 className="text-foreground">6. Third-Party Services</h2>
            <p className="text-muted-foreground">
              We may use third-party services for analytics, hosting, and payment processing. These services have their
              own privacy policies governing the use of your information.
            </p>

            <h2 className="text-foreground">7. Your Rights</h2>
            <p className="text-muted-foreground">You have the right to:</p>
            <ul className="text-muted-foreground">
              <li>Access your personal data</li>
              <li>Correct inaccurate data</li>
              <li>Request deletion of your data</li>
              <li>Object to processing of your data</li>
              <li>Data portability</li>
            </ul>

            <h2 className="text-foreground">8. Contact Us</h2>
            <p className="text-muted-foreground">
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:privacy@aurix.ai" className="text-primary hover:underline">
                privacy@aurix.ai
              </a>
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
