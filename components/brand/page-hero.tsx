"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import * as React from "react"

type PageHeroProps = {
    eyebrow?: string
    title?: string
    subtitle?: string
    icon?: React.ReactNode
}

export function PageHero({
    eyebrow = "Welcome",
    title = "Title",
    subtitle = "Subtitle",
    icon,
}: PageHeroProps) {
    return (
        <div className="relative px-4 pt-20 md:pt-28">
            <motion.div
                initial={{ y: 12, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 16 }}
                className="mx-auto max-w-4xl text-center"
            >
                <div className="mb-4 inline-flex items-center gap-2 text-yellow-300/90">
                    {icon}
                    <span className="text-xs font-medium tracking-wider uppercase">{eyebrow}</span>
                </div>
                <h1
                    className={cn(
                        "text-balance text-3xl font-semibold tracking-tight md:text-5xl",
                        "bg-clip-text text-transparent",
                        "bg-gradient-to-r from-yellow-300 via-amber-200 to-blue-400"
                    )}
                >
                    {title}
                </h1>
                <p className="mt-4 text-pretty text-base text-white/70 md:text-lg">{subtitle}</p>
            </motion.div>
        </div>
    )
}
