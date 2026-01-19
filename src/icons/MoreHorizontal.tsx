import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const MoreHorizontal = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Wave Animation (User liked this)
        const wave = useCallback(() => {
            animate(
                ".dot",
                { y: [0, -3, 0] },
                { duration: 0.6, repeat: Infinity, repeatDelay: 0.2, delay: (i) => i * 0.1, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Ripple Scale (Stronger)
        const hoverRipple = useCallback(() => {
            animate(
                ".dot",
                { scale: [1, 1.2, 1] },
                { duration: 0.4, delay: (i) => i * 0.1, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Expand Out
        const playExpand = useCallback(async () => {
            animate(
                ".dot-left",
                { x: [-2, 0], scale: [1, 1.2, 1] },
                { duration: 0.3, ease: "easeOut" }
            );

            animate(
                ".dot-center",
                { scale: [1, 1.3, 1] },
                { duration: 0.3, delay: 0.1, ease: "easeOut" }
            );

            animate(
                ".dot-right",
                { x: [2, 0], scale: [1, 1.2, 1] },
                { duration: 0.3, delay: 0.2, ease: "easeOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".dot", { x: 0, y: 0, scale: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playExpand,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) wave();
            else stop();
        }, [loading, wave, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverRipple()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playExpand()}
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
                    className="dot dot-left"
                    cx="5" cy="12" r="1"
                    style={{ transformOrigin: "50% 50%" }}
                    custom={0}
                />

                <motion.circle
                    className="dot dot-center"
                    cx="12" cy="12" r="1"
                    style={{ transformOrigin: "50% 50%" }}
                    custom={1}
                />

                <motion.circle
                    className="dot dot-right"
                    cx="19" cy="12" r="1"
                    style={{ transformOrigin: "50% 50%" }}
                    custom={2}
                />
            </motion.svg>
        );
    }
);

MoreHorizontal.displayName = "MoreHorizontal";
export default MoreHorizontal;
