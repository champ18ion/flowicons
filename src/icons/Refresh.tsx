import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Refresh = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
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
                { duration: 1, repeat: Infinity, ease: "linear" }
            );
        }, [animate]);

        // Hover: Ready (Anticipation back-wind)
        const hoverReady = useCallback(() => {
            animate(
                scope.current,
                { rotate: -45 },
                { duration: 0.4, ease: "backOut" }
            );
        }, [animate]);

        // Action: Reload (Lively Spin)
        const playReload = useCallback(async () => {
            // 1. Release from backwind (-45) -> Spin fast
            await animate(scope.current, { rotate: 360 + 360 }, { duration: 0.8, ease: "circInOut" });

            // 2. Settle
            animate(scope.current, { rotate: 720 }, { duration: 0, }); // Reset frame
            animate(scope.current, { rotate: 0 }, { duration: 0 }); // Hard reset to 0
        }, [animate]);

        const stop = useCallback(() => {
            animate(scope.current, { rotate: 0 }, { duration: 0.3, ease: "backOut" });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playReload,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) spin();
            else stop();
        }, [loading, spin, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverReady()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playReload()}
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
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M20 11a8.1 8.1 0 0 0 -15.5 -2m-.5 -4v4h4" />
                <path d="M4 13a8.1 8.1 0 0 0 15.5 2m.5 4v-4h-4" />
            </motion.svg>
        );
    }
);

Refresh.displayName = "Refresh";
export default Refresh;
