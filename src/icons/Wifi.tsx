import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Wifi = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Searching (Sequential 1-2-3)
        const search = useCallback(async () => {
            // We use a manual loop here to orchestrate the stagger simply
            await animate([
                [".wave-1", { opacity: 0.3 }, { duration: 0.3 }],
                [".wave-2", { opacity: 0.3 }, { duration: 0.3, at: "-0.2" }],
                [".wave-3", { opacity: 0.3 }, { duration: 0.3, at: "-0.2" }],
                [".wave-1", { opacity: 1 }, { duration: 0.3 }],
                [".wave-2", { opacity: 1 }, { duration: 0.3, at: "-0.2" }],
                [".wave-3", { opacity: 1 }, { duration: 0.3, at: "-0.2" }],
            ], { repeat: Infinity, repeatDelay: 0.5 });
        }, [animate]);

        // Hover: Broadcast (Ripple Out)
        const hoverBroadcast = useCallback(() => {
            animate(
                ".wave-1",
                { opacity: [1, 0.4, 1], scale: [1, 1.1, 1] },
                { duration: 1.2, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".wave-2",
                { opacity: [1, 0.4, 1], scale: [1, 1.1, 1] },
                { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.2 }
            );
            animate(
                ".wave-3",
                { opacity: [1, 0.4, 1], scale: [1, 1.1, 1] },
                { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
            );
        }, [animate]);

        // Action: Connected (Flash)
        const playConnect = useCallback(async () => {
            // 1. All dim
            await animate("path", { opacity: 0.3 }, { duration: 0.1 });

            // 2. All bright + Scale
            await animate(
                "path",
                { opacity: 1, scale: [1, 1.1, 1] },
                { duration: 0.4, ease: "backOut" }
            );

        }, [animate]);

        const stop = useCallback(() => {
            animate("path", { opacity: 1, scale: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playConnect,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) search();
            else stop();
        }, [loading, search, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverBroadcast()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playConnect()}
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
                <motion.path d="M12 18l.01 0" style={{ transformOrigin: "12px 18px" }} />
                <motion.path className="wave-1" d="M9.172 15.172a4 4 0 0 1 5.656 0" style={{ transformOrigin: "12px 15px" }} />
                <motion.path className="wave-2" d="M6.343 12.343a8 8 0 0 1 11.314 0" style={{ transformOrigin: "12px 12px" }} />
                <motion.path
                    className="wave-3"
                    d="M3.515 9.515c4.686 -4.687 12.284 -4.687 17 0"
                    style={{ transformOrigin: "12px 9.5px" }}
                />
            </motion.svg>
        );
    }
);

Wifi.displayName = "Wifi";
export default Wifi;
