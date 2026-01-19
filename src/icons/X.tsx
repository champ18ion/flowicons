import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const X = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Reject Shake
        const shake = useCallback(() => {
            animate(
                scope.current,
                { x: [-2, 2, -2] },
                { duration: 0.4, repeat: Infinity, ease: "linear" }
            );
        }, [animate, scope]);

        // Hover: Tension (Scale up)
        const hoverTension = useCallback(() => {
            animate(
                scope.current,
                { scale: 1.1, rotate: [0, 5, -5, 0] },
                { duration: 0.4, ease: "easeInOut" }
            );
        }, [animate, scope]);

        // Action: Cross Impact (Bounce + Draw)
        const playCross = useCallback(async () => {
            // 1. Scale down (impact)
            await animate(scope.current, { scale: 0.8 }, { duration: 0.1 });

            // 2. Draw lines fresh
            animate(".x-line", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.3, ease: "easeOut" });

            // 3. Bounce up
            animate(scope.current, { scale: 1 }, { duration: 0.4, type: "spring", bounce: 0.6 });

        }, [animate, scope]);

        const stop = useCallback(() => {
            animate(scope.current, { x: 0, scale: 1, rotate: 0 }, { duration: 0.2 });
            animate(".x-line", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
        }, [animate, scope]);

        useImperativeHandle(ref, () => ({
            play: playCross,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) shake();
            else stop();
        }, [loading, shake, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverTension()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playCross()}
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
                <motion.path className="x-line" d="M18 6l-12 12" />
                <motion.path className="x-line" d="M6 6l12 12" />
            </motion.svg>
        );
    }
);

X.displayName = "X";
export default X;
