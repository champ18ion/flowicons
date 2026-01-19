import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const MessageCircle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Subtle "Breathing" / Typing Pulse
        const breathe = useCallback(() => {
            animate(
                ".message-path",
                { scale: [1, 1.05, 1] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: "Ding!" Notification Shake (Stronger)
        const hoverShake = useCallback(() => {
            animate(
                ".message-path",
                {
                    rotate: [0, -10, 10, -5, 5, 0],
                    scale: 1.1
                },
                { duration: 0.4, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Draw Draw & Pop
        const playMessage = useCallback(async () => {
            // 1. Reset
            await animate(".message-path", { pathLength: 0, opacity: 0, rotate: 0, scale: 0.8 }, { duration: 0 });

            // 2. Draw + Pop in
            await animate(
                ".message-path",
                {
                    pathLength: [0, 1],
                    opacity: [0, 1],
                    scale: [0.8, 1.1, 1]
                },
                { duration: 0.6, ease: "circOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".message-path", { pathLength: 1, opacity: 1, scale: 1, rotate: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playMessage,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) breathe();
            else stop();
        }, [loading, breathe, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverShake()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playMessage()}
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
                <motion.path
                    className="message-path"
                    d="M2.992 16.342a2 2 0 0 1 .094 1.167l-1.065 3.29a1 1 0 0 0 1.236 1.168l3.413-.998a2 2 0 0 1 1.099.092 10 10 0 1 0-4.777-4.719"
                    initial={{ pathLength: 1, opacity: 1 }}
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

MessageCircle.displayName = "MessageCircle";
export default MessageCircle;
