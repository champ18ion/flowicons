import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Camera = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Slow Focus Breathe
        const breathe = useCallback(() => {
            animate(
                ".lens",
                { scale: [1, 1.1, 1], opacity: [1, 0.8, 1] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Focus In
        const hoverFocus = useCallback(() => {
            animate(".lens", { scale: 1.2 }, { duration: 0.3, ease: "easeOut" });
            animate(".body", { scale: 0.95 }, { duration: 0.3, ease: "easeOut" });
        }, [animate]);

        // Action: Flash Photo (Fill, Flash, Shake)
        const playPhoto = useCallback(async () => {
            // 1. Shutter press (compress)
            await animate(".lens", { scale: 0.8 }, { duration: 0.1 });

            // 2. Flash! (Fill white, Expand)
            await Promise.all([
                animate(
                    ".lens",
                    { scale: 1.3, fill: color, fillOpacity: 0.5 },
                    { duration: 0.1, ease: "circOut" }
                ),
                animate(
                    ".flash-overlay",
                    { opacity: [0, 1, 0] },
                    { duration: 0.15 }
                )
            ]);

            // 3. Recover
            animate(
                ".lens",
                { scale: 1, fill: "transparent", fillOpacity: 0 },
                { duration: 0.4, ease: "backOut" }
            );
            animate(".body", { scale: 1 }, { duration: 0.4, ease: "backOut" });

        }, [animate, color]);

        const stop = useCallback(() => {
            animate(".lens", { scale: 1, fillOpacity: 0 }, { duration: 0.2 });
            animate(".body", { scale: 1 }, { duration: 0.2 });
            animate(".flash-overlay", { opacity: 0 }, { duration: 0.1 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playPhoto,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) breathe();
            else stop();
        }, [loading, breathe, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverFocus()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playPhoto()}
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
                    className="body"
                    d="M13.997 4a2 2 0 0 1 1.76 1.05l.486.9A2 2 0 0 0 18.003 7H20a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V9a2 2 0 0 1 2-2h1.997a2 2 0 0 0 1.759-1.048l.489-.904A2 2 0 0 1 10.004 4z"
                    style={{ transformOrigin: "center" }}
                />
                <motion.circle
                    className="lens"
                    style={{ transformOrigin: "12px 13px" }}
                    cx="12"
                    cy="13"
                    r="3"
                />
                {/* Flash effect overlay */}
                <motion.rect
                    className="flash-overlay"
                    x="-10" y="-10" width="44" height="44"
                    fill={color}
                    opacity={0}
                    style={{ pointerEvents: "none" }}
                />
            </motion.svg>
        );
    }
);

Camera.displayName = "Camera";
export default Camera;
