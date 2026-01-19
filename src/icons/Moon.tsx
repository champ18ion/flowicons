import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Moon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Noticeable Swing
        const tilt = useCallback(() => {
            animate(
                ".moon",
                { rotate: [-15, 15, -15], scale: [1, 1.05, 1] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Swing
        const hoverSwing = useCallback(() => {
            animate(
                ".moon",
                { rotate: [0, -15, 0, 15, 0] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Night Cycle (Full Spin)
        const playNight = useCallback(async () => {
            await animate(
                ".moon",
                { rotate: 360, scale: [1, 1.1, 1] },
                { duration: 0.6, ease: "backInOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".moon", { rotate: 0, scale: 1 }, { duration: 0.3 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playNight,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) tilt();
            else stop();
        }, [loading, tilt, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverSwing()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playNight()}
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
                    className="moon"
                    d="M12 3c.132 0 .263 0 .393 0a7.5 7.5 0 0 0 7.92 12.446a9 9 0 1 1 -8.313 -12.454z"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

Moon.displayName = "Moon";
export default Moon;
