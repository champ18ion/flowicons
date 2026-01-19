import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Player = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Strong Pulse
        const pulse = useCallback(() => {
            animate(
                scope.current,
                { scale: [1, 0.85, 1], opacity: [1, 0.5, 1] },
                { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate, scope]);

        // Hover: Eager Scale
        const hoverScale = useCallback(() => {
            animate(scope.current, { scale: 1.2 }, { duration: 0.2, ease: "easeOut" });
        }, [animate, scope]);

        // Click: Deep Press & Ripple
        const playPress = useCallback(async () => {
            // Deep Press
            await animate(scope.current, { scale: 0.8 }, { duration: 0.1 });
            // Release
            animate(scope.current, { scale: 1 }, { type: "spring", bounce: 0.6 });
        }, [animate, scope]);

        const stop = useCallback(() => {
            animate(scope.current, { scale: 1, opacity: 1 }, { duration: 0.2 });
        }, [animate, scope]);

        useImperativeHandle(ref, () => ({
            play: playPress,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) pulse();
            else stop();
        }, [loading, pulse, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverScale()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playPress()}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 24 24"
                fill="currentColor"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${className} cursor-pointer play-icon`}
                style={{ overflow: "visible", transformOrigin: "center" }}
                whileTap={{ scale: 0.95 }}
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M7 4v16l13 -8z" fill="currentColor" stroke="none" />
            </motion.svg>
        );
    }
);

Player.displayName = "Player";
export default Player;
