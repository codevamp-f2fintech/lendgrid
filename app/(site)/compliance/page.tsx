"use client"

import { PageHero } from "@/components/brand/page-hero"
import { GlassCard } from "@/components/brand/glass-card"
import { Scale, ShieldCheck, FileCheck, Building2, Sparkles } from 'lucide-react'

const items = [
  {
    icon: <Scale className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />,
    title: "Regulatory Alignment",
    desc: "We align with applicable finance and data regulations and adapt to evolving guidance.",
  },
  {
    icon: <FileCheck className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />,
    title: "Policies & Controls",
    desc: "Access controls, change management, incident response, and vendor risk reviews are in place.",
  },
  {
    icon: <ShieldCheck className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />,
    title: "Data Protection",
    desc: "Encryption in transit and at rest, strict role-based access, and least-privilege principles.",
  },
  {
    icon: <Building2 className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />,
    title: "Audit Readiness",
    desc: "Evidence collection and continuous monitoring for streamlined audits and assessments.",
  },
]

export default function CompliancePage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Legal"
        title="Compliance"
        subtitle="Our program is built on transparency, controls, and continuous improvement."
        icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
      />
      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-2">
        {items.map((card, i) => (
          <GlassCard key={i} className="p-6">
            <div className="flex items-start gap-3">
              {card.icon}
              <div>
                <h3 className="text-lg font-semibold">{card.title}</h3>
                <p className="mt-2 text-sm text-white/70">{card.desc}</p>
              </div>
            </div>
          </GlassCard>
        ))}
      </div>
    </div>
  )
}
