"use client"

import { PageHero } from "@/components/brand/page-hero"
import { GlassCard } from "@/components/brand/glass-card"
import { Building2, Target, Users, Star, Sparkles } from 'lucide-react'
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Company"
        title="About LendGrid"
        subtitle="Empowering the future of loan distribution with transparent payouts, actionable insights, and seamless integrations."
        icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
      />

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <Target className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Our Mission</h3>
              <p className="mt-2 text-sm text-white/70">
                To simplify and scale loan distribution for aggregators and lenders through automation, clarity, and trust.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <Building2 className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">What We Build</h3>
              <p className="mt-2 text-sm text-white/70">
                Real-time commission tracking, automated payouts, and a verified network to connect high-quality partners.
              </p>
            </div>
          </div>
        </GlassCard>
        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <Users className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Who We Serve</h3>
              <p className="mt-2 text-sm text-white/70">
                DSAs, aggregators, and lenders seeking transparency, efficiency, and growth.
              </p>
            </div>
          </div>
        </GlassCard>
      </div>

      {/* Team preview */}
      <div className="mx-auto mt-10 max-w-6xl px-4">
        <GlassCard className="p-8">
          <div className="mb-6 flex items-center gap-2">
            <Star className="h-4 w-4 text-yellow-300/90" aria-hidden="true" />
            <h3 className="text-lg font-semibold">Leadership</h3>
          </div>
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {["A", "B", "C", "D"].map((p, i) => (
              <div key={i} className="flex flex-col items-center gap-3">
                <div className="relative h-20 w-20 overflow-hidden rounded-full ring-1 ring-white/10">
                  <Image
                    src="/placeholder.svg?height=80&width=80"
                    alt={"Team member avatar " + (i + 1)}
                    fill
                    sizes="80px"
                    className="object-cover"
                  />
                </div>
                <div className="text-sm font-medium">Member {i + 1}</div>
                <div className="text-xs text-white/60">Role</div>
              </div>
            ))}
          </div>
        </GlassCard>
      </div>
    </div>
  )
}
