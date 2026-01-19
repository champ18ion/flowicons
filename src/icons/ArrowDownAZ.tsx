import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ArrowDownAZ = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Visible Bobbing
        const bob = useCallback(() => {
            animate(
                ".letter-a",
                { y: [0, -3, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }
            );
            animate(
                ".letter-z",
                { y: [0, -3, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            );
        }, [animate]);

        // Hover: Wide Swap Preview
        const hoverSwap = useCallback(() => {
            animate(".letter-a", { y: 6 }, { duration: 0.3, ease: "easeInOut" });
            animate(".letter-z", { y: -6 }, { duration: 0.3, ease: "easeInOut" });
        }, [animate]);

        // Click: Swap Sort
        const playSort = useCallback(async () => {
            // Swap positions
            animate(".letter-a", { y: 12 }, { duration: 0.4, ease: "easeInOut" });
            await animate(".letter-z", { y: -12 }, { duration: 0.4, ease: "easeInOut" });

            // Return (after short pause)
            await new Promise(resolve => setTimeout(resolve, 100));
            animate(".letter-a", { y: 0 }, { duration: 0.4, ease: "easeInOut" });
            animate(".letter-z", { y: 0 }, { duration: 0.4, ease: "easeInOut" });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".letter-a", { y: 0 }, { duration: 0.2 });
            animate(".letter-z", { y: 0 }, { duration: 0.2 });
            animate(".letters", { y: 0 }, { duration: 0.2 });
            animate(".arrow", { y: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSort,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) bob();
            else stop();
        }, [loading, bob, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverSwap()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playSort()}
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

                <motion.path className="arrow" d="M3 16l4 4l4 -4" />
                <motion.path className="arrow" d="M7 20v-16" />

                {/* Scaled and simplified letters representing A and Z roughly in 24px space */}
                <motion.g className="letters">
                    {/* Letter A-ish shape */}
                    <motion.path
                        className="letter-a"
                        d="M16 4l4 8M20 4l-4 8M17 8h2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                    {/* Letter Z-ish shape */}
                    <motion.path
                        className="letter-z"
                        d="M16 16h4l-4 4h4"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    />
                </motion.g>
            </motion.svg>
        );
    }
);

ArrowDownAZ.displayName = "ArrowDownAZ";
export default ArrowDownAZ;
