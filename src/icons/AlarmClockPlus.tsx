import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const AlarmClockPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Slow rocking
        const rock = useCallback(() => {
            animate(
                ".clock-group",
                { rotate: [-5, 5, -5] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Continuous Ringing (Going on!)
        const hoverRing = useCallback(() => {
            animate(
                ".bells",
                { rotate: [-15, 15] },
                { duration: 0.15, repeat: Infinity, repeatType: "mirror", ease: "linear" }
            );
        }, [animate]);

        // Action: Full Ring + Plus Pop (Add Alarm)
        const playAddAlarm = useCallback(async () => {
            // 1. Ring bells vigorously
            const ring = animate(
                ".bells",
                {
                    rotate: [-25, 25, -20, 20, -15, 15, 0],
                    x: [-1, 1, -1, 1, 0]
                },
                { duration: 0.6, ease: "linear" }
            );

            // 2. Shake clock body
            const shake = animate(
                ".clock-body",
                { x: [-2, 2, -2, 2, 0] },
                { duration: 0.6, ease: "linear" }
            );

            // 3. Pop the Plus
            const popPlus = animate(
                ".plus",
                { scale: [1, 1.5, 1], rotate: [0, 90, 0] },
                { duration: 0.4, delay: 0.1, ease: "backOut" }
            );

            await Promise.all([ring, shake, popPlus]);
        }, [animate]);

        const stop = useCallback(() => {
            animate(".clock-group", { rotate: 0 }, { duration: 0.2 });
            animate(".bells", { rotate: 0, x: 0 }, { duration: 0.2 });
            animate(".clock-body", { x: 0 }, { duration: 0.2 });
            animate(".plus", { scale: 1, rotate: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playAddAlarm,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) rock();
            else stop();
        }, [loading, rock, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverRing()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playAddAlarm()}
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
                <motion.g className="clock-group" style={{ transformOrigin: "center" }}>
                    <motion.path
                        className="bells"
                        style={{ transformOrigin: "bottom right" }}
                        d="M5 3 2 6"
                    />
                    <motion.path
                        className="bells"
                        style={{ transformOrigin: "bottom left" }}
                        d="m22 6-3-3"
                    />
                    <motion.circle className="clock-body" cx="12" cy="13" r="8" />
                    <motion.path className="clock-body" d="M6.38 18.7 4 21" />
                    <motion.path className="clock-body" d="M17.64 18.67 20 21" />

                    <motion.g className="plus" style={{ transformOrigin: "12px 13px" }}>
                        <path d="M12 10v6" />
                        <path d="M9 13h6" />
                    </motion.g>
                </motion.g>
            </motion.svg>
        );
    }
);

AlarmClockPlus.displayName = "AlarmClockPlus";
export default AlarmClockPlus;
