import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ArrowDown10 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Visible Bobbing
        const bob = useCallback(() => {
            animate(
                ".num-1",
                { y: [0, -4, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 }
            );
            animate(
                ".num-0",
                { y: [0, -4, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            );
        }, [animate]);

        // Hover: Wide Swap Preview
        const hoverSwap = useCallback(() => {
            animate(".num-1", { y: 8 }, { duration: 0.3, ease: "easeInOut" });
            animate(".num-0", { y: -8 }, { duration: 0.3, ease: "easeInOut" });
        }, [animate]);

        // Click: Swap Sort
        const playSort = useCallback(async () => {
            // Swap positions
            animate(".num-1", { y: 10 }, { duration: 0.4, ease: "easeInOut" });
            await animate(".num-0", { y: -10 }, { duration: 0.4, ease: "easeInOut" });

            // Return (after short pause)
            await new Promise(resolve => setTimeout(resolve, 100));
            animate(".num-1", { y: 0 }, { duration: 0.4, ease: "easeInOut" });
            animate(".num-0", { y: 0 }, { duration: 0.4, ease: "easeInOut" });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".num-1", { y: 0 }, { duration: 0.2 });
            animate(".num-0", { y: 0 }, { duration: 0.2 });
            animate(".numbers", { y: 0 }, { duration: 0.2 });
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

                <motion.g className="numbers">
                    <motion.path className="num-1" d="M17 10v-6h-2" />
                    <motion.path className="num-1" d="M15 10h4" />
                    <motion.rect className="num-0" x="15" y="14" width="4" height="6" rx="2" />
                </motion.g>
            </motion.svg>
        );
    }
);

ArrowDown10.displayName = "ArrowDown10";
export default ArrowDown10;
