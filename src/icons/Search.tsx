import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Search = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Scan Motion (Like looking for something)
        const scan = useCallback(() => {
            animate(
                ".magnifier",
                {
                    x: [0, 2, -2, 0],
                    y: [0, -2, 2, 0],
                    rotate: [0, -5, 5, 0]
                },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Scale Up (Pop)
        const hoverPop = useCallback(() => {
            animate(
                ".magnifier",
                { scale: 1.1, x: 2, y: -2 },
                { duration: 0.3, ease: "backOut" }
            );
        }, [animate]);

        // Action: Search Loop
        const playSearch = useCallback(async () => {
            await animate(
                ".magnifier",
                {
                    x: [0, 4, -4, 0],
                    y: [0, -2, 2, 0],
                    scale: [1, 1.1, 1]
                },
                { duration: 0.8, ease: "easeInOut" }
            );
        }, [animate]);

        const stop = useCallback(() => {
            animate(".magnifier", { x: 0, y: 0, scale: 1, rotate: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSearch,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) scan();
            else stop();
        }, [loading, scan, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverPop()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playSearch()}
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
                <motion.g className="magnifier" style={{ transformOrigin: "center" }}>
                    <circle cx="11" cy="11" r="8" />
                    <path d="m21 21-4.3-4.3" />
                </motion.g>
            </motion.svg>
        );
    }
);

Search.displayName = "Search";
export default Search;
