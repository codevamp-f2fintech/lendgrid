"use client"

import { PageHero } from "@/components/brand/page-hero"
import { GlassCard } from "@/components/brand/glass-card"
import { Shield, Lock, Network, Bug, Activity, Sparkles } from 'lucide-react'
import * as Accordion from "@radix-ui/react-accordion"
import { cn } from "@/lib/utils"

const sections = [
  { icon: <Lock className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />, h: "Encryption", p: "TLS 1.2+ in transit and AES-256 at rest for supported storage." },
  { icon: <Network className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />, h: "Network Security", p: "Firewalls, private networks, and least-privilege access for internal services." },
  { icon: <Bug className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />, h: "App Security", p: "Secure SDLC, code reviews, dependency scanning, and secret hygiene." },
  { icon: <Activity className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />, h: "Monitoring & IR", p: "Logging, alerting, and an incident response process with post-incident reviews." },
]

export default function SecurityPage() {
  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Legal"
        title="Security"
        subtitle="Security is a foundational requirement—by design, not as an afterthought."
        icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
      />

      <div className="mx-auto mt-10 max-w-4xl space-y-6 px-4">
        <GlassCard className="p-6">
          <div className="flex items-start gap-3">
            <Shield className="h-5 w-5 text-yellow-300/90" aria-hidden="true" />
            <div>
              <h3 className="text-lg font-semibold">Program Overview</h3>
              <p className="mt-2 text-sm text-white/70">
                Our security program covers people, process, and technology—continuously improving with risk-based prioritization.
              </p>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-0">
          <Accordion.Root type="multiple" className="w-full">
            {sections.map((s, i) => (
              <Accordion.Item key={i} value={`item-${i}`} className="border-b border-white/10">
                <Accordion.Header>
                  <Accordion.Trigger
                    className={cn(
                      "flex w-full items-center justify-between gap-4 p-5 text-left",
                      "data-[state=open]:bg-white/5"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      {s.icon}
                      <span className="text-base font-medium">{s.h}</span>
                    </div>
                    <span className="text-white/50">+</span>
                  </Accordion.Trigger>
                </Accordion.Header>
                <Accordion.Content className="px-5 pb-5 text-sm text-white/70">
                  {s.p}
                </Accordion.Content>
              </Accordion.Item>
            ))}
          </Accordion.Root>
        </GlassCard>
      </div>
    </div>
  )
}
