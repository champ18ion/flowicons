import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const DotsVertical = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Opacity Ripple
        const ripple = useCallback(() => {
            animate(".dot-top", { opacity: [1, 0.5, 1] }, { duration: 1.5, repeat: Infinity, delay: 0 });
            animate(".dot-middle", { opacity: [1, 0.5, 1] }, { duration: 1.5, repeat: Infinity, delay: 0.2 });
            animate(".dot-bottom", { opacity: [1, 0.5, 1] }, { duration: 1.5, repeat: Infinity, delay: 0.4 });
        }, [animate]);

        // Hover: Scale/Offset Ripple (User Provided)
        const start = useCallback(async () => {
            animate(
                ".dot-top",
                {
                    y: [-2, 0],
                    scale: [1, 1.2, 1],
                },
                {
                    duration: 0.3,
                    ease: "easeOut",
                },
            );

            animate(
                ".dot-middle",
                {
                    scale: [1, 1.3, 1],
                },
                {
                    duration: 0.3,
                    delay: 0.1,
                    ease: "easeOut",
                },
            );

            animate(
                ".dot-bottom",
                {
                    y: [2, 0],
                    scale: [1, 1.2, 1],
                },
                {
                    duration: 0.3,
                    delay: 0.2,
                    ease: "easeOut",
                },
            );
        }, [animate]);

        // Click: Snap Expand
        const playSnap = useCallback(async () => {
            await animate("path:not([stroke='none'])", { scale: 0.5 }, { duration: 0.1 });
            animate("path:not([stroke='none'])", { scale: 1 }, { type: "spring", bounce: 0.6 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(
                ".dot-top, .dot-middle, .dot-bottom",
                { y: 0, scale: 1, opacity: 1 },
                { duration: 0.2, ease: "easeInOut" },
            );
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSnap,
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

                <motion.path
                    d="M12 12m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
                    className="dot-middle"
                    style={{ transformOrigin: "50% 50%" }}
                />

                <motion.path
                    d="M12 19m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
                    className="dot-bottom"
                    style={{ transformOrigin: "50% 50%" }}
                />

                <motion.path
                    d="M12 5m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0"
                    className="dot-top"
                    style={{ transformOrigin: "50% 50%" }}
                />
            </motion.svg>
        );
    }
);

DotsVertical.displayName = "DotsVertical";
export default DotsVertical;
