import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Link = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Tension (Pulling apart)
        const tension = useCallback(() => {
            animate(
                ".link-top",
                { x: [0, 1, 0], y: [0, -1, 0] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".link-bottom",
                { x: [0, -1, 0], y: [0, 1, 0] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Chain Slide (Friction/Interaction)
        const hoverSlide = useCallback(() => {
            animate(
                ".link-top",
                { x: [0, 2, 0], y: [0, -2, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".link-bottom",
                { x: [0, -2, 0], y: [0, 2, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Snap!
        const playSnap = useCallback(async () => {
            // 1. Pull far apart
            await Promise.all([
                animate(".link-top", { x: 3, y: -3 }, { duration: 0.2 }),
                animate(".link-bottom", { x: -3, y: 3 }, { duration: 0.2 })
            ]);

            // 2. Snap together
            await Promise.all([
                animate(".link-top", { x: 0, y: 0 }, { duration: 0.15, type: "spring", damping: 12 }),
                animate(".link-bottom", { x: 0, y: 0 }, { duration: 0.15, type: "spring", damping: 12 }),
                animate("svg", { scale: [1, 1.1, 1] }, { duration: 0.2 })
            ]);

        }, [animate]);

        const stop = useCallback(() => {
            animate(".link-top", { x: 0, y: 0 }, { duration: 0.2 });
            animate(".link-bottom", { x: 0, y: 0 }, { duration: 0.2 });
            animate("svg", { scale: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSnap,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) tension();
            else stop();
        }, [loading, tension, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverSlide()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playSnap()}
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

                <motion.path
                    d="M9 15l6 -6"
                    className="link-middle"
                    style={{ transformOrigin: "center" }}
                />

                <motion.path
                    d="M11 6l.463 -.536a5 5 0 0 1 7.071 7.072l-.534 .464"
                    className="link-top"
                    style={{ transformOrigin: "center" }}
                />

                <motion.path
                    d="M13 18l-.397 .534a5.068 5.068 0 0 1 -7.127 0a4.972 4.972 0 0 1 0 -7.071l.524 -.463"
                    className="link-bottom"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

Link.displayName = "Link";
export default Link;
