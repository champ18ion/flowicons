import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Lock = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Jiggle
        const jiggle = useCallback(() => {
            animate(
                ".lock-body",
                { rotate: [0, -2, 2, 0] },
                { duration: 0.5, repeat: Infinity, repeatDelay: 1, ease: "linear" }
            );
        }, [animate]);

        // Hover: Peek (Shackle lifts slightly)
        const hoverPeek = useCallback(() => {
            animate(".shackle", { y: -2 }, { duration: 0.3, ease: "easeOut" });
        }, [animate]);

        // Action: Unlock (Shackle Rotate & Lift) - User loved this
        const playUnlock = useCallback(async () => {
            await animate(
                ".shackle",
                { rotate: 45, y: -4, x: 2 },
                { duration: 0.3, ease: "backOut" }
            );

            // Hold briefly then close
            await new Promise(r => setTimeout(r, 200));

            await animate(
                ".shackle",
                { rotate: 0, y: 0, x: 0 },
                { duration: 0.3, ease: "backOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".lock-body", { rotate: 0 }, { duration: 0.2 });
            animate(".shackle", { rotate: 0, y: 0, x: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playUnlock,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) jiggle();
            else stop();
        }, [loading, jiggle, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverPeek()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playUnlock()}
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
                    className="shackle"
                    d="M7 11V7a5 5 0 0 1 10 0v4"
                    style={{ transformOrigin: "bottom right" }} // Key to the "lift" feel
                />
                <motion.rect
                    className="lock-body"
                    x="3" y="11" width="18" height="11" rx="2" ry="2"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

Lock.displayName = "Lock";
export default Lock;
