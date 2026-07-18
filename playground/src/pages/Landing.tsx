import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import CometHero from "../components/CometHero";
import {
    Bell, Copy, Checked, Wind,
    Airplane, Rocket, Heart, Flame, Cast, Watch, Scissors, Snowflake,
    Ghost, Dice5, Trophy, Timer, Palette, Truck, Lightbulb, CloudRain,
    Battery, Key, Compass, Coffee, Camera, Music, Umbrella,
    ChevronDown, LoaderCircle,
    type AnimatedIconHandle,
} from "@champ18ion/flowicons";

interface LandingProps {
    onEnter: () => void;
}

/* ------------------------------------------------------------------ */
/* Data                                                                */
/* ------------------------------------------------------------------ */

const FIELD_ICONS: { name: string; C: React.ComponentType<any> }[] = [
    { name: "Airplane", C: Airplane }, { name: "Bell", C: Bell },
    { name: "Rocket", C: Rocket }, { name: "Heart", C: Heart },
    { name: "Flame", C: Flame }, { name: "Cast", C: Cast },
    { name: "Watch", C: Watch }, { name: "Scissors", C: Scissors },
    { name: "Snowflake", C: Snowflake }, { name: "Ghost", C: Ghost },
    { name: "Dice5", C: Dice5 }, { name: "Trophy", C: Trophy },
    { name: "Timer", C: Timer }, { name: "Palette", C: Palette },
    { name: "Truck", C: Truck }, { name: "Lightbulb", C: Lightbulb },
    { name: "CloudRain", C: CloudRain }, { name: "Battery", C: Battery },
    { name: "Key", C: Key }, { name: "Compass", C: Compass },
    { name: "Coffee", C: Coffee }, { name: "Camera", C: Camera },
    { name: "Music", C: Music }, { name: "Umbrella", C: Umbrella },
];

// A sparse handful of icons scattered behind the comet rings, muted, so
// the hero still reads as "this is an icon library" without going back
// to a busy full-grid field competing with the rings.
const BG_SPARSE = [
    { name: "Watch", C: Watch, left: 12, top: 18, size: 26, rotate: -12 },
    { name: "Scissors", C: Scissors, left: 84, top: 14, size: 22, rotate: 8 },
    { name: "Snowflake", C: Snowflake, left: 90, top: 62, size: 30, rotate: -6 },
    { name: "Trophy", C: Trophy, left: 8, top: 70, size: 24, rotate: 10 },
    { name: "Palette", C: Palette, left: 20, top: 88, size: 20, rotate: -8 },
    { name: "Compass", C: Compass, left: 78, top: 86, size: 22, rotate: 14 },
];

const MARQUEE_NAMES = [
    "Airplane", "Bell", "Scissors", "Snowflake", "Watch", "Ghost", "Trophy",
    "Palette", "Truck", "Timer", "Hourglass", "Lightbulb", "CloudRain",
    "Compass", "Rocket", "Dice5", "Keyboard", "Droplet", "Cast", "Battery",
    "Key", "Shuffle", "Smile", "Wrench", "Camera", "Coffee", "Umbrella", "Bird",
];

/* ------------------------------------------------------------------ */
/* Page                                                                */
/* ------------------------------------------------------------------ */

