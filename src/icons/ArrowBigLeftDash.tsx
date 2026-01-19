import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ArrowBigLeftDash = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Float Horizontal
        const float = useCallback(() => {
            animate(
                ".arrow",
                { x: [-2, 2, -2] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".dash",
                { opacity: [0.5, 1, 0.5] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Nudge Left
        const hoverNudge = useCallback(() => {
            animate(
                ".arrow",
                { x: [0, -3, 0] },
                { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".dash",
                { scaleY: [1, 1.1, 1], opacity: [1, 0.7, 1] },
                { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Bump Left + Squash
        const playBump = useCallback(async () => {
            // 1. Wind up (Right)
            await animate(".arrow", { x: 4 }, { duration: 0.2, ease: "easeOut" });

            // 2. Smash
            const smashPromise = animate(".arrow", { x: -3 }, { duration: 0.15, ease: "backIn" });
            const dashSquash = animate(".dash", { scaleY: 1.5, opacity: 0.3, x: -1 }, { duration: 0.15, delay: 0.1 });

            await Promise.all([smashPromise, dashSquash]);

            // 3. Reset
            animate(".arrow", { x: 0 }, { duration: 0.4, type: "spring", bounce: 0.5 });
            animate(".dash", { scaleY: 1, opacity: 1, x: 0 }, { duration: 0.3 });

        }, [animate]);

        const stop = useCallback(() => {
            animate(".arrow", { x: 0 }, { duration: 0.2 });
            animate(".dash", { scaleY: 1, opacity: 1, x: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playBump,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) float();
            else stop();
        }, [loading, float, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverNudge()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playBump()}
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
                    className="arrow"
                    d="M13 9a1 1 0 0 1-1-1V5.061a1 1 0 0 0-1.811-.75l-6.835 6.836a1.207 1.207 0 0 0 0 1.707l6.835 6.835a1 1 0 0 0 1.811-.75V16a1 1 0 0 1 1-1h2a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1z"
                    style={{ transformOrigin: "center" }}
                />
                <motion.path className="dash" d="M20 9v6" style={{ transformOrigin: "center" }} />
            </motion.svg>
        );
    }
);

ArrowBigLeftDash.displayName = "ArrowBigLeftDash";
export default ArrowBigLeftDash;
