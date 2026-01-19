import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Flame = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Low Intensity Flicker
        const flicker = useCallback(() => {
            animate(
                ".flame-main",
                {
                    scale: [1, 1.05, 0.95, 1],
                    skewX: [0, 2, -2, 0]
                },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: High Burn / Roar (Stronger)
        const hoverRoar = useCallback(() => {
            animate(
                ".flame-main",
                {
                    scale: 1.2,
                    y: -2,
                    skewX: [-3, 3, -2, 2, 0] // Rapid flicker/shake
                },
                { duration: 0.4, ease: "easeOut" }
            );
        }, [animate]);

        // Action: Flare Burst
        const playFlare = useCallback(async () => {
            await animate(
                ".flame-main",
                {
                    scale: [1, 1.3, 0.9, 1.1, 1],
                    y: [0, -4, 2, -1, 0],
                    rotate: [0, -5, 5, 0]
                },
                { duration: 0.6, ease: "easeInOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".flame-main", { scale: 1, y: 0, x: 0, rotate: 0, skewX: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playFlare,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) flicker();
            else stop();
        }, [loading, flicker, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverRoar()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playFlare()}
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
                    className="flame-main"
                    style={{ transformOrigin: "bottom center" }}
                    d="M12 10.941c2.333 -3.308 .167 -7.823 -1 -8.941c0 3.395 -2.235 5.299 -3.667 6.706c-1.43 1.408 -2.333 3.621 -2.333 5.588c0 3.704 3.134 6.706 7 6.706s7 -3.002 7 -6.706c0 -1.712 -1.232 -4.403 -2.333 -5.588c-2.084 3.353 -3.257 3.353 -4.667 2.235"
                />
            </motion.svg>
        );
    }
);

Flame.displayName = "Flame";
export default Flame;
