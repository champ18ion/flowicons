import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Checked = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Deep Breathing
        const breathe = useCallback(() => {
            animate(
                scope.current,
                { scale: [1, 1.2, 1] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate, scope]);

        // Hover: Energetic Wobble
        const wobble = useCallback(() => {
            animate(
                scope.current,
                { rotate: [0, -15, 15, -10, 10, 0] },
                { duration: 0.6, ease: "easeInOut" }
            );
        }, [animate, scope]);

        // Click: Big Pop & Draw
        const playCheck = useCallback(async () => {
            // Big Pop
            await animate(scope.current, { scale: 1.4 }, { duration: 0.1 });
            animate(scope.current, { scale: 1 }, { type: "spring", bounce: 0.7 });

            // Redraw check
            await animate(".check-mark", { pathLength: 0, opacity: 0 }, { duration: 0 });
            animate(".check-mark", { pathLength: 1, opacity: 1 }, { duration: 0.4, ease: "easeOut" });
        }, [animate, scope]);

        const stop = useCallback(() => {
            animate(scope.current, { scale: 1, rotate: 0 }, { duration: 0.2 });
            animate(".check-mark", { pathLength: 1, opacity: 1 }, { duration: 0.2 });
        }, [animate, scope]);

        useImperativeHandle(ref, () => ({
            play: playCheck,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) breathe();
            else stop();
        }, [loading, breathe, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && wobble()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playCheck()}
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
                <path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" />
                <motion.path
                    className="check-mark"
                    d="M9 12l2 2l4 -4"
                />
            </motion.svg>
        );
    }
);

Checked.displayName = "Checked";
export default Checked;
