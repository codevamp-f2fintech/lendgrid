"use client"

import { PageHero } from "@/components/brand/page-hero"
import { GlassCard } from "@/components/brand/glass-card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send, Sparkles } from 'lucide-react'
import { useActionState } from "react"
import { submitContact } from "./actions"

export default function ContactPage() {
  const [state, formAction, pending] = useActionState(submitContact, {
    ok: false,
    message: "",
    echo: {},
  } as any)

  return (
    <div className="pb-24">
      <PageHero
        eyebrow="Company"
        title="Contact Us"
        subtitle="Have questions about partnerships, pricing, or onboarding? We’d love to help."
        icon={<Sparkles className="h-4 w-4" aria-hidden="true" />}
      />

      <div className="mx-auto mt-10 grid max-w-6xl grid-cols-1 gap-6 px-4 md:grid-cols-3">
        <GlassCard className="p-8 md:col-span-2">
          <form action={formAction} className="grid grid-cols-1 gap-5 md:grid-cols-2">
            <div>
              <Label htmlFor="name">Full name</Label>
              <Input id="name" name="name" placeholder="Jane Doe" required className="mt-2 bg-white/5" />
            </div>
            <div>
              <Label htmlFor="email">Email</Label>
              <Input id="email" name="email" type="email" placeholder="you@company.com" required className="mt-2 bg-white/5" />
            </div>
            <div>
              <Label htmlFor="company">Company</Label>
              <Input id="company" name="company" placeholder="Acme Corp" className="mt-2 bg-white/5" />
            </div>
            <div>
              <Label htmlFor="subject">Subject</Label>
              <Input id="subject" name="subject" placeholder="Tell us how we can help" className="mt-2 bg-white/5" />
            </div>
            <div className="md:col-span-2">
              <Label htmlFor="message">Message</Label>
              <Textarea id="message" name="message" placeholder="Write your message..." required className="mt-2 bg-white/5" rows={6} />
            </div>
            <div className="md:col-span-2">
              <Button
                type="submit"
                size="lg"
                disabled={pending}
                className="group relative w-full bg-gradient-to-r from-yellow-400 via-amber-300 to-blue-500 text-[#0B1220] font-semibold shadow-[0_10px_30px_-10px_rgba(252,211,77,0.6),0_6px_20px_-12px_rgba(59,130,246,0.5)] transition-all duration-300 hover:from-yellow-300 hover:via-amber-200 hover:to-blue-400"
              >
                <span className="inline-flex items-center gap-2">
                  <Send className="h-4 w-4" aria-hidden="true" />
                  {pending ? "Sending..." : "Send message"}
                </span>
                <span aria-hidden="true" className="pointer-events-none absolute inset-0 -translate-x-full bg-[linear-gradient(120deg,transparent,rgba(255,255,255,0.5),transparent)] transition-transform duration-700 ease-out group-hover:translate-x-full" />
              </Button>
              {!!state?.message && (
                <p className={`mt-3 text-sm ${state?.ok ? "text-green-300/80" : "text-red-300/80"}`}>{state.message}</p>
              )}
            </div>
          </form>
        </GlassCard>

        <GlassCard className="p-8">
          <h3 className="text-lg font-semibold">Get in touch</h3>
          <ul className="mt-4 space-y-3 text-sm text-white/80">
            <li className="flex items-center gap-3">
              <Mail className="h-4 w-4 text-yellow-300/90" aria-hidden="true" />
              <a href="mailto:hello@lendgrid.example" className="hover:underline">hello@lendgrid.example</a>
            </li>
            <li className="flex items-center gap-3">
              <Phone className="h-4 w-4 text-yellow-300/90" aria-hidden="true" />
              <a href="tel:+10000000000" className="hover:underline">+1 (000) 000-0000</a>
            </li>
            <li className="flex items-start gap-3">
              <MapPin className="mt-0.5 h-4 w-4 text-yellow-300/90" aria-hidden="true" />
              <span>101 Market Street, Suite 500, San Francisco, CA</span>
            </li>
          </ul>
        </GlassCard>
      </div>
    </div>
  )
}
