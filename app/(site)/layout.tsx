import * as React from "react"
import { AuroraBackground } from "@/components/brand/aurora-background"

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <main className="relative min-h-[100svh] w-full bg-[#0B1220] text-white">
      <AuroraBackground intensity={1} showParticles />
      <div className="relative z-10">{children}</div>
    </main>
  )
}
