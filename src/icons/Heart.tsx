import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Heart = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Heartbeat
        const beat = useCallback(() => {
            animate(
                ".heart",
                { scale: [1, 1.15, 1, 1.15, 1] },
                {
                    duration: 1.2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    times: [0, 0.15, 0.3, 0.45, 1]
                }
            );
        }, [animate]);

        // Action: Pop / Love
        const pump = useCallback(async () => {
            await animate(
                ".heart",
                { scale: [1, 1.15, 0.9, 1.25, 1], fill: ["transparent", "red", "red", "red", "transparent"], stroke: [color, "red", "red", "red", color] },
                { duration: 0.6, ease: "easeOut" }
            );
        }, [animate, color]);

        const stop = useCallback(() => {
            animate(".heart", { scale: 1, fill: "transparent", stroke: color }, { duration: 0.2, ease: "easeOut" });
        }, [animate, color]);

        useImperativeHandle(ref, () => ({
            play: pump,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) beat();
            else stop();
        }, [loading, beat, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading &&
                    animate(".heart", { scale: 1.1 }, { duration: 0.3, ease: "easeOut" }) // Hover = Gentle Warmth
                }
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && pump()} // Click = Pump
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
                    className="heart"
                    style={{ transformOrigin: "50% 50%" }}
                    d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
                />
            </motion.svg>
        );
    }
);

Heart.displayName = "Heart";

export default Heart;
