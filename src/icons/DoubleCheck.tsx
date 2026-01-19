import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const DoubleCheck = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Pulse Opacity
        const pulse = useCallback(() => {
            animate(
                ".check",
                { opacity: [0.5, 1, 0.5] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut", delay: (i) => i * 0.2 }
            );
        }, [animate]);

        // Hover: Continuous Wave (Bouncing up and down in sequence)
        const hoverWave = useCallback(() => {
            animate(
                ".check",
                { y: [0, -3, 0] },
                { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: (i) => i * 0.1 }
            );
        }, [animate]);

        // Action: Staggered Draw (Sharp & Clear)
        const playDraw = useCallback(async () => {
            // 1. Reset
            await animate(".check", { pathLength: 0, opacity: 0 }, { duration: 0 });

            // 2. Draw
            animate(
                ".check",
                { pathLength: 1, opacity: 1 },
                { duration: 0.4, ease: "easeOut", delay: (i) => i * 0.2 }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".check", { pathLength: 1, opacity: 1, y: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playDraw,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) pulse();
            else stop();
        }, [loading, pulse, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverWave()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playDraw()}
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
                <motion.path
                    d="M7 12l5 5l10 -10"
                    className="check check-first"
                    custom={0}
                />
                <motion.path
                    d="M2 12l5 5m5 -5l5 -5"
                    className="check check-second"
                    custom={1}
                />
            </motion.svg>
        );
    }
);

DoubleCheck.displayName = "DoubleCheck";
export default DoubleCheck;
