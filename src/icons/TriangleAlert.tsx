import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const TriangleAlert = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Breathe (Slow caution pulse)
        const breathe = useCallback(() => {
            animate(
                "svg",
                { opacity: [1, 0.6, 1], scale: [1, 1.05, 1] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Nervous Wobble (Urgent)
        const hoverWobble = useCallback(() => {
            animate(
                ".triangle",
                { rotate: [-2, 2, -2], x: [-1, 1, -1] },
                { duration: 0.2, repeat: Infinity, ease: "linear" }
            );
            animate(
                ".exclamation",
                { x: [1, -1, 1] },
                { duration: 0.2, repeat: Infinity, ease: "linear" }
            );
        }, [animate]);

        // Action: Flash Pop
        const playFlash = useCallback(async () => {
            await animate(
                "svg",
                { scale: [1, 1.2, 1] },
                { duration: 0.4, ease: "backOut" }
            );
            // Double shake
            animate(
                ".exclamation",
                { x: [-2, 2, 0] },
                { duration: 0.2 }
            );

        }, [animate]);

        const stop = useCallback(() => {
            animate("svg", { opacity: 1, scale: 1 }, { duration: 0.2 });
            animate(".triangle", { rotate: 0, x: 0 }, { duration: 0.2 });
            animate(".exclamation", { x: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playFlash,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) breathe();
            else stop();
        }, [loading, breathe, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverWobble()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playFlash()}
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
                <motion.path
                    className="triangle"
                    d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"
                    style={{ transformOrigin: "center" }}
                />

                <motion.g className="exclamation" style={{ transformOrigin: "center" }}>
                    <path d="M12 9v4" />
                    <path d="M12 17h.01" />
                </motion.g>
            </motion.svg>
        );
    }
);

TriangleAlert.displayName = "TriangleAlert";
export default TriangleAlert;
