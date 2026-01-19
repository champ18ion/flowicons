import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Settings = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Slow Continuous Spin
        const spinSlow = useCallback(() => {
            animate(
                ".gear-rotator",
                { rotate: 360 },
                { duration: 4, repeat: Infinity, ease: "linear" }
            );
        }, [animate]);

        // Hover: Faster, Springy Spin
        const hoverSpin = useCallback(() => {
            animate(
                ".gear-rotator",
                { rotate: 90 },
                { duration: 0.5, ease: "backOut" }
            );
        }, [animate]);

        // Action: Rubber Band Spin (Squeeze/Stretch)
        const playRubberSpin = useCallback(async () => {
            // Squeeze
            await animate(
                ".gear-rotator",
                { scale: 0.8, rotate: -20 },
                { duration: 0.2, ease: "easeIn" }
            );
            // Explode / Stretch Spin
            await animate(
                ".gear-rotator",
                { scale: [1.2, 1], rotate: 360 },
                { duration: 0.6, type: "spring", bounce: 0.5 }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".gear-rotator", { rotate: 0, scale: 1 }, { duration: 0.3, ease: "circOut" });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playRubberSpin,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) spinSlow();
            else stop();
        }, [loading, spinSlow, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverSpin()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playRubberSpin()}
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
                <motion.g
                    className="gear-rotator"
                    style={{ transformOrigin: "center" }}
                >
                    <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 0 0 2.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 0 0 1.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 0 0-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 0 0-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 0 0-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 0 0-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 0 0 1.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                    <path d="M9 12a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" />
                </motion.g>
            </motion.svg>
        );
    }
);

Settings.displayName = "Settings";
export default Settings;