export default function Landing({ onEnter }: LandingProps) {
    const [copied, setCopied] = useState(false);
    const installCmd = "npm i @champ18ion/flowicons";

    const reduced = useRef(
        typeof window !== "undefined" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    ).current;

    const handleCopy = () => {
        navigator.clipboard.writeText(installCmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    /* ---- proximity ripple over the real play() API, for the bordered grid
       section. The cell directly under the pointer is left alone; it already
       has its own hover/click handlers, this only nudges the ring around it.
       The scattered hero specimens are spaced out enough to hover directly,
       so they don't need this. ---- */
    const gridField = useRef({
        cellEls: { current: new Array<HTMLDivElement | null>(FIELD_ICONS.length).fill(null) },
        handles: { current: new Array<AnimatedIconHandle | null>(FIELD_ICONS.length).fill(null) },
        lastFire: new Array(FIELD_ICONS.length).fill(0),
    }).current;

    const onGridMove = (e: React.MouseEvent) => {
        if (reduced) return;
        const now = performance.now();
        gridField.cellEls.current.forEach((el, i) => {
            if (!el) return;
            const r = el.getBoundingClientRect();
            const dx = e.clientX - (r.left + r.width / 2);
            const dy = e.clientY - (r.top + r.height / 2);
            const d2 = dx * dx + dy * dy;
            if (d2 > 55 * 55 && d2 < 110 * 110 && now - gridField.lastFire[i] > 1400) {
                gridField.lastFire[i] = now;
                gridField.handles.current[i]?.play();
            }
        });
    };

    return (
        <div className="min-h-screen bg-ink text-fg font-body antialiased overflow-x-hidden">

            {/* ---------------- Nav ---------------- */}
            <nav className="sticky top-0 z-50 bg-ink/85 backdrop-blur-md border-b border-line">
                <div className="max-w-6xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-2 sm:gap-2.5 min-w-0">
                        <Wind size={24} color="#38bdf8" className="shrink-0" />
                        <span className="font-display font-semibold text-base sm:text-lg tracking-tight truncate">Flowicons</span>
                        <span className="hidden sm:inline-block font-mono text-[11px] text-mut border border-line rounded px-1.5 py-0.5 ml-1 shrink-0">v0.0.4</span>
                    </div>
                    <div className="flex items-center gap-4 sm:gap-6 shrink-0">
                        <a
                            href="https://github.com/champ18ion/flowicons"
                            target="_blank"
                            rel="noreferrer"
                            className="hidden sm:inline-block text-mut hover:text-fg transition-colors text-sm font-medium"
                        >
                            GitHub
                        </a>
                        <button
                            onClick={onEnter}
                            className="px-3 sm:px-4 py-2 rounded-md bg-accent text-ink font-semibold text-xs sm:text-sm hover:bg-accent-deep transition-colors active:scale-[0.98] whitespace-nowrap"
                        >
                            <span className="sm:hidden">Playground</span>
                            <span className="hidden sm:inline">Open playground</span>
                        </button>
                    </div>
                </div>
            </nav>

            <main>
                {/* ---------------- Hero: specimen board ---------------- */}
                <section className="relative border-b border-line overflow-hidden min-h-[92vh] flex flex-col items-center justify-center text-center">

                    {/* orbiting comet rings behind everything */}
                    <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-full max-w-225 opacity-70">
                            <CometHero />
                        </div>
                    </div>

                    {/* a sparse handful of real, muted icons so the hero still
                        reads as an icon library, not just abstract atmosphere */}
                    <div className="absolute inset-0">
                        {BG_SPARSE.map(({ name, C, left, top, size, rotate }) => (
                            <div
                                key={name}
                                style={{ left: `${left}%`, top: `${top}%`, transform: `translate(-50%, -50%) rotate(${rotate}deg)` }}
                                className="absolute text-line hover:text-mut transition-colors"
                            >
                                <C size={size} strokeWidth={1.5} />
                            </div>
                        ))}
                    </div>

                    {/* centered stack: headline, subtext, CTA */}
                    <div className="relative px-6 flex flex-col items-center max-w-2xl">
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            className="font-display font-semibold tracking-tight leading-[1.05] text-4xl sm:text-5xl md:text-7xl mb-6"
                        >
                            Icons that
                            <Rocket
                                size={56}
                                strokeWidth={1.4}
                                color="#38bdf8"
                                className="inline-block align-[-0.1em] mx-3 w-[0.62em] h-[0.62em]"
                            />
                            react.
                        </motion.h1>

                        <motion.p
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 }}
                            className="text-mut leading-relaxed mb-10 text-sm sm:text-base sm:whitespace-nowrap px-2 sm:px-0"
                        >
                            Real spring physics, not the flat, lifeless icons you're used to.
                        </motion.p>

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.2 }}
                        >
                            <button
                                onClick={handleCopy}
                                className="flex items-center gap-2 font-mono text-sm text-mut hover:text-fg bg-surface border border-line hover:border-accent rounded-md px-4 py-2 transition-colors"
                            >
                                $ {installCmd}
                                <AnimatePresence mode="wait" initial={false}>
                                    {copied ? (
                                        <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                            <Checked size={14} color="#34d399" />
                                        </motion.span>
                                    ) : (
                                        <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                                            <Copy size={14} />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>
                        </motion.div>
                    </div>
                </section>

                {/* ---------------- Marquee ---------------- */}
                <div className="border-y border-line overflow-hidden py-3 select-none" aria-hidden="true">
                    <div className="animate-marquee whitespace-nowrap font-mono text-xs text-faint tracking-[0.15em] uppercase w-max">
                        {[0, 1].map((half) => (
                            <span key={half}>
                                {MARQUEE_NAMES.map((n) => (
                                    <span key={`${half}-${n}`} className="mx-4">
                                        {n} <span className="text-accent/60 mx-2">✳</span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </div>
                </div>

                {/* ---------------- Cursor field ---------------- */}
                <section className="max-w-6xl mx-auto px-6 py-24">
                    <div className="mb-8">
                        <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight">
                            Run your cursor through them
                        </h2>
                    </div>

                    <div
                        onMouseMove={onGridMove}
                        className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 border-t border-l border-line"
                    >
                        {FIELD_ICONS.map(({ name, C }, i) => (
                            <div
                                key={name}
                                ref={(el) => { gridField.cellEls.current[i] = el; }}
                                className="aspect-square border-r border-b border-line flex items-center justify-center text-mut hover:text-fg hover:bg-raise transition-colors"
                                title={name}
                            >
                                <C ref={(h: AnimatedIconHandle | null) => { gridField.handles.current[i] = h; }} size={28} strokeWidth={1.7} />
                            </div>
                        ))}
                    </div>
                </section>

                {/* ---------------- Manifesto rows ---------------- */}
                <section className="max-w-6xl mx-auto px-6 pb-24">
                    <div className="border-t border-line">
                        {[
                            {
                                title: "Physics, not frames",
                                desc: "No linear easing, no flipping between two static states. Every motion has spring, weight, and follow-through, so it feels like it's actually reacting to you.",
                                demo: <Scissors size={34} strokeWidth={1.7} />,
                                hint: "hover / click it",
                            },
                            {
                                title: "Hover invites, click confirms",
                                desc: "Hover is a continuous, subtle motion that says it's ready. Click is a decisive, punchy one-shot that says it's done. They never feel the same.",
                                demo: <ChevronDown size={34} strokeWidth={1.7} />,
                                hint: "spring physics",
                            },
                            {
                                title: "States are built in",
                                desc: "Pass loading and the icon handles the wait itself. One ref exposes play() and stop(). No keyframes to write by hand.",
                                demo: <LoaderCircle size={34} strokeWidth={1.7} loading />,
                                hint: "loading={true}",
                            },
                        ].map((row) => (
                            <div
                                key={row.title}
                                className="grid md:grid-cols-[1fr_1.4fr_auto] gap-6 md:gap-10 items-center py-10 border-b border-line"
                            >
                                <h3 className="font-display font-semibold text-2xl tracking-tight">{row.title}</h3>
                                <p className="text-mut leading-relaxed max-w-[58ch]">{row.desc}</p>
                                <div className="flex items-center gap-4 justify-self-start md:justify-self-end">
                                    <div className="w-20 h-20 border border-line rounded-md bg-surface flex items-center justify-center">
                                        {row.demo}
                                    </div>
                                    <span className="font-mono text-[11px] text-faint w-20">{row.hint}</span>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>

                {/* ---------------- Code ---------------- */}
                <section className="max-w-6xl mx-auto px-6 pb-28 grid lg:grid-cols-[0.9fr_1.1fr] gap-12 items-center">
                    <div>
                        <h2 className="font-display font-semibold text-3xl md:text-4xl tracking-tight mb-5">
                            One ref. Three states.<br />Zero config.
                        </h2>
                        <p className="text-mut leading-relaxed max-w-[48ch] mb-8">
                            Fully tree-shakeable, TypeScript-first, powered by Motion.
                            Import a glyph and it already knows how to behave.
                        </p>
                        <ul className="space-y-3 font-mono text-sm text-mut">
                            <li><span className="text-accent mr-3">→</span>size, color, strokeWidth props</li>
                            <li><span className="text-accent mr-3">→</span>loading prop for ambient loops</li>
                            <li><span className="text-accent mr-3">→</span>AnimatedIconHandle: play() / stop()</li>
                            <li><span className="text-accent mr-3">→</span>React 19 ready, MIT licensed</li>
                        </ul>
                    </div>

                    <div className="border border-line rounded-lg bg-surface overflow-hidden">
                        <div className="flex items-center justify-between px-5 py-3 border-b border-line">
                            <span className="font-mono text-xs text-mut">notifications.tsx</span>
                            <span className="font-mono text-[11px] text-faint">tsx</span>
                        </div>
                        <pre className="p-6 font-mono text-[13px] leading-relaxed overflow-x-auto text-fg">
{`import { useRef } from "react";
import { Bell, type AnimatedIconHandle }
  from "@champ18ion/flowicons";

export function Notifications() {
  const bell = useRef<AnimatedIconHandle>(null);

  return (
    <button onClick={() => bell.current?.play()}>
      <Bell ref={bell} size={28} />
      Ring it
    </button>
  );
}`}
                        </pre>
                    </div>
                </section>

                {/* ---------------- Footer ---------------- */}
                <footer className="border-t border-line">
                    <div className="max-w-6xl mx-auto px-6 py-10 flex flex-col md:flex-row items-center justify-between gap-6">
                        <div className="flex items-center gap-3 text-mut text-sm">
                            <Wind size={20} color="#38bdf8" />
                            <span>Flowicons · MIT · 2026 champ18ion</span>
                        </div>
                        <div className="flex items-center gap-8 font-mono text-xs text-mut">
                            <a href="https://github.com/champ18ion/flowicons" target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">GitHub</a>
                            <a href="https://www.npmjs.com/package/@champ18ion/flowicons" target="_blank" rel="noreferrer" className="hover:text-fg transition-colors">npm</a>
                            <button onClick={onEnter} className="hover:text-fg transition-colors">Playground</button>
                        </div>
                    </div>
                </footer>
            </main>
        </div>
    );
}
