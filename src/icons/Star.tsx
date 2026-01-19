import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Star = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Twinkle
        const twinkle = useCallback(() => {
            animate(
                ".star-outline",
                { scale: [1, 1.1, 1], opacity: [0.7, 1, 0.7] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Rotate/Spin (Playful)
        const hoverSpin = useCallback(() => {
            animate(
                ".star-outline",
                { rotate: [0, 15, -15, 0], scale: 1.1 },
                { duration: 0.5, ease: "backOut" }
            );
        }, [animate]);

        // Action: Fill + Scale Bounce (Starring/Favoriting)
        const playStar = useCallback(async () => {
            await Promise.all([
                animate(
                    ".star-fill",
                    { opacity: [0, 1], scale: [0.5, 1.2, 1] },
                    { duration: 0.4, ease: "backOut" }
                ),
                animate(
                    ".star-outline",
                    { scale: [1, 1.2, 1], rotate: [0, 360] }, // Full spin on click
                    { duration: 0.6, ease: "backOut" }
                )
            ]);
        }, [animate]);

        const stop = useCallback(() => {
            animate(".star-fill", { opacity: 0, scale: 0.5 }, { duration: 0.2 });
            animate(".star-outline", { scale: 1, rotate: 0, opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playStar,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) twinkle();
            else stop();
        }, [loading, twinkle, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverSpin()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playStar()}
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
                    className="star-fill"
                    d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                    fill={color}
                    stroke="none"
                    initial={{ opacity: 0, scale: 0.5 }}
                    style={{ transformOrigin: "center" }}
                />
                <motion.path
                    className="star-outline"
                    d="M12 17.75l-6.172 3.245l1.179 -6.873l-5 -4.867l6.9 -1l3.086 -6.253l3.086 6.253l6.9 1l-5 4.867l1.179 6.873z"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

Star.displayName = "Star";
export default Star;
