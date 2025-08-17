"use client"

import * as React from "react"
import { useTheme } from "next-themes"
import { motion, AnimatePresence } from "framer-motion"
import { Moon, Sun, Sparkles } from 'lucide-react'
import { cn } from "@/lib/utils"

/**
 * Animated Theme Toggle:
 * - Glassy track with gradient glow and moving knob
 * - Sun/Moon icon morph with cross-fade
 * - Halo + spark particles when switching
 * - Accessible and keyboard operable
 */
export function ThemeToggle({
    className,
    label = "Toggle theme",
}: {
    className?: string
    label?: string
}) {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = React.useState(false)
    React.useEffect(() => setMounted(true), [])
    if (!mounted) return null

    const isDark = resolvedTheme === "dark"

    function onToggle() {
        setTheme(isDark ? "light" : "dark")
    }

    return (
        <div className={cn("relative", className)}>
            {/* subtle halo */}
            <motion.div
                aria-hidden="true"
                className="pointer-events-none absolute -inset-3 rounded-full"
                animate={{ boxShadow: isDark ? "0 0 80px 10px rgba(0,122,255,0.25)" : "0 0 80px 10px rgba(255,215,0,0.25)" }}
                transition={{ type: "spring", stiffness: 80, damping: 18 }}
            />
            <button
                type="button"
                onClick={onToggle}
                aria-label={label}
                className={cn(
                    "relative h-12 w-[84px] cursor-pointer rounded-full px-1",
                    "glass-card ring-app transition-all duration-300",
                    "hover:scale-[1.02] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-yellow-300/60"
                )}
            >
                {/* gradient backdrop */}
                <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ background: "linear-gradient(90deg, var(--accent-start), var(--accent-end))", opacity: 0.18 }}
                    animate={{ opacity: isDark ? 0.18 : 0.22 }}
                />
                {/* track content */}
                <div className="relative z-10 flex h-full items-center justify-between px-2">
                    <IconWrap active={!isDark} icon="sun" />
                    <IconWrap active={isDark} icon="moon" />
                </div>

                {/* knob */}
                <motion.span
                    layout
                    className="absolute top-1 h-10 w-10 rounded-full bg-white/90 shadow-[0_10px_30px_-10px_rgba(0,0,0,0.5)] dark:bg-white/80"
                    initial={false}
                    animate={{ left: isDark ? 44 : 2 }}
                    transition={{ type: "spring", stiffness: 500, damping: 34 }}
                />

                {/* spark particles on toggle */}
                <AnimatePresence>
                    <Particles burstKey={isDark ? "dark" : "light"} />
                </AnimatePresence>
            </button>
        </div>
    )
}

function IconWrap({ active, icon }: { active: boolean; icon: "sun" | "moon" }) {
    const Icon = icon === "sun" ? Sun : Moon
    return (
        <motion.span
            className={cn("flex items-center justify-center", active ? "text-yellow-400" : "text-white/60")}
            initial={false}
            animate={{ scale: active ? 1 : 0.9, opacity: active ? 1 : 0.6 }}
            transition={{ type: "spring", stiffness: 200, damping: 16 }}
        >
            <Icon className="h-5 w-5" aria-hidden="true" />
        </motion.span>
    )
}

function Particles({ burstKey }: { burstKey: string }) {
    const dots = React.useMemo(() => Array.from({ length: 8 }), [burstKey])
    return (
        <motion.div
            key={burstKey}
            className="pointer-events-none absolute inset-0"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, transition: { duration: 0.2 } }}
        >
            {dots.map((_, i) => {
                const angle = (i / dots.length) * Math.PI * 2
                const r = 22
                return (
                    <motion.span
                        key={i}
                        className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white/80"
                        initial={{ x: 0, y: 0, scale: 0.6, opacity: 0.9 }}
                        animate={{ x: Math.cos(angle) * r, y: Math.sin(angle) * r, scale: 0, opacity: 0 }}
                        transition={{ duration: 0.7, ease: "easeOut" }}
                    />
                )
            })}
        </motion.div>
    )
}
