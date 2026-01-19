import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const BellOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Nervous/Scared Shake (Bell is about to be silenced)
        const nervous = useCallback(() => {
            animate(
                ".bell",
                { x: [0, -1, 1, -1, 0], rotate: [0, -2, 2, -1, 0] },
                { duration: 2, repeat: Infinity, repeatDelay: 1, ease: "linear" }
            );
        }, [animate]);

        // Hover: Lean Away (Anticipation)
        const hoverLean = useCallback(() => {
            animate(".bell", { rotate: -10, x: -2 }, { duration: 0.3, ease: "easeOut" });
            animate(".slash", { opacity: 0.5, pathLength: 0.5 }, { duration: 0.3 });
        }, [animate]);

        // Action: Slash Draw + Recoil
        const playSilence = useCallback(async () => {
            // 1. Slash strikes
            const slash = animate(
                ".slash",
                { pathLength: [0, 1], opacity: [0, 1] },
                { duration: 0.3, ease: "circOut" }
            );

            // 2. Bell recoils from impact
            const recoil = animate(
                ".bell",
                { x: [0, 2, -1, 0], rotate: [-10, 5, -2, 0] },
                { duration: 0.4, delay: 0.1, ease: "backOut" }
            );

            await Promise.all([slash, recoil]);
        }, [animate]);

        const stop = useCallback(() => {
            animate(".bell", { x: 0, rotate: 0 }, { duration: 0.2 });
            animate(".slash", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSilence,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) nervous();
            else stop();
        }, [loading, nervous, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverLean()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playSilence()}
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
                <motion.g className="bell">
                    <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                    <path d="M17 17H4a1 1 0 0 1-.74-1.673C4.59 13.956 6 12.499 6 8a6 6 0 0 1 .258-1.742" />
                    <path d="M8.668 3.01A6 6 0 0 1 18 8c0 2.687.77 4.653 1.707 6.05" />
                </motion.g>

                <motion.path
                    className="slash"
                    d="m2 2 20 20"
                    initial={{ pathLength: 1, opacity: 1 }}
                />
            </motion.svg>
        );
    }
);

BellOff.displayName = "BellOff";
export default BellOff;
