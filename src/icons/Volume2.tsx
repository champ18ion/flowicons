import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Volume2 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Hum (Low volume)
        const hum = useCallback(() => {
            animate(
                ".wave-inner",
                { opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Blast (Loud volume)
        const hoverBlast = useCallback(() => {
            animate(
                ".wave-inner",
                { opacity: [0.5, 1, 0.5], scale: [1, 1.2, 1] },
                { duration: 0.6, repeat: Infinity, repeatDelay: 0.1 }
            );
            animate(
                ".wave-outer",
                { opacity: [0.3, 1, 0.3], scale: [1, 1.3, 1] },
                { duration: 0.6, repeat: Infinity, delay: 0.1, repeatDelay: 0.1 }
            );
        }, [animate]);

        // Action: Bass Kick
        const playKick = useCallback(async () => {
            await animate(
                "svg",
                { scale: [1, 1.3, 0.9, 1] },
                { duration: 0.4, type: "spring", bounce: 0.6 }
            );
            // Waves expand out
            animate(".wave-outer", { x: [0, 2, 0] }, { duration: 0.3 });

        }, [animate]);

        const stop = useCallback(() => {
            animate("svg", { scale: 1 }, { duration: 0.2 });
            animate(".wave-inner", { opacity: 1, scale: 1 }, { duration: 0.2 });
            animate(".wave-outer", { opacity: 1, scale: 1, x: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playKick,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) hum();
            else stop();
        }, [loading, hum, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverBlast()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playKick()}
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
                <path d="M11 4.702a.705.705 0 0 0-1.203-.498L6.413 7.587A1.4 1.4 0 0 1 5.416 8H3a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h2.416a1.4 1.4 0 0 1 .997.413l3.383 3.384A.705.705 0 0 0 11 19.298z" />

                <motion.path
                    className="wave-inner"
                    d="M16 9a5 5 0 0 1 0 6"
                    style={{ transformOrigin: "16px 12px" }}
                />

                <motion.path
                    className="wave-outer"
                    d="M19.364 18.364a9 9 0 0 0 0-12.728"
                    style={{ transformOrigin: "19.364px 12px" }}
                />
            </motion.svg>
        );
    }
);

Volume2.displayName = "Volume2";
export default Volume2;
