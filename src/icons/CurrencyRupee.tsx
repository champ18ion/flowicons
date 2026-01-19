import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const CurrencyRupee = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Coin Float
        const float = useCallback(() => {
            animate(
                ".rupee-symbol",
                { y: [0, -3, 0] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Path Draw (User Provided)
        const start = useCallback(async () => {
            await animate(
                ".rupee-main, .rupee-line",
                {
                    pathLength: 0,
                    opacity: 0,
                },
                { duration: 0 },
            );

            await animate(
                ".rupee-line",
                {
                    pathLength: 1,
                    opacity: 1,
                },
                {
                    duration: 0.25,
                    ease: "easeOut",
                },
            );

            await animate(
                ".rupee-main",
                {
                    pathLength: 1,
                    opacity: 1,
                },
                {
                    duration: 0.35,
                    ease: "easeOut",
                },
            );

            animate(
                ".rupee-symbol",
                {
                    scale: [0.96, 1],
                },
                {
                    duration: 0.2,
                    ease: "easeOut",
                },
            );
        }, [animate]);

        // Click: Coin Flip
        const playFlip = useCallback(async () => {
            await animate(".rupee-symbol", { rotateY: 180 }, { duration: 0.3 });
            animate(".rupee-symbol", { rotateY: 0 }, { duration: 0.3 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(
                ".rupee-main, .rupee-line",
                { pathLength: 1, opacity: 1 },
                { duration: 0.2 },
            );
            animate(".rupee-symbol", { scale: 1, y: 0, rotateY: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playFlip,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) float();
            else stop();
        }, [loading, float, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && start()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playFlip()}
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

                <motion.g
                    className="rupee-symbol"
                    style={{ transformOrigin: "50% 50%" }}
                >
                    <motion.path
                        className="rupee-main"
                        d="M18 5h-11h3a4 4 0 0 1 0 8h-3l6 6"
                        pathLength={1}
                    />

                    <motion.path className="rupee-line" d="M7 9l11 0" pathLength={1} />
                </motion.g>
            </motion.svg>
        );
    }
);

CurrencyRupee.displayName = "CurrencyRupee";
export default CurrencyRupee;
