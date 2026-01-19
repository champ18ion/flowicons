import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const HandHeart = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Float + Heartbeat (Visibly waiting)
        const float = useCallback(() => {
            animate(
                "svg",
                { y: [-2, 2, -2] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".heart",
                { scale: [1, 1.15, 1] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Heart Pulse (Offering Love)
        const hoverPulse = useCallback(() => {
            animate(
                ".heart",
                { scale: [1, 1.2, 1] },
                { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Hand Lift + Heart Pop
        const playOffer = useCallback(async () => {
            // Hand lifts up
            animate(".hand", { y: -3 }, { duration: 0.3, ease: "easeOut" });

            // Heart pops and floats up
            await animate(
                ".heart",
                { y: -6, scale: 1.3, opacity: [1, 0.8, 1] },
                { duration: 0.4, ease: "backOut" }
            );

            // Reset
            animate(".hand", { y: 0 }, { duration: 0.3, ease: "easeOut" });
            animate(".heart", { y: 0, scale: 1 }, { duration: 0.3, ease: "backOut" });


        }, [animate]);

        const stop = useCallback(() => {
            animate("svg", { y: 0 }, { duration: 0.2 });
            animate(".hand", { y: 0 }, { duration: 0.2 });
            animate(".heart", { y: 0, scale: 1, opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playOffer,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) float();
            else stop();
        }, [loading, float, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverPulse()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playOffer()}
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
                <motion.g className="hand">
                    <path d="M11 14h2a2 2 0 0 0 0-4h-3c-.6 0-1.1.2-1.4.6L3 16" />
                    <path d="m2 15 6 6" />
                    <path d="m7 20 1.6-1.4c.3-.4.8-.6 1.4-.6h4c1.1 0 2.1-.4 2.8-1.2l4.6-4.4a1 1 0 0 0-2.75-2.91" />
                </motion.g>
                <motion.path
                    className="heart"
                    style={{ transformOrigin: "16px 8px" }}
                    d="m14.45 13.39 5.05-4.694C20.196 8 21 6.85 21 5.75a2.75 2.75 0 0 0-4.797-1.837.276.276 0 0 1-.406 0A2.75 2.75 0 0 0 11 5.75c0 1.2.802 2.248 1.5 2.946L16 11.95"
                />
            </motion.svg>
        );
    }
);

HandHeart.displayName = "HandHeart";
export default HandHeart;
