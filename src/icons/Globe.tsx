import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Globe = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Orbit (Spin)
        const spin = useCallback(() => {
            animate(
                ".globe-inner",
                { rotate: 360 },
                { duration: 8, repeat: Infinity, ease: "linear" }
            );
        }, [animate]);

        // Hover: Lively Tilt (Bobble)
        const hoverTilt = useCallback(() => {
            animate(
                "svg",
                { rotate: [0, -15, 10, -5, 0] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".globe-inner",
                { scale: [1, 1.1, 1] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Scan (World Search)
        const playScan = useCallback(async () => {
            // 1. Fast Spin
            animate(".globe-inner", { rotate: 360 }, { duration: 0.6, ease: "circInOut" });

            // 2. Pulse
            await animate("svg", { scale: 1.2 }, { duration: 0.3, ease: "easeOut" });
            animate("svg", { scale: 1 }, { duration: 0.5, type: "spring", bounce: 0.5 });

        }, [animate]);

        const stop = useCallback(() => {
            animate(".globe-inner", { rotate: 0, scale: 1 }, { duration: 0.4 });
            animate("svg", { rotate: 0, scale: 1 }, { duration: 0.4 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playScan,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) spin();
            else stop();
        }, [loading, spin, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverTilt()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playScan()}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${className} cursor-pointer`}
                style={{ overflow: "visible" }}
                whileTap={{ scale: 0.95 }}
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />

                <motion.g className="globe-inner" style={{ transformOrigin: "center" }}>
                    <path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" />
                    <path d="M3.6 9h16.8" />
                    <path d="M3.6 15h16.8" />
                    <path d="M11.5 3a17 17 0 0 0 0 18" />
                    <path d="M12.5 3a17 17 0 0 1 0 18" />
                </motion.g>
            </motion.svg>
        );
    }
);

Globe.displayName = "Globe";
export default Globe;
