import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Eye = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Look Around
        const lookAround = useCallback(() => {
            animate(
                ".eye-pupil",
                { x: [0, 3, -3, 0], y: [0, -1, 1, 0] },
                { duration: 2, repeat: Infinity, repeatDelay: 0.5, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Continuous Dilate (Pulse of the pupil)
        const hoverDilate = useCallback(() => {
            animate(
                ".eye-pupil",
                { scale: [1, 1.25, 1] },
                { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Blink
        const playBlink = useCallback(async () => {
            // Quick blink
            await animate(
                ".eye-shape",
                { scaleY: [1, 0.1, 1] },
                { duration: 0.25, ease: "easeInOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".eye-shape", { scaleY: 1 }, { duration: 0.2 });
            animate(".eye-pupil", { scale: 1, x: 0, y: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playBlink,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) lookAround();
            else stop();
        }, [loading, lookAround, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverDilate()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playBlink()}
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
                    d="M10 12a2 2 0 1 0 4 0a2 2 0 0 0 -4 0"
                    className="eye-pupil"
                    style={{ transformOrigin: "50% 50%" }}
                />

                <motion.path
                    d="M21 12c-2.4 4 -5.4 6 -9 6c-3.6 0 -6.6 -2 -9 -6c2.4 -4 5.4 -6 9 -6c3.6 0 6.6 2 9 6"
                    className="eye-shape"
                    style={{ transformOrigin: "50% 50%" }}
                />
            </motion.svg>
        );
    }
);

Eye.displayName = "Eye";
export default Eye;
