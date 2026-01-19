import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const PlayCircle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Spin
        const spin = useCallback(() => {
            animate(
                scope.current,
                { rotate: 360 },
                { duration: 2, repeat: Infinity, ease: "linear" }
            );
        }, [animate, scope]);

        // Hover: Eager Scale
        const hoverScale = useCallback(() => {
            animate(scope.current, { scale: 1.15 }, { duration: 0.2, ease: "easeOut" });
        }, [animate, scope]);

        // Click: Press & Ripple
        const playPress = useCallback(async () => {
            // Deep Press
            await animate(scope.current, { scale: 0.85 }, { duration: 0.1 });
            // Release
            animate(scope.current, { scale: 1 }, { type: "spring", bounce: 0.6 });
        }, [animate, scope]);

        const stop = useCallback(() => {
            animate(scope.current, { scale: 1, rotate: 0 }, { duration: 0.2 });
        }, [animate, scope]);

        useImperativeHandle(ref, () => ({
            play: playPress,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) spin();
            else stop();
        }, [loading, spin, stop]);

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
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round"
                strokeLinejoin="round"
                className={`${className} cursor-pointer`}
                style={{ overflow: "visible", transformOrigin: "center" }}
                whileTap={{ scale: 0.95 }}
            >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <circle cx="12" cy="12" r="9" />
                <path d="M10 8l6 4l-6 4v-8" fill="currentColor" stroke="none" />
            </motion.svg>
        );
    }
);

PlayCircle.displayName = "PlayCircle";
export default PlayCircle;
