import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Clock = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Slow Time Moving
        const timeFlow = useCallback(() => {
            animate(
                ".clock-hands",
                { rotate: 360 },
                { duration: 4, repeat: Infinity, ease: "linear" }
            );
        }, [animate]);

        // Hover: Continuous Tick Tock (Pendulum)
        const hoverTick = useCallback(() => {
            animate(
                ".clock-hands",
                { rotate: [-20, 20] },
                { duration: 0.8, repeat: Infinity, repeatType: "mirror", ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Time Flies (Fast Spin)
        const playTimeFly = useCallback(async () => {
            await animate(
                ".clock-hands",
                { rotate: 360 },
                { duration: 0.6, ease: "easeInOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".clock-hands", { rotate: 0 }, { duration: 0.3, ease: "easeOut" });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playTimeFly,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) timeFlow();
            else stop();
        }, [loading, timeFlow, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverTick()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playTimeFly()}
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
                <motion.circle cx="12" cy="12" r="9" className="clock-body" />
                <motion.path
                    d="M12 7v5l3 3"
                    className="clock-hands"
                    style={{ transformOrigin: "12px 12px" }}
                />
            </motion.svg>
        );
    }
);

Clock.displayName = "Clock";
export default Clock;
