import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ShieldCheck = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Breathe (Protection pulse)
        const breathe = useCallback(() => {
            animate(
                ".shield-body",
                { scale: [1, 1.05, 1], strokeWidth: [strokeWidth, strokeWidth + 1, strokeWidth] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate, strokeWidth]);

        // Hover: Defend (Lively Shake)
        const hoverDefend = useCallback(() => {
            animate(
                ".shield-body",
                { rotate: [0, -5, 5, 0] },
                { duration: 0.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.1 }
            );
            animate(
                ".shield-check",
                { scale: [1, 1.2, 1] },
                { duration: 0.5, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.1 }
            );
        }, [animate]);

        // Action: Verify (Clang!)
        const playVerify = useCallback(async () => {
            // 1. Wind up
            await animate("svg", { scale: 0.9 }, { duration: 0.1 });

            // 2. Clang / Draw Check
            animate("svg", { scale: 1.1 }, { duration: 0.2, type: "spring", bounce: 0.6 });

            // Checkmark draws in
            await animate(".shield-check", { pathLength: [0, 1], opacity: [0, 1], scale: [0.5, 1.2, 1] }, { duration: 0.4, ease: "easeOut" });

            animate("svg", { scale: 1 }, { duration: 0.3 });

        }, [animate]);

        const stop = useCallback(() => {
            animate(".shield-body", { scale: 1, strokeWidth: strokeWidth, rotate: 0 }, { duration: 0.2 });
            animate(".shield-check", { pathLength: 1, opacity: 1, scale: 1 }, { duration: 0.2 });
            animate("svg", { scale: 1 }, { duration: 0.2 });
        }, [animate, strokeWidth]);

        useImperativeHandle(ref, () => ({
            play: playVerify,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) breathe();
            else stop();
        }, [loading, breathe, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverDefend()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playVerify()}
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
                    className="shield-body"
                    style={{ transformOrigin: "center" }}
                    d="M11.46 20.846a12 12 0 0 1 -7.96 -14.846a12 12 0 0 0 8.5 -3a12 12 0 0 0 8.5 3a12 12 0 0 1 -.09 7.06"
                />
                <motion.path
                    className="shield-check"
                    d="M15 19l2 2l4 -4"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

ShieldCheck.displayName = "ShieldCheck";
export default ShieldCheck;
