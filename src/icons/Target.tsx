import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Target = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Concentric Ripple
        const ripple = useCallback(() => {
            animate(".circle-inner", { opacity: [1, 0.5, 1], scale: [1, 0.8, 1] }, { duration: 2, repeat: Infinity, delay: 0 });
            animate(".circle-middle", { opacity: [1, 0.5, 1], scale: [1, 0.9, 1] }, { duration: 2, repeat: Infinity, delay: 0.2 });
            animate(".circle-outer", { opacity: [1, 0.5, 1], scale: [1, 0.95, 1] }, { duration: 2, repeat: Infinity, delay: 0.4 });
        }, [animate]);

        // Hover: Pulse Outward (User Provided)
        const start = useCallback(async () => {
            // Pulse all circles outward from center
            animate(
                ".circle-outer",
                {
                    scale: [1, 1.1, 1],
                    opacity: [1, 0.7, 1],
                },
                {
                    duration: 0.6,
                    ease: "easeInOut",
                },
            );

            animate(
                ".circle-middle",
                {
                    scale: [1, 1.15, 1],
                    opacity: [1, 0.6, 1],
                },
                {
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: 0.1,
                },
            );

            await animate(
                ".circle-inner",
                {
                    scale: [1, 1.3, 1],
                    opacity: [1, 0.5, 1],
                },
                {
                    duration: 0.6,
                    ease: "easeInOut",
                    delay: 0.2,
                },
            );
        }, [animate]);

        // Click: Bullseye Hit
        const playHit = useCallback(async () => {
            await animate("circle", { scale: 0.8 }, { duration: 0.1 });
            animate("circle", { scale: 1 }, { type: "spring", bounce: 0.6 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(
                ".circle-outer, .circle-middle, .circle-inner",
                { scale: 1, opacity: 1 },
                { duration: 0.2, ease: "easeInOut" },
            );
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playHit,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) ripple();
            else stop();
        }, [loading, ripple, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && start()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playHit()}
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
                <motion.circle
                    className="circle-outer"
                    cx="12"
                    cy="12"
                    r="10"
                    style={{ transformOrigin: "12px 12px" }}
                />

                <motion.circle
                    className="circle-middle"
                    cx="12"
                    cy="12"
                    r="6"
                    style={{ transformOrigin: "12px 12px" }}
                />

                <motion.circle
                    className="circle-inner"
                    cx="12"
                    cy="12"
                    r="2"
                    style={{ transformOrigin: "12px 12px" }}
                />
            </motion.svg>
        );
    }
);

Target.displayName = "Target";
export default Target;
