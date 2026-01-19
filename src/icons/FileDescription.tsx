import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const FileDescription = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Writing (Lines appear sequentially)
        const write = useCallback(() => {
            animate(
                ".file-lines",
                { opacity: [0.3, 1, 0.3], pathLength: [0.8, 1, 0.8] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Review (Reading scan)
        const hoverRead = useCallback(() => {
            animate(
                ".file-lines",
                { x: [0, 1, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Fold Corner
        const playFold = useCallback(async () => {
            // 1. Fold In
            await animate(".file-fold", { pathLength: 0, opacity: 0 }, { duration: 0.1 });
            await animate(".file-fold", { pathLength: 1, opacity: 1 }, { duration: 0.3, type: "spring", stiffness: 200 });

            // 2. Body shake
            animate("svg", { rotate: [0, -5, 5, 0] }, { duration: 0.3 });

        }, [animate]);

        const stop = useCallback(() => {
            animate(".file-lines", { opacity: 1, pathLength: 1, x: 0 }, { duration: 0.2 });
            animate(".file-fold", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
            animate("svg", { rotate: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playFold,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) write();
            else stop();
        }, [loading, write, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverRead()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playFold()}
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
                    d="M14 3v4a1 1 0 0 0 1 1h4"
                    className="file-fold"
                    initial={{ pathLength: 1 }}
                />

                <path d="M17 21h-10a2 2 0 0 1 -2 -2v-14a2 2 0 0 1 2 -2h7l5 5v11a2 2 0 0 1 -2 2z" />

                <motion.g className="file-lines">
                    <path d="M9 17h6" />
                    <path d="M9 13h6" />
                </motion.g>
            </motion.svg>
        );
    }
);

FileDescription.displayName = "FileDescription";
export default FileDescription;
