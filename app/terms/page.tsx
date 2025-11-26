"use client"

import { motion } from "framer-motion"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"

export default function TermsPage() {
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
              Terms of Service
            </h1>
            <p className="text-muted-foreground text-lg">Last updated: January 2025</p>

            <h2 className="text-foreground">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground">
              By accessing and using Aurix, you accept and agree to be bound by the terms and provisions of this
              agreement. If you do not agree to these terms, please do not use our service.
            </p>

            <h2 className="text-foreground">2. Description of Service</h2>
            <p className="text-muted-foreground">
              Aurix provides an AI-powered video summarization service that generates text summaries from YouTube video
              content. The service is provided as is and we make no warranties regarding accuracy or completeness of
              summaries.
            </p>

            <h2 className="text-foreground">3. User Responsibilities</h2>
            <p className="text-muted-foreground">You agree to:</p>
            <ul className="text-muted-foreground">
              <li>Use the service only for lawful purposes</li>
              <li>Not attempt to reverse engineer or exploit our AI systems</li>
              <li>Not use the service to infringe on copyright or intellectual property</li>
              <li>Provide accurate information when creating an account</li>
              <li>Maintain the security of your account credentials</li>
            </ul>

            <h2 className="text-foreground">4. Intellectual Property</h2>
            <p className="text-muted-foreground">
              The Aurix service, including its original content, features, and functionality, is owned by Aurix and is
              protected by international copyright, trademark, and other intellectual property laws.
            </p>

            <h2 className="text-foreground">5. User Content</h2>
            <p className="text-muted-foreground">
              You retain ownership of the video URLs you submit. By using our service, you grant us a limited license to
              process the video content solely for the purpose of generating summaries.
            </p>

            <h2 className="text-foreground">6. Limitation of Liability</h2>
            <p className="text-muted-foreground">
              Aurix shall not be liable for any indirect, incidental, special, consequential, or punitive damages
              resulting from your use of or inability to use the service.
            </p>

            <h2 className="text-foreground">7. Service Availability</h2>
            <p className="text-muted-foreground">
              We strive to maintain high availability but do not guarantee uninterrupted access. We reserve the right to
              modify or discontinue the service at any time.
            </p>

            <h2 className="text-foreground">8. Pricing and Payments</h2>
            <p className="text-muted-foreground">
              Free tier limitations and paid subscription terms are subject to change. We will notify users of
              significant changes to pricing or features.
            </p>

            <h2 className="text-foreground">9. Termination</h2>
            <p className="text-muted-foreground">
              We may terminate or suspend your account and access to the service immediately, without prior notice, for
              conduct that we believe violates these Terms or is harmful to other users, us, or third parties.
            </p>

            <h2 className="text-foreground">10. Changes to Terms</h2>
            <p className="text-muted-foreground">
              We reserve the right to modify these terms at any time. Continued use of the service after changes
              constitutes acceptance of the new terms.
            </p>

            <h2 className="text-foreground">11. Contact</h2>
            <p className="text-muted-foreground">
              For questions about these Terms, please contact us at{" "}
              <a href="mailto:legal@aurix.ai" className="text-primary hover:underline">
                legal@aurix.ai
              </a>
            </p>
          </motion.div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
