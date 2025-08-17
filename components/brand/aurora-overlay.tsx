"use client"

import { motion } from "framer-motion"

/**
 * Optional animated orbs to keep parity with the brand look on both themes.
 */
export function AuroraOverlay() {
    return (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <motion.div
                className="absolute -top-24 -left-20 h-80 w-80 rounded-full bg-[var(--accent-start)]/25 blur-3xl"
                animate={{ y: [0, 10, -6, 0], x: [0, 6, -4, 0] }}
                transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
            />
            <motion.div
                className="absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[var(--accent-end)]/25 blur-3xl"
                animate={{ y: [0, -12, 8, 0], x: [0, -6, 4, 0] }}
                transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
            />
        </div>
    )
}
