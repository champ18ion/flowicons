import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

export interface TrashIconProps extends AnimatedIconProps {
    shakeOnClick?: boolean;
    dangerHover?: boolean;
    keepOpenOnDelete?: boolean;
}

const Trash = forwardRef<AnimatedIconHandle, TrashIconProps>(
    (
        {
            size = 24,
            color = "currentColor",
            strokeWidth = 2,
            className = "",
            loading = false,
            shakeOnClick = true, // Default to true for standard feel
            dangerHover = false,
            keepOpenOnDelete = false,
        },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Stinky Rattle (Lid shakes because it smells)
        const rattle = useCallback(() => {
            animate(
                ".trash-lid-group",
                { rotate: [-3, 3, -3], x: [-1, 1, -1] },
                { duration: 0.2, repeat: Infinity, repeatDelay: 1, ease: "linear" }
            );
        }, [animate]);

        // Hover: Teeter (Lid floats/teeters continuously)
        const hoverTeeter = useCallback(() => {
            // Color change if dangerHover
            if (dangerHover) {
                animate(".trash-icon", { stroke: "#ef4444" }, { duration: 0.2 });
            }

            animate(
                ".trash-lid-group",
                { rotate: [-15, 0, -10, 0], y: [-3, 0, -1, 0] },
                { duration: 1.5, repeat: Infinity, ease: "linear" }
            );
        }, [animate, dangerHover]);

        const hoverEnd = useCallback(() => {
            if (dangerHover) {
                animate(".trash-icon", { stroke: color }, { duration: 0.2 });
            }
            animate(".trash-lid-group", { rotate: 0, y: 0, x: 0 }, { duration: 0.2 });
        }, [animate, dangerHover, color]);

        // Action: Slam!
        const playSlam = useCallback(async () => {
            // 1. Lift High
            await animate(".trash-lid-group", { rotate: -45, y: -5 }, { duration: 0.1, ease: "easeOut" });

            // 2. Slam Down + Shake Body
            const slamPromises = [
                animate(".trash-lid-group", { rotate: 0, y: 0 }, { duration: 0.1, ease: "backIn" }),
                shakeOnClick ? animate(".trash-body", { y: [0, 2, 0], scaleY: [1, 0.9, 1] }, { duration: 0.2, delay: 0.1 }) : Promise.resolve()
            ];

            await Promise.all(slamPromises);

            // Optional: Keep open logic (user requested, though standard is one-shot. I'll stick to one-shot for standard play, unless props say otherwise)
            if (keepOpenOnDelete) {
                animate(".trash-lid-group", { rotate: -30, y: -4 }, { duration: 0.2 });
            }

        }, [animate, shakeOnClick, keepOpenOnDelete]);

        const stop = useCallback(() => {
            animate(".trash-lid-group", { rotate: 0, y: 0, x: 0 }, { duration: 0.2 });
            animate(".trash-body", { y: 0, scaleY: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSlam,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) rattle();
            else stop();
        }, [loading, rattle, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverTeeter()}
                onMouseLeave={() => !loading && hoverEnd()}
                onClick={() => !loading && playSlam()}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${className} cursor-pointer trash-icon`}
                style={{ overflow: "visible" }}
                whileTap={{ scale: 0.95 }}
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />

                {/* Lid Group */}
                <motion.g className="trash-lid-group" style={{ transformOrigin: "12px 7px" }}>
                    <path d="M4 7l16 0" />
                    <path d="M9 7v-3a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v3" />
                </motion.g>

                {/* Body Group */}
                <motion.g className="trash-body" style={{ transformOrigin: "bottom" }}>
                    <path d="M10 11l0 6" />
                    <path d="M14 11l0 6" />
                    <path d="M5 7l1 12a2 2 0 0 0 2 2h8a2 2 0 0 0 2 -2l1 -12" />
                </motion.g>
            </motion.svg>
        );
    }
);

Trash.displayName = "Trash";
export default Trash;
