import { ChevronRight, Heart, Target, Flame, Copy, FlowIcon, Rocket, Bell, ShieldCheck, Sparkle } from "@champ18ion/flowicons";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface LandingProps {
    onEnter: () => void;
}

export default function Landing({ onEnter }: LandingProps) {
    const [copied, setCopied] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const installCmd = "npm install @champ18ion/flowicons";

    useEffect(() => {
        const handleScroll = () => setScrolled(window.scrollY > 20);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleCopy = () => {
        navigator.clipboard.writeText(installCmd);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const FloatingIcon = ({ children, delay = 0, x = 0, y = 0 }: any) => (
        <motion.div
            initial={{ opacity: 0, scale: 0 }}
            animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.1, 1],
                x: [x, x + 10, x],
                y: [y, y - 10, y]
            }}
            transition={{
                duration: 4,
                repeat: Infinity,
                delay,
                ease: "easeInOut"
            }}
            className="absolute hidden lg:block text-brand-500/30"
        >
            {children}
        </motion.div>
    );

    return (
        <div className="min-h-screen bg-[#030303] text-white font-sans selection:bg-brand-500/30 overflow-x-hidden relative">

            {/* Global Noise Texture */}
            <div className="fixed inset-0 bg-noise z-0 opacity-[0.15] pointer-events-none" />

            {/* Background Atmosphere */}
            <div className="fixed top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-brand-600/10 blur-[140px] -z-10 pointer-events-none rounded-full" />
            <div className="fixed bottom-0 right-0 w-[600px] h-[600px] bg-purple-600/5 blur-[120px] -z-10 pointer-events-none rounded-full translate-x-1/4" />

            {/* Nav */}
            <nav className={`fixed top-0 w-full z-50 transition-all duration-300 border-b ${scrolled ? 'bg-black/60 backdrop-blur-xl border-white/10 py-4' : 'bg-transparent border-transparent py-6'}`}>
                <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
                    <div className="flex items-center gap-2 group cursor-default">
                        <div className="relative">
                            <div className="absolute inset-0 bg-brand-500 blur-md opacity-20 group-hover:opacity-40 transition-opacity" />
                            <FlowIcon size={32} color="#0ea5e9" className="relative group-hover:scale-110 transition-transform duration-500" />
                        </div>
                        <span className="font-bold text-2xl tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/70">Flowicons</span>
                    </div>
                    <div className="flex items-center gap-8">
                        <a href="https://github.com/champ18ion/flowicons" target="_blank" className="text-neutral-400 hover:text-white transition-colors text-sm font-medium flex items-center gap-2">
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>
                            Star on GitHub
                        </a>
                        <button
                            onClick={onEnter}
                            className="px-6 py-2.5 rounded-full bg-white text-black font-semibold text-sm hover:bg-neutral-200 transition-all shadow-[0_0_20px_rgba(255,255,255,0.15)] active:scale-95"
                        >
                            Open Playground
                        </button>
                    </div>
                </div>
            </nav>

            {/* Hero Content */}
            <main className="relative z-10 pt-48">

                {/* Floating Decorative Icons */}
                <FloatingIcon delay={0.5} x={-200} y={-100}><Rocket size={48} /></FloatingIcon>
                <FloatingIcon delay={1.2} x={400} y={-150}><Heart size={40} /></FloatingIcon>
                <FloatingIcon delay={2.0} x={300} y={200}><Bell size={44} /></FloatingIcon>
                <FloatingIcon delay={1.8} x={-350} y={150}><Flame size={36} /></FloatingIcon>

                {/* Section 1: Hero */}
                <section className="max-w-7xl mx-auto px-6 text-center">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-xs font-semibold text-brand-400 mb-10"
                    >
                        <Sparkle size={14} className="animate-pulse" />
                        <span>Interactive Icons with Physics</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-[5.5rem] font-bold tracking-tighter mb-8 leading-[1] bg-clip-text text-transparent bg-gradient-to-b from-white via-white to-white/40">
                        Interfaces that feel <br />
                        <span className="text-brand-500">truly alive</span>.
                    </h1>

                    <p className="text-lg md:text-xl text-neutral-400 max-w-2xl mx-auto leading-relaxed mb-14">
                        A premium library of React icons designed with spring-physics and purposeful motion.
                        Elevate your UX with interactions that feel physical, not digital.
                    </p>

                    <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                        <button
                            onClick={onEnter}
                            className="w-full sm:w-auto px-10 py-4 rounded-full bg-brand-600 text-white font-bold text-lg hover:bg-brand-500 transition-all shadow-xl shadow-brand-500/25 active:scale-95 flex items-center justify-center gap-2 group"
                        >
                            Explore Library
                            <ChevronRight size={20} className="group-hover:translate-x-1 transition-transform" />
                        </button>

                        <div
                            className="w-full sm:w-auto group flex items-center justify-between gap-4 px-6 py-4 rounded-full bg-white/5 border border-white/10 cursor-pointer hover:bg-white/10 transition-all"
                            onClick={handleCopy}
                        >
                            <span className="font-mono text-sm text-neutral-300">$ {installCmd}</span>
                            <div className="text-neutral-500 group-hover:text-white transition-colors">
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.div
                                            key="check"
                                            initial={{ scale: 0 }}
                                            animate={{ scale: 1 }}
                                            exit={{ scale: 0 }}
                                        >
                                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="copy"><Copy size={18} /></motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>
                    </div>

                    {/* Visual Preview */}
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: 0.3 }}
                        className="mt-32 relative max-w-5xl mx-auto"
                    >
                        <div className="absolute inset-0 bg-brand-600/10 blur-[100px] -z-10 rounded-full" />
                        <div className="bg-black/40 backdrop-blur-3xl border border-white/5 rounded-3xl p-10 shadow-2xl overflow-hidden group">
                            <div className="grid grid-cols-4 md:grid-cols-8 gap-8 opacity-40 group-hover:opacity-80 transition-opacity duration-1000">
                                {[Heart, Rocket, Bell, ShieldCheck, Flame, FlowIcon, Target, Sparkle].map((Icon, i) => (
                                    <div key={i} className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/5 hover:scale-110 transition-all cursor-default">
                                        <Icon size={32} />
                                    </div>
                                ))}
                                {/* Repeat for visual density */}
                                {[Target, Flame, FlowIcon, Sparkle, Heart, Rocket, Bell, ShieldCheck].map((Icon, i) => (
                                    <div key={i + 8} className="flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-white/5 hover:scale-110 transition-all cursor-default hidden md:flex">
                                        <Icon size={32} />
                                    </div>
                                ))}
                            </div>
                            <div className="absolute inset-0 bg-gradient-to-t from-[#030303] via-transparent to-transparent pointer-events-none" />
                        </div>
                    </motion.div>
                </section>

                {/* Section 2: Features Grid */}
                <section className="max-w-7xl mx-auto px-6 py-40">
                    <div className="text-center mb-24">
                        <h2 className="text-4xl md:text-5xl font-bold mb-6 tracking-tight">The new standard for icons</h2>
                        <p className="text-neutral-400 max-w-xl mx-auto text-lg">
                            We've rethought icons from the ground up, moving beyond SVG static paths to dynamic interactive components.
                        </p>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {[
                            {
                                icon: Target,
                                title: "Physics-First",
                                desc: "No linear easing. Every animation uses spring physics that feels natural and responsive to user input.",
                                color: "text-blue-400",
                                bg: "bg-blue-400/5",
                                border: "group-hover:border-blue-500/30"
                            },
                            {
                                icon: FlowIcon,
                                title: "Micro-Details",
                                desc: "Fine-tuned path animations that tell a story. An icon isn't just a symbol; it's an interaction.",
                                color: "text-brand-400",
                                bg: "bg-brand-400/5",
                                border: "group-hover:border-brand-500/30"
                            },
                            {
                                icon: Flame,
                                title: "Performance",
                                desc: "Optimized for React 19 and Motion. Buttery smooth performance without the SVG overhead.",
                                color: "text-purple-400",
                                bg: "bg-purple-400/5",
                                border: "group-hover:border-purple-500/30"
                            }
                        ].map((f, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                transition={{ delay: i * 0.1 }}
                                viewport={{ once: true }}
                                className={`group relative p-10 rounded-[2.5rem] bg-white/[0.02] border border-white/5 ${f.border} transition-all duration-500 hover:bg-white/[0.04]`}
                            >
                                <div className={`w-16 h-16 rounded-2xl ${f.bg} ${f.color} flex items-center justify-center mb-8 border border-white/5 group-hover:scale-110 transition-transform duration-500`}>
                                    <f.icon size={36} />
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{f.title}</h3>
                                <p className="text-neutral-400 leading-relaxed">
                                    {f.desc}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </section>

                {/* Section 3: Code Integration */}
                <section className="max-w-7xl mx-auto px-6 py-20 pb-40">
                    <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] overflow-hidden flex flex-col lg:flex-row items-center">
                        <div className="flex-1 p-12 md:p-20">
                            <h2 className="text-3xl md:text-5xl font-bold mb-8 tracking-tight">Zero configuration.<br />Infinite possibilities.</h2>
                            <p className="text-neutral-400 text-lg mb-10 leading-relaxed">
                                Import your icons and let Flowicons handle the rest. Customize everything from stroke width to animation speed with simple props.
                            </p>
                            <ul className="space-y-4">
                                {[
                                    "TypeScript first experience",
                                    "Fully tree-shakeable exports",
                                    "Customizable physics & colors",
                                    "React 19 & Framer Motion ready"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-3 text-neutral-300 font-medium">
                                        <div className="w-5 h-5 rounded-full bg-brand-500/20 flex items-center justify-center text-brand-500">
                                            <ShieldCheck size={14} />
                                        </div>
                                        {item}
                                    </li>
                                ))}
                            </ul>
                        </div>
                        <div className="flex-1 w-full bg-black/50 p-6 md:p-12 self-stretch flex items-center justify-center">
                            <div className="w-full max-w-lg relative bg-black rounded-2xl border border-white/10 p-8 font-mono text-sm shadow-2xl">
                                <div className="flex gap-2 mb-6">
                                    <div className="w-3 h-3 rounded-full bg-red-500/30" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-500/30" />
                                    <div className="w-3 h-3 rounded-full bg-green-500/30" />
                                </div>
                                <div className="space-y-1">
                                    <p><span className="text-purple-400">import</span> {"{"} <span className="text-blue-400">FlowIcon, Bell</span> {"}"} <span className="text-purple-400">from</span> <span className="text-emerald-400">'@champ18ion/flowicons'</span>;</p>
                                    <p>&nbsp;</p>
                                    <p><span className="text-purple-400">function</span> <span className="text-blue-400">Hero</span>() {"{"}</p>
                                    <p>&nbsp;&nbsp;<span className="text-purple-400">return</span> (</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-blue-400">div</span> <span className="text-brand-400">className</span>=<span className="text-emerald-400">"flex gap-4"</span>&gt;</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">FlowIcon</span> <span className="text-brand-400">size</span>={"{48}"} <span className="text-brand-400">color</span>=<span className="text-emerald-400">"#0ea5e9"</span> /&gt;</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&lt;<span className="text-yellow-400">Bell</span> <span className="text-brand-400">loading</span>={"{true}"} <span className="text-brand-400">strokeWidth</span>={"{2}"} /&gt;</p>
                                    <p>&nbsp;&nbsp;&nbsp;&nbsp;&lt;/<span className="text-blue-400">div</span>&gt;</p>
                                    <p>&nbsp;&nbsp;);</p>
                                    <p>{"}"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="w-full border-t border-white/5 bg-black/40 py-20">
                    <div className="max-w-7xl mx-auto px-6">
                        <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-20">
                            <div className="space-y-6">
                                <div className="flex items-center gap-3">
                                    <FlowIcon size={32} color="#0ea5e9" />
                                    <span className="font-bold text-2xl tracking-tighter">Flowicons</span>
                                </div>
                                <p className="text-neutral-500 max-w-sm">
                                    Premium animated React icons for high-end interfaces.
                                    Crafted with intent and motion.
                                </p>
                            </div>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-16">
                                <div className="space-y-4">
                                    <h4 className="font-bold text-white uppercase tracking-widest text-xs">Project</h4>
                                    <ul className="space-y-3 text-neutral-500 text-sm">
                                        <li><a href="#" className="hover:text-white transition-colors">Documentation</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Library</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Changelog</a></li>
                                    </ul>
                                </div>
                                <div className="space-y-4">
                                    <h4 className="font-bold text-white uppercase tracking-widest text-xs">Social</h4>
                                    <ul className="space-y-3 text-neutral-500 text-sm">
                                        <li><a href="https://github.com/champ18ion" className="hover:text-white transition-colors">GitHub</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Twitter</a></li>
                                        <li><a href="#" className="hover:text-white transition-colors">Discord</a></li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col md:flex-row justify-between items-center gap-6 pt-12 border-t border-white/5 text-neutral-600 text-xs">
                            <p>© 2026 Flowicons. Created by champ18ion. Released under MIT License.</p>
                            <div className="flex gap-8">
                                <a href="#" className="hover:text-neutral-400">Privacy Policy</a>
                                <a href="#" className="hover:text-neutral-400">Terms of Service</a>
                            </div>
                        </div>
                    </div>
                </footer>

            </main>
        </div>
    );
}

