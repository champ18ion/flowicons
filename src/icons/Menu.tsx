import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Menu = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Alternating Opacity Fade (User liked this)
        const pulse = useCallback(() => {
            animate(
                ".menu-line",
                { opacity: [0.4, 1, 0.4] },
                { duration: 1.5, repeat: Infinity, delay: (i) => i * 0.2, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Strong Spread + Scale
        const hoverStrong = useCallback(() => {
            animate(".menu-top", { y: -4 }, { duration: 0.3, ease: "easeOut" });
            animate(".menu-bottom", { y: 4 }, { duration: 0.3, ease: "easeOut" });
            animate(".menu-middle", { scaleX: 1.1 }, { duration: 0.3, ease: "easeOut" });
        }, [animate]);

        // Action: Squish / Click Interaction
        const squish = useCallback(async () => {
            // Squish in
            await animate(
                ".menu-line",
                { scaleX: 0.6 },
                { duration: 0.1, ease: "easeIn" }
            );
            // Spring out
            animate(
                ".menu-line",
                { scaleX: 1 },
                { duration: 0.4, type: "spring", bounce: 0.5 }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".menu-line", { opacity: 1, scaleX: 1, y: 0 }, { duration: 0.2 });
            animate(".menu-top", { y: 0 }, { duration: 0.2 });
            animate(".menu-bottom", { y: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: squish,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) pulse();
            else stop();
        }, [loading, pulse, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverStrong()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && squish()}
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
                <motion.path d="M4 6h16" className="menu-line menu-top" style={{ transformOrigin: "center" }} />
                <motion.path d="M4 12h16" className="menu-line menu-middle" style={{ transformOrigin: "center" }} />
                <motion.path d="M4 18h16" className="menu-line menu-bottom" style={{ transformOrigin: "center" }} />
            </motion.svg>
        );
    }
);

Menu.displayName = "Menu";
export default Menu;
