import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ArrowBigUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
        }, [animate]);

        // Hover: Nudge Up (Point)
        const hoverNudge = useCallback(() => {
            animate(
                ".arrow",
                { y: [0, -4, 0] },
                { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Launch Up
        const playLaunch = useCallback(async () => {
            // 1. Wind up (Down slightly)
            await animate(".arrow", { y: 5 }, { duration: 0.2, ease: "easeOut" });

            // 2. Launch Up (past target)
            await animate(".arrow", { y: -6 }, { duration: 0.15, ease: "backIn" });

            // 3. Recoil/Spring back
            animate(".arrow", { y: 0 }, { duration: 0.4, type: "spring", bounce: 0.5 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".arrow", { y: 0 }, { duration: 0.2 });
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
                    d="M9 13a1 1 0 0 0-1-1H5.061a1 1 0 0 1-.75-1.811l6.836-6.835a1.207 1.207 0 0 1 1.707 0l6.835 6.835a1 1 0 0 1-.75 1.811H16a1 1 0 0 0-1 1v6a1 1 0 0 1-1 1h-4a1 1 0 0 1-1-1z"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

ArrowBigUp.displayName = "ArrowBigUp";
export default ArrowBigUp;
