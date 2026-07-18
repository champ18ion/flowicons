import { useRef, useState } from "react";
import { Copy, Checked } from "@champ18ion/flowicons";
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
    const iconRef = useRef<any>(null);

    const handleCopy = (e: React.MouseEvent) => {
        e.stopPropagation();
        const text = `<${name} size={${size}} strokeWidth={${strokeWidth}} color="${color}" />`;
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <motion.div
            layout
            className="group relative border border-line bg-surface hover:border-faint transition-colors"
        >
            <button
                onClick={handleCopy}
                title="Copy component"
                className="absolute top-2 right-2 z-10 p-1.5 rounded border border-transparent text-faint opacity-0 group-hover:opacity-100 hover:text-fg hover:border-line hover:bg-raise transition-all"
            >
                <AnimatePresence mode="wait" initial={false}>
                    {copied ? (
                        <motion.span key="ok" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Checked size={13} color="#34d399" />
                        </motion.span>
                    ) : (
                        <motion.span key="cp" initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}>
                            <Copy size={13} />
                        </motion.span>
                    )}
                </AnimatePresence>
            </button>

            {/* The SVG owns its own hover/click handlers. No wrapper transform
                is applied here, so what you see is exactly the icon's own reaction. */}
            <div className="aspect-square flex items-center justify-center">
                <Component ref={iconRef} size={size} strokeWidth={strokeWidth} color={color} loading={loading} />
            </div>

            <div className="border-t border-line px-3 py-2">
                <span className="font-mono text-[10px] text-mut tracking-wide truncate block">{name}</span>
            </div>
        </motion.div>
    );
}
