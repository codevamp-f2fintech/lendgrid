"use client"

import { PageHero } from "@/components/brand/page-hero"
import { GlassCard } from "@/components/brand/glass-card"
import { FileText, Sparkles } from 'lucide-react'

const terms = [
  { h: "Acceptance of Terms", p: "By accessing LendGrid, you agree to these Terms and all referenced policies." },
  { h: "Accounts & Access", p: "You are responsible for activity under your account and must keep credentials confidential." },
  { h: "Permitted Use", p: "Do not misuse the service, attempt to disrupt operations, or access data without authorization." },
  { h: "Fees & Payouts", p: "Where applicable, fees and commission splits are displayed transparently within the dashboard." },
  { h: "Intellectual Property", p: "All platform IP remains the property of LendGrid and its licensors." },
  { h: "Warranties & Disclaimers", p: "Service is provided 'as is' to the fullest extent permitted by law." },
  { h: "Limitation of Liability", p: "We are not liable for indirect or consequential damages beyond the amount paid in the prior 12 months." },
  { h: "Termination", p: "We may suspend or terminate access for breach or security concerns." },
  { h: "Governing Law", p: "These Terms are governed by applicable laws of your jurisdiction unless otherwise required." },
  { h: "Changes", p: "We may update these Terms. Continued use indicates acceptance of changes." },
]

export default function TermsPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Legal"
        title="Terms of Service"
        subtitle="Your agreement with LendGrid regarding access and use of the platform."
        icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
      />
      <div className="mx-auto mt-10 max-w-4xl space-y-6 px-4">
        {terms.map((t, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex items-start gap-3">
              <FileText className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-semibold">{t.h}</h3>
                <p className="mt-2 text-sm text-white/70">{t.p}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
