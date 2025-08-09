"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type AuroraBackgroundProps = {
    className?: string
    intensity?: number
    showParticles?: boolean
}

export function AuroraBackground({
    className,
    intensity = 1,
    showParticles = true,
}: AuroraBackgroundProps) {
    const orb = (extra: string) =>
        cn(
            "absolute rounded-full blur-3xl pointer-events-none",
            extra
        )

    return (
        <div aria-hidden="true" className={cn("absolute inset-0", className)}>
            {/* Deep radial base */}
            <div className="absolute inset-0 bg-[radial-gradient(1200px_600px_at_50%_-20%,rgba(24,34,58,0.8),rgba(11,18,32,1))]" />
            {/* Yellow / Blue brand orbs */}
            <motion.div
                className={orb("-top-24 -left-20 h-80 w-80 bg-yellow-400/30")}
                animate={{ y: [0, 10 * intensity, -6 * intensity, 0], x: [0, 6 * intensity, -4 * intensity, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className={orb("-bottom-24 -right-24 h-96 w-96 bg-blue-500/30")}
                animate={{ y: [0, -12 * intensity, 8 * intensity, 0], x: [0, -6 * intensity, 4 * intensity, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(88,199,250,0.05),transparent_60%)]" />
            {/* Optional subtle particles */}
            {showParticles && (
                <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 18 }).map((_, i) => (
                        <motion.span
                            key={i}
                            className="absolute h-1.5 w-1.5 rounded-full bg-white/12 shadow-[0_0_10px_rgba(255,255,255,0.15)]"
                            style={{ top: `${(i * 137) % 100}%`, left: `${(i * 89) % 100}%` }}
                            animate={{ y: [0, -8, 0], opacity: [0.35, 0.7, 0.35] }}
                            transition={{ duration: 4 + (i % 5), delay: i * 0.12, repeat: Infinity, ease: "easeInOut" }}
                        />
                    ))}
                </div>
            )}
            {/* Vignette */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(1200px_400px_at_center,transparent,rgba(0,0,0,0.45))]" />
        </div>
    )
}
