import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Sparkle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Shimmer
        const shimmer = useCallback(() => {
            animate(
                ".sparkle-path",
                { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Burst
        const playBurst = useCallback(async () => {
            await animate(
                ".sparkle-path",
                { scale: [1, 1.4, 1], rotate: [0, 90] },
                { duration: 0.4, ease: "backOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".sparkle-path", { scale: 1, rotate: 0, opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playBurst,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) shimmer();
            else stop();
        }, [loading, shimmer, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && playBurst()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playBurst()}
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
                whileTap={{ scale: 0.9 }}
            >
                <motion.path
                    className="sparkle-path"
                    d="M12 3l1.847 5.253l5.253 1.847l-5.253 1.847l-1.847 5.253l-1.847 -5.253l-5.253 -1.847l5.253 -1.847z"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

Sparkle.displayName = "Sparkle";
export default Sparkle;
