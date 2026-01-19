import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Users = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Shuffle (Drift)
        const shuffle = useCallback(() => {
            animate(
                ".user-primary",
                { x: [0, 1, 0] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".user-secondary",
                { x: [0, -1, 0] },
                { duration: 2, repeat: Infinity, ease: "easeInOut", delay: 1 }
            );
        }, [animate]);

        // Hover: Conversation (Bobble)
        const hoverChat = useCallback(() => {
            animate(
                ".user-primary",
                { y: [0, -1, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".user-secondary",
                { y: [0, -1, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
            );
        }, [animate]);

        // Action: Gather (Group Jump)
        const playGather = useCallback(async () => {
            // 1. Squash down
            await Promise.all([
                animate(".user-primary", { scaleY: 0.9, y: 1 }, { duration: 0.1 }),
                animate(".user-secondary", { scaleY: 0.9, y: 1 }, { duration: 0.1 })
            ]);

            // 2. Jump Up
            await Promise.all([
                animate(".user-primary", { scaleY: 1, y: -3 }, { duration: 0.2, ease: "easeOut" }),
                animate(".user-secondary", { scaleY: 1, y: -3 }, { duration: 0.2, ease: "easeOut" })
            ]);

            // 3. Land
            animate(".user-primary", { y: 0 }, { duration: 0.2, ease: "backOut" });
            animate(".user-secondary", { y: 0 }, { duration: 0.2, ease: "backOut" });

        }, [animate]);

        const stop = useCallback(() => {
            animate(".user-primary", { x: 0, y: 0, scaleY: 1 }, { duration: 0.2 });
            animate(".user-secondary", { x: 0, y: 0, scaleY: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playGather,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) shuffle();
            else stop();
        }, [loading, shuffle, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverChat()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playGather()}
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

                <motion.g className="user-primary" style={{ transformOrigin: "bottom" }}>
                    <path d="M9 7m-4 0a4 4 0 1 0 8 0a4 4 0 1 0 -8 0" />
                    <path d="M3 21v-2a4 4 0 0 1 4 -4h4a4 4 0 0 1 4 4v2" />
                </motion.g>

                <motion.g className="user-secondary" style={{ transformOrigin: "bottom" }}>
                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                    <path d="M21 21v-2a4 4 0 0 0 -3 -3.85" />
                </motion.g>
            </motion.svg>
        );
    }
);

Users.displayName = "Users";
export default Users;
