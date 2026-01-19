import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";
import { motion, useAnimate } from "motion/react";

const Send = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Hovering Paper Plane
        const hover = useCallback(() => {
            animate(
                ".send-icon",
                { y: [0, -2, 0, 2, 0], x: [0, 1, 0, -1, 0] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Fly away
        const fly = useCallback(async () => {
            await animate(
                ".send-icon",
                {
                    x: [0, 24],
                    y: [0, -24],
                    opacity: [1, 0],
                },
                { duration: 0.25, ease: "easeIn" }
            );

            // instant reset
            await animate(".send-icon", { x: -24, y: 24 }, { duration: 0 });

            // come back
            await animate(
                ".send-icon",
                {
                    x: [-24, 0],
                    y: [24, 0],
                    opacity: [0, 1],
                },
                { duration: 0.25, ease: "easeOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".send-icon", { x: 0, y: 0, opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: fly,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) hover();
            else stop();
        }, [loading, hover, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hover()} // Hover = Float/Ready
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && fly()} // Click = Send/Fly
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
                <motion.g className="send-icon" style={{ transformOrigin: "center" }}>
                    <path d="M22 2 11 13" />
                    <path d="m22 2-7 20-4-9-9-4 20-7z" />
                </motion.g>
            </motion.svg>
        );
    }
);

Send.displayName = "Send";
export default Send;
