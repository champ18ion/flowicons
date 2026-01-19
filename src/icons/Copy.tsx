import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Copy = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Shuffle
        const shuffle = useCallback(() => {
            animate(
                ".front-copy",
                { x: [0, 2, 0, -2, 0], y: [0, -1, 0, 1, 0] },
                { duration: 1, repeat: Infinity, ease: "linear" }
            );
        }, [animate]);

        // Hover: Slide Out
        const hoverSlide = useCallback(() => {
            animate(
                ".front-copy",
                { x: [0, 3, 0], y: [0, 3, 0] },
                { duration: 0.4, ease: "easeInOut" }
            );
        }, [animate]);

        // Click: Stamp/Print
        const playPrint = useCallback(async () => {
            // Press down
            await animate(".front-copy", { scale: 0.9, x: 1, y: 1 }, { duration: 0.1 });
            // Release
            animate(".front-copy", { scale: 1, x: 0, y: 0 }, { type: "spring", bounce: 0.5 });
            // BG flash
            animate(".back-copy", { opacity: [0.5, 1] }, { duration: 0.3 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".front-copy", { x: 0, y: 0, scale: 1 }, { duration: 0.2 });
            animate(".back-copy", { opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playPrint,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) shuffle();
            else stop();
        }, [loading, shuffle, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverSlide()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playPrint()}
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
                    className="back-copy"
                    d="M4.012 16.737a2.005 2.005 0 0 1 -1.012 -1.737v-10c0 -1.1 .9 -2 2 -2h10c.75 0 1.158 .385 1.5 1"
                />
                <motion.path
                    className="front-copy"
                    d="M7 7m0 2.667a2.667 2.667 0 0 1 2.667 -2.667h8.666a2.667 2.667 0 0 1 2.667 2.667v8.666a2.667 2.667 0 0 1 -2.667 2.667h-8.666a2.667 2.667 0 0 1 -2.667 -2.667z"
                />
            </motion.svg>
        );
    }
);

Copy.displayName = "Copy";
export default Copy;
