import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ArrowBigUpDash = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Float Vertical
        const float = useCallback(() => {
            animate(
                ".arrow",
                { y: [-2, 2, -2] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".dash",
                { opacity: [0.5, 1, 0.5] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Nudge Up
        const hoverNudge = useCallback(() => {
            animate(
                ".arrow",
                { y: [0, -3, 0] },
                { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".dash",
                { scaleX: [1, 1.1, 1], opacity: [1, 0.7, 1] },
                { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Launch Up + Squash
        const playLaunch = useCallback(async () => {
            // 1. Wind up (Down)
            await animate(".arrow", { y: 4 }, { duration: 0.2, ease: "easeOut" });

            // 2. Launch
            const launchPromise = animate(".arrow", { y: -3 }, { duration: 0.15, ease: "backIn" });
            const dashSquash = animate(".dash", { scaleX: 1.5, opacity: 0.3, y: 1 }, { duration: 0.15, delay: 0.1 });

            await Promise.all([launchPromise, dashSquash]);

            // 3. Reset
            animate(".arrow", { y: 0 }, { duration: 0.4, type: "spring", bounce: 0.5 });
            animate(".dash", { scaleX: 1, opacity: 1, y: 0 }, { duration: 0.3 });

        }, [animate]);

        const stop = useCallback(() => {
            animate(".arrow", { y: 0 }, { duration: 0.2 });
            animate(".dash", { scaleX: 1, opacity: 1, y: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playLaunch,
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
                onClick={() => !loading && playLaunch()}
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
                    d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v2a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    className="dash"
                    d="M9 20h6"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

ArrowBigUpDash.displayName = "ArrowBigUpDash";
export default ArrowBigUpDash;
