import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const UserCheck = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Breathe
        const breathe = useCallback(() => {
            animate(
                ".user-avatar",
                { scale: [1, 1.05, 1], opacity: [1, 0.8, 1] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Nod (Yes!)
        const hoverNod = useCallback(() => {
            animate(
                ".user-avatar",
                { y: [0, 1, 0, 1, 0] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".check-mark",
                { scale: [1, 1.1, 1] },
                { duration: 1.5, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Action: Verify
        const playVerify = useCallback(async () => {
            // 1. Reset
            animate(".check-mark", { pathLength: 0, opacity: 0 }, { duration: 0 });

            // 2. User Bounce
            animate(".user-avatar", { y: -2, scale: 1.1 }, { duration: 0.2, ease: "easeOut" });

            // 3. Check Draw
            await animate(
                ".check-mark",
                { pathLength: 1, opacity: 1 },
                { duration: 0.3, ease: "easeOut", delay: 0.1 }
            );

            // 4. Settle
            animate(".user-avatar", { y: 0, scale: 1 }, { duration: 0.2, ease: "backOut" });

        }, [animate]);

        const stop = useCallback(() => {
            animate(".user-avatar", { y: 0, scale: 1, opacity: 1 }, { duration: 0.2 });
            animate(".check-mark", { scale: 1, opacity: 1, pathLength: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playVerify,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) breathe();
            else stop();
        }, [loading, breathe, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverNod()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playVerify()}
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

                <motion.path
                    d="M15 19l2 2l4 -4"
                    className="check-mark"
                    style={{ transformOrigin: "18px 19px" }}
                    initial={{ pathLength: 1 }}
                />
            </motion.svg>
        );
    }
);

UserCheck.displayName = "UserCheck";
export default UserCheck;
