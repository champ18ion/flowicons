import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Book = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Page Flutter
        const flutter = useCallback(() => {
            animate(
                ".book-cover",
                { scaleY: [1, 0.75, 1], rotate: [0, -8, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Draw Lines (User's choice)
        const hoverDraw = useCallback(() => {
            animate(".book-line-1", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.3, delay: 0 });
            animate(".book-line-2", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.3, delay: 0.1 });
            animate(".book-line-3", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.3, delay: 0.2 });
        }, [animate]);

        // Click: Open/Read
        const playOpen = useCallback(async () => {
            // Open wide
            await animate(".book-cover", { scaleX: 1.1, scaleY: 1.05 }, { duration: 0.15 });
            // Settle
            animate(".book-cover", { scaleX: 1, scaleY: 1 }, { type: "spring", bounce: 0.5 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".book-cover", { scaleX: 1, scaleY: 1, rotate: 0 }, { duration: 0.2 });
            animate(".book-line", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playOpen,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) flutter();
            else stop();
        }, [loading, flutter, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverDraw()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playOpen()}
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
                {/* Scaled & Standardized Book Paths (24px) */}
                <motion.path
                    className="book-cover"
                    d="M3 19a9 9 0 0 1 9 0a9 9 0 0 1 9 0"
                    strokeWidth={strokeWidth}
                />
                <motion.path
                    className="book-cover"
                    d="M3 6a9 9 0 0 1 9 0a9 9 0 0 1 9 0"
                    strokeWidth={strokeWidth}
                />
                <motion.path d="M3 6v13" strokeWidth={strokeWidth} />
                <motion.path d="M12 6v13" strokeWidth={strokeWidth} />
                <motion.path d="M21 6v13" strokeWidth={strokeWidth} />

                {/* Lines for animation */}
                <motion.path className="book-line book-line-1" d="M14 9h5" strokeWidth={strokeWidth} initial={{ pathLength: 1, opacity: 1 }} />
                <motion.path className="book-line book-line-2" d="M14 12h5" strokeWidth={strokeWidth} initial={{ pathLength: 1, opacity: 1 }} />
                <motion.path className="book-line book-line-3" d="M14 15h3" strokeWidth={strokeWidth} initial={{ pathLength: 1, opacity: 1 }} />
            </motion.svg>
        );
    }
);

Book.displayName = "Book";
export default Book;
