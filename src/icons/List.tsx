import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const List = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Sequential Opacity Ripple (User liked this)
        const loadSequence = useCallback(() => {
            animate(
                ".list-line",
                { opacity: [0.3, 1, 0.3] },
                { duration: 1.5, repeat: Infinity, delay: (i) => i * 0.2, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Staggered Line Slide (Stronger)
        const hoverSlide = useCallback(() => {
            animate(
                ".list-line",
                { x: [0, 3, 0] },
                { duration: 0.4, delay: (i) => i * 0.1, ease: "easeInOut" }
            );
            animate(
                ".list-bullet",
                { scale: [1, 1.3, 1] },
                { duration: 0.4, delay: 0.1, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Draw Lines
        const playDraw = useCallback(async () => {
            const lines = [".list-line-1", ".list-line-2", ".list-line-3"];

            // Reset first
            await animate(lines.join(", "), { scaleX: 0 }, { duration: 0 });

            // Animate lines
            animate(
                lines[0],
                { scaleX: [0, 1] },
                { duration: 0.25, ease: "easeOut" }
            );
            animate(
                lines[1],
                { scaleX: [0, 1] },
                { duration: 0.25, ease: "easeOut", delay: 0.1 }
            );
            animate(
                lines[2],
                { scaleX: [0, 1] },
                { duration: 0.25, ease: "easeOut", delay: 0.2 }
            );

            // Pulse bullets
            animate(
                ".list-bullet",
                { scale: [1, 1.3, 1] },
                { duration: 0.4, ease: "easeInOut", delay: 0.1 }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".list-line", { scaleX: 1, opacity: 1, x: 0 }, { duration: 0.2 });
            animate(".list-bullet", { scale: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playDraw,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) loadSequence();
            else stop();
        }, [loading, loadSequence, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverSlide()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playDraw()}
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

                {/* List lines - added custom indices for stagger */}
                <motion.path
                    d="M9 6l11 0"
                    className="list-line list-line-1"
                    style={{ transformOrigin: "9px 6px" }}
                    custom={0}
                />
                <motion.path
                    d="M9 12l11 0"
                    className="list-line list-line-2"
                    style={{ transformOrigin: "9px 12px" }}
                    custom={1}
                />
                <motion.path
                    d="M9 18l11 0"
                    className="list-line list-line-3"
                    style={{ transformOrigin: "9px 18px" }}
                    custom={2}
                />

                {/* Bullets */}
                <motion.g className="list-bullets">
                    <motion.path className="list-bullet" d="M5 6l0 .01" />
                    <motion.path className="list-bullet" d="M5 12l0 .01" />
                    <motion.path className="list-bullet" d="M5 18l0 .01" />
                </motion.g>
            </motion.svg>
        );
    }
);

List.displayName = "List";
export default List;
