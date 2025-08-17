"use client"

import { PageHero } from "@/components/brand/page-hero"
import { GlassCard } from "@/components/brand/glass-card"
import { Shield, Sparkles } from 'lucide-react'

const sections = [
  {
    title: "Information We Collect",
    content:
      "We collect account details, usage analytics, and technical telemetry to operate and improve the platform. You can request export or deletion of your data subject to legal requirements.",
  },
  {
    title: "How We Use Information",
    content:
      "To authenticate users, provide services, process payouts, prevent fraud, and inform product decisions in aggregate. We do not sell personal data.",
  },
  {
    title: "Cookies & Tracking",
    content:
      "We use cookies and similar technologies for authentication, preferences, and performance insights. You can control cookies via your browser settings.",
  },
  {
    title: "Data Retention",
    content:
      "We retain information for as long as needed to provide the service and comply with legal obligations. Backups are rotated on a rolling basis.",
  },
  {
    title: "Your Rights",
    content:
      "Access, correction, deletion, and portability where applicable. Contact us to exercise your rights and we’ll respond within a reasonable timeframe.",
  },
  {
    title: "Contact",
    content:
      "For privacy inquiries, reach us at privacy@lendgrid.example.",
  },
]

export default function PrivacyPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Legal"
        title="Privacy Policy"
        subtitle="How we collect, use, and protect your data."
        icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
      />
      <div className="mx-auto mt-10 max-w-4xl space-y-6 px-4">
        {sections.map((s, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex items-start gap-3">
              <Shield className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />
              <div>
                <h3 className="text-lg font-semibold">{s.title}</h3>
                <p className="mt-2 text-sm text-white/70">{s.content}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
