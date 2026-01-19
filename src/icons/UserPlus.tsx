import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const UserPlus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Pulse
        const pulse = useCallback(() => {
            animate(
                ".user-avatar",
                { opacity: [1, 0.7, 1] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".plus-sign",
                { scale: [1, 1.1, 1] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Invite (Beckon)
        const hoverInvite = useCallback(() => {
            animate(
                ".user-avatar",
                { x: [0, -1, 0], scale: [1, 1.02, 1] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".plus-sign",
                { scale: [1, 1.2, 1], rotate: [0, 10, 0] },
                { duration: 1, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Add Friend
        const playAdd = useCallback(async () => {
            // User moves aside
            animate(".user-avatar", { x: -2 }, { duration: 0.2 });

            // Plus spins and pops
            await animate(
                ".plus-sign",
                { rotate: 90, scale: [1, 1.4, 1] },
                { duration: 0.4, type: "spring", bounce: 0.6 }
            );

            // Reset
            animate(".user-avatar", { x: 0 }, { duration: 0.2 });
            animate(".plus-sign", { rotate: 0 }, { duration: 0.2 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".user-avatar", { x: 0, scale: 1, opacity: 1 }, { duration: 0.2 });
            animate(".plus-sign", { scale: 1, rotate: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playAdd,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) pulse();
            else stop();
        }, [loading, pulse, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverInvite()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playAdd()}
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

                <motion.g className="user-avatar" style={{ transformOrigin: "center" }}>
                    <path d="M8 7a4 4 0 1 0 8 0a4 4 0 0 0 -8 0" />
                    <path d="M6 21v-2a4 4 0 0 1 4 -4h4" />
                </motion.g>

                <motion.g className="plus-sign" style={{ transformOrigin: "19px 19px" }}>
                    <path d="M16 19h6" />
                    <path d="M19 16v6" />
                </motion.g>
            </motion.svg>
        );
    }
);

UserPlus.displayName = "UserPlus";
export default UserPlus;
