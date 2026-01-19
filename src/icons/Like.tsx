import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Like = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Floating/Bobbing
        const float = useCallback(() => {
            animate(
                ".like-icon",
                { y: [-2, 2, -2], rotate: [-2, 2, -2] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Cock Back (Ready to like)
        const hoverReady = useCallback(() => {
            animate(
                ".like-icon",
                { rotate: -15, scale: 1.1, x: -2 },
                { duration: 0.3, ease: "backOut" }
            );
        }, [animate]);

        // Action: Hit/Bounce (Smash that like button)
        const playLike = useCallback(async () => {
            await animate(
                ".like-icon",
                {
                    scale: [1, 0.8, 1.4, 0.9, 1],
                    rotate: [0, -20, 10, -5, 0],
                    x: [0, -5, 0, 0, 0]
                },
                { duration: 0.6, ease: "easeOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".like-icon", { scale: 1, rotate: 0, y: 0, x: 0 }, { duration: 0.2, ease: "easeOut" });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playLike,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) float();
            else stop();
        }, [loading, float, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverReady()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playLike()}
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
                <motion.g className="like-icon" style={{ transformOrigin: "center" }}>
                    <path d="M7 11v8a1 1 0 0 1 -1 1h-2a1 1 0 0 1 -1 -1v-7a1 1 0 0 1 1 -1h3a4 4 0 0 0 4 -4v-1a2 2 0 0 1 4 0v5h3a2 2 0 0 1 2 2l-1 5a2 3 0 0 1 -2 2h-7a3 3 0 0 1 -3 -3" />
                </motion.g>
            </motion.svg>
        );
    }
);

Like.displayName = "Like";
export default Like;
