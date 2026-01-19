import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const LayoutSidebarRight = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Sidebar Shimmer
        const shimmer = useCallback(() => {
            animate(".sidebar", { opacity: [1, 0.5, 1] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
        }, [animate]);

        // Hover: Slide & Scale (User Provided)
        const start = useCallback(async () => {
            // Animate the sidebar divider
            animate(
                ".sidebar",
                {
                    x: 2,
                    scaleX: 1.1,
                },
                {
                    duration: 0.3,
                    ease: "easeInOut",
                },
            );

            // Pulse the container
            animate(
                ".container",
                {
                    scale: 1.02,
                },
                {
                    duration: 0.3,
                    ease: "easeOut",
                },
            );
        }, [animate]);

        // Click: Toggle Snap
        const playToggle = useCallback(async () => {
            await animate(".sidebar", { x: 10, opacity: 0 }, { duration: 0.2 });
            animate(".sidebar", { x: 0, opacity: 1 }, { type: "spring", bounce: 0.5 });
        }, [animate]);

        const stop = useCallback(async () => {
            animate(
                ".sidebar, .container",
                {
                    x: 0,
                    scaleX: 1,
                    scale: 1,
                    opacity: 1
                },
                {
                    duration: 0.25,
                    ease: "easeInOut",
                },
            );
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playToggle,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) shimmer();
            else stop();
        }, [loading, shimmer, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && start()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playToggle()}
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

                {/* Container */}
                <motion.path
                    className="container"
                    d="M4 4m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z"
                />

                {/* Sidebar divider */}
                <motion.path className="sidebar" d="M15 4l0 16" />
            </motion.svg>
        );
    }
);

LayoutSidebarRight.displayName = "LayoutSidebarRight";
export default LayoutSidebarRight;
