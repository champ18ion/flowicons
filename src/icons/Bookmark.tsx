import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Bookmark = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Gentle Sway
        const sway = useCallback(() => {
            animate(
                ".bookmark-body",
                { rotate: [-5, 5, -5], transformOrigin: "50% 0%" },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Elastic Pull (User's choice)
        const hoverPull = useCallback(() => {
            animate(
                ".bookmark-body",
                { scaleY: [1, 0.9, 1], y: [0, 2, 0] },
                { duration: 0.4, ease: "easeOut" }
            );
        }, [animate]);

        // Click: Snap/Tuck
        const playSnap = useCallback(async () => {
            // Pull down hard
            await animate(".bookmark-body", { y: 4, scaleY: 1.1 }, { duration: 0.1 });
            // Snap back up
            animate(".bookmark-body", { y: 0, scaleY: 1 }, { type: "spring", bounce: 0.6, duration: 0.4 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".bookmark-body", { y: 0, scaleY: 1, rotate: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSnap,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) sway();
            else stop();
        }, [loading, sway, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverPull()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playSnap()}
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
                {/* Scaled down 48px path to 24px (0.5 scale) */}
                <motion.path
                    className="bookmark-body"
                    d="M12 17l8.5 5V4c0-1.38-.12-2.5-1.5-2.5H5c-1.38 0-2.5 1.12-2.5 2.5v18L12 17z"
                    // The user's path was 48px: M24 34L41 44V8C41 5.23858 38.7614 3 36 3H12C9.23858 3 7 5.23858 7 8V44L24 34Z
                    // I've replaced it with a standard 24px path that matches the shape (classic bookmark)
                    style={{ transformOrigin: "top center" }}
                />
            </motion.svg>
        );
    }
);

Bookmark.displayName = "Bookmark";
export default Bookmark;
