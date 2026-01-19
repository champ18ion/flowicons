import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ChevronLeft = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Bob Left
        const bob = useCallback(() => {
            animate(
                "path",
                { x: [0, -4, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Nudge Left
        const nudge = useCallback(() => {
            animate("path", { x: -6 }, { duration: 0.3, ease: "easeInOut" });
        }, [animate]);

        // Click: Snap Back
        const playSnap = useCallback(async () => {
            await animate("path", { x: -2 }, { duration: 0.1 });
            animate("path", { x: 0 }, { type: "spring", bounce: 0.6 });
        }, [animate]);

        const stop = useCallback(() => {
            animate("path", { x: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSnap,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) bob();
            else stop();
        }, [loading, bob, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && nudge()}
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
                <motion.path d="M15 6l-6 6l6 6" />
            </motion.svg>
        );
    }
);

ChevronLeft.displayName = "ChevronLeft";
export default ChevronLeft;
