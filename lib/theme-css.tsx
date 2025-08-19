"use client"

import { theme } from "./theme"

/**
 * Injects CSS variables for light and dark themes using styled-jsx.
 * We rely on next-themes adding "class" to <html> and toggling "dark".
 * This approach keeps the design token source-of-truth in your theme object. [^1]
 */
export function ThemeCSS() {
    const t = theme
    const lightBg = t.colors.gray[50]
    const lightFg = t.colors.gray[900]
    const darkBg = t.colors.dark
    const darkFg = t.colors.white
    const gold = t.colors.gold
    const blue = t.colors.blue

    return (
        <style jsx global>{`
      :root {
        --bg: ${lightBg};
        --fg: ${lightFg};
        --card: rgba(255, 255, 255, 0.6);
        --card-border: ${t.colors.gray[200]};
        --muted: ${t.colors.gray[600]};
        --shadow-strong: 0 20px 80px -20px rgba(0, 0, 0, 0.2), 0 10px 30px -10px rgba(0, 0, 0, 0.15);
        --glass: blur(14px);
        --accent-start: ${gold};
        --accent-end: ${blue};
        --ring: rgba(0, 0, 0, 0.1);
      }

      html.dark {
        --bg: ${darkBg};
        --fg: ${darkFg};
        --card: rgba(255, 255, 255, 0.06);
        --card-border: rgba(255, 255, 255, 0.1);
        --muted: ${t.colors.gray[300]};
        --shadow-strong: 0 20px 80px -20px rgba(0, 0, 0, 0.6), 0 10px 30px -10px rgba(13, 18, 28, 0.7);
        --glass: blur(20px);
        --accent-start: ${gold};
        --accent-end: ${blue};
        --ring: rgba(255, 255, 255, 0.12);
      }

      /* Helper utility classes that leverage the CSS variables */
      .bg-app {
        background: radial-gradient(1200px 600px at 50% -20%, rgba(24, 34, 58, 0.08), transparent 50%), var(--bg);
      }
      .text-app { color: var(--fg); }
      .glass-card {
        backdrop-filter: var(--glass);
        background: var(--card);
        border: 1px solid var(--card-border);
        box-shadow: var(--shadow-strong);
      }
      .btn-brand {
        background: linear-gradient(90deg, var(--accent-start), var(--accent-end));
        color: ${t.colors.dark};
      }
      .ring-app { box-shadow: 0 0 0 2px var(--ring) inset; }

      /* Animations */
      @keyframes theme-pop {
        0% { transform: scale(0.95); opacity: 0.6; }
        60% { transform: scale(1.02); opacity: 1; }
        100% { transform: scale(1); opacity: 1; }
      }
      @keyframes halo {
        0% { transform: scale(0.9); opacity: 0.6; }
        50% { transform: scale(1.05); opacity: 1; }
        100% { transform: scale(0.9); opacity: 0.6; }
      }
    `}</style>
    )
}
