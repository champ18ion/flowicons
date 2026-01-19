import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Pen = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Write (Looping scribble motion)
        const write = useCallback(() => {
            animate(
                ".pen-body",
                {
                    rotate: [0, -10, 5, 0],
                    x: [0, -2, 2, 0],
                },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Ready (Anticipation Wiggle)
        const hoverReady = useCallback(() => {
            animate(
                ".pen-body",
                { rotate: [0, -15, 0] },
                { duration: 0.5, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Slash (Draw the line)
        const playSlash = useCallback(async () => {
            // 1. Wind up
            await animate(".pen-body", { rotate: 20, x: 5, y: -5 }, { duration: 0.2 });

            // 2. Slash down
            animate(".pen-body", { rotate: -45, x: -10, y: 10 }, { duration: 0.2, ease: "easeOut" });
            await animate(".pen-slash", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.2, ease: "easeOut" });

            // 3. Reset
            animate(".pen-body", { rotate: 0, x: 0, y: 0 }, { duration: 0.4, type: "spring", bounce: 0.5, delay: 0.2 });
            animate(".pen-slash", { opacity: 0 }, { duration: 0.2, delay: 0.5 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".pen-body", { rotate: 0, x: 0, y: 0 }, { duration: 0.2 });
            animate(".pen-slash", { opacity: 0, pathLength: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSlash,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) write();
            else stop();
        }, [loading, write, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverReady()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playSlash()}
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
                    className="pen-slash"
                    d="M5 19l14 -14"
                    initial={{ pathLength: 0, opacity: 0 }}
                    style={{ strokeWidth: strokeWidth }}
                />
                <motion.path
                    className="pen-body"
                    d="M4 20h4l10.5 -10.5a1.5 1.5 0 0 0 -4 -4l-10.5 10.5v4"
                    style={{ transformOrigin: "center" }}
                />
                <motion.line
                    className="pen-body"
                    x1="13.5" y1="6.5" x2="17.5" y2="10.5"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

Pen.displayName = "Pen";
export default Pen;
