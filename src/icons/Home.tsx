import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Home = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Warmth (Breathing/Smoking chimney metaphor, simple scale)
        const breathe = useCallback(() => {
            animate(
                ".roof",
                { y: [0, -1, 0] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".door",
                { opacity: [1, 0.7, 1] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Welcome (Hats off) - Just roof, no body squash
        const hoverWelcome = useCallback(() => {
            animate(
                ".roof",
                { y: [0, -3, 0] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Open Door (Inviting)
        const playEnter = useCallback(async () => {
            // Open door
            await animate(".door", { scaleX: 0, x: 0 }, { duration: 0.2, ease: "easeIn" });
            // Wait slightly
            await new Promise(resolve => setTimeout(resolve, 100));
            // Close door
            animate(".door", { scaleX: 1, x: 0 }, { duration: 0.3, type: "spring", bounce: 0.4 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".roof", { y: 0 }, { duration: 0.2 });
            animate(".house-body", { scaleY: 1 }, { duration: 0.2 });
            animate(".door", { opacity: 1, scaleX: 1 }, { duration: 0.2 });
            animate("svg", { scale: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playEnter,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) breathe();
            else stop();
        }, [loading, breathe, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverWelcome()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playEnter()}
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
                <motion.path className="roof" d="M5 12l-2 0l9 -9l9 9l-2 0" style={{ transformOrigin: "bottom" }} />
                <motion.path
                    className="house-body"
                    style={{ transformOrigin: "bottom" }}
                    d="M5 12v7a2 2 0 0 0 2 2h10a2 2 0 0 0 2 -2v-7"
                />
                <motion.path
                    className="door"
                    style={{ transformOrigin: "bottom" }}
                    d="M9 21v-6a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v6"
                />
            </motion.svg>
        );
    }
);

Home.displayName = "Home";
export default Home;
