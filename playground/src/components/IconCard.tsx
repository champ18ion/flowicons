import { useRef, useState } from "react";
import { Copy } from "@champ18ion/flowicons";

import { motion, AnimatePresence } from "framer-motion";

interface IconCardProps {
    name: string;
    Component: any;
    size: number;
    strokeWidth: number;
    color: string;
    loading: boolean;
}

export default function IconCard({ name, Component, size, strokeWidth, color, loading }: IconCardProps) {
    const [copied, setCopied] = useState(false);
    const [hovered, setHovered] = useState(false);
    const iconRef = useRef<any>(null);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const text = `<${name} size={${size}} strokeWidth={${strokeWidth}} color="${color}" />`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const handleIconClick = () => {
        if (iconRef.current && iconRef.current.play) {
            iconRef.current.play();
        }
    };

    return (
        <motion.div
            layout
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={handleIconClick}
            className="group relative aspect-square rounded-3xl bg-[#0a0a0a] border border-white/5 flex flex-col items-center justify-center transition-all duration-500 hover:border-brand-500/30 hover:bg-[#0d0d0d] active:scale-95 cursor-pointer overflow-hidden"
        >
            {/* Ambient Background Glow */}
            <div className={`absolute inset-0 bg-brand-500/5 blur-2xl transition-opacity duration-500 ${hovered ? 'opacity-100' : 'opacity-0'}`} />

            {/* Actions Bar */}
            <div className={`absolute top-3 right-3 flex items-center gap-1.5 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : '-translate-y-2 opacity-0'}`}>
                <button
                    onClick={handleCopy}
                    className="p-2 rounded-xl bg-white/5 border border-white/10 text-neutral-400 hover:text-white hover:bg-white/10 transition-all backdrop-blur-md"
                    title="Copy Component"
                >
                    <AnimatePresence mode="wait">
                        {copied ? (
                            <motion.div
                                key="check"
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                            >
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#10b981" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                            </motion.div>
                        ) : (
                            <Copy size={14} />
                        )}
                    </AnimatePresence>
                </button>
            </div>

            {/* Icon Wrapper */}
            <div className="relative z-10 transition-all duration-500 group-hover:scale-110">
                <Component
                    ref={iconRef}
                    size={size}
                    strokeWidth={strokeWidth}
                    color={color}
                    loading={loading}
                />
            </div>

            {/* Label */}
            <div className={`absolute bottom-4 left-0 w-full px-4 transition-all duration-300 ${hovered ? 'translate-y-0 opacity-100' : 'translate-y-2 opacity-0'}`}>
                <div className="flex flex-col items-center">
                    <span className="text-[10px] font-bold text-neutral-300 tracking-wider uppercase mb-1">{name}</span>
                    <div className="w-4 h-0.5 bg-brand-500 rounded-full" />
                </div>
            </div>

            {/* Static Label for non-hover */}
            {!hovered && (
                <div className="absolute bottom-4 text-[10px] font-mono text-neutral-600 truncate px-4 max-w-full">
                    {name}
                </div>
            )}
        </motion.div>
    );
}

