import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const FilledChecked = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Gentle Pulse
        const pulse = useCallback(() => {
            animate(
                ".filled-circle",
                { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Heartbeat (Stronger presence loop)
        const hoverHeartbeat = useCallback(() => {
            animate(
                "svg",
                { scale: [1, 1.15, 1] },
                { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Pop In Check
        const playCheck = useCallback(async () => {
            // 1. Scale Up Circle
            animate(".filled-circle", { scale: 1.2 }, { duration: 0.2, ease: "easeOut" });

            // 2. Erase Check
            await animate(".check-icon", { pathLength: 0, opacity: 0 }, { duration: 0.1 });

            // 3. Draw Check & Normalize Circle
            animate(".filled-circle", { scale: 1 }, { duration: 0.3, ease: "backOut" });
            await animate(".check-icon", { pathLength: 1, opacity: 1 }, { duration: 0.3, ease: "easeOut" });

            // 4. Return SVG scale
            animate("svg", { scale: 1 }, { duration: 0.2 });

        }, [animate]);

        const stop = useCallback(() => {
            animate("svg", { scale: 1 }, { duration: 0.2 });
            animate(".filled-circle", { scale: 1, opacity: 1 }, { duration: 0.2 });
            animate(".check-icon", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playCheck,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) pulse();
            else stop();
        }, [loading, pulse, stop]);

        return (
            <motion.div
                ref={scope}
                onMouseEnter={() => !loading && hoverHeartbeat()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playCheck()}
                className={`inline-flex items-center justify-center ${className} cursor-pointer`}
                style={{ width: size, height: size }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={size}
                    height={size}
                    viewBox="0 0 24 24"
                    fill="none" // Ensure base is none
                    style={{ overflow: "visible" }}
                >
                    {/* Filled Circle Background */}
                    <motion.path
                        d="M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336z"
                        className="filled-circle"
                        style={{ transformOrigin: "center" }}
                        fill={color} // Fill with the primary color
                        stroke="none"
                    />
                    {/* Checkmark (The cut-out look via white stroke) */}
                    <motion.path
                        d="M15.707 9.293a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z"
                        className="check-icon"
                        fill="var(--bg-color, white)" // Default to white, or allow theme var. 'white' usually works for 'filled' look.
                        stroke="none"
                    />
                </motion.svg>
            </motion.div>
        );
    }
);

FilledChecked.displayName = "FilledChecked";
export default FilledChecked;
