import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Mail = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Float (Gentle Delivery)
        const float = useCallback(() => {
            animate(
                scope.current,
                { y: [-2, 2, -2] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
        }, [animate]);

        // Hover: Peek (Flap opens energetically)
        const hoverPeek = useCallback(() => {
            animate(
                ".mail-flap",
                { rotateX: [0, -180, 0] },
                { duration: 0.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }
            );
            animate(
                ".mail-body",
                { rotate: [0, -5, 5, 0] },
                { duration: 0.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }
            );
        }, [animate]);

        // Action: Send (Fly Away + Pop Back)
        const playSend = useCallback(async () => {
            // 1. Seal
            await animate(".mail-flap", { rotateX: 0 }, { duration: 0.1 });

            // 2. Wind up
            await animate(scope.current, { scale: 0.8, rotate: -10 }, { duration: 0.2 });

            // 3. Fly / Pop
            animate(scope.current, { scale: [0.8, 1.2, 1], rotate: 0 }, { duration: 0.4, type: "spring", bounce: 0.6 });
            await animate(".mail-body", { y: [0, -5, 0] }, { duration: 0.4, type: "spring", bounce: 0.6 });

        }, [animate]);

        const stop = useCallback(() => {
            animate(scope.current, { y: 0, scale: 1, rotate: 0 }, { duration: 0.2 });
            animate(".mail-flap", { rotateX: 0 }, { duration: 0.2 });
            animate(".mail-body", { rotate: 0, y: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSend,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) float();
            else stop();
        }, [loading, float, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverPeek()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playSend()}
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
                <motion.g className="mail-body" style={{ transformOrigin: "center" }}>
                    <path d="M3 7a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-10z" />
                    <motion.path
                        className="mail-flap"
                        d="M3 7l9 6l9 -6"
                        style={{ transformOrigin: "top" }}
                    />
                </motion.g>
            </motion.svg>
        );
    }
);

Mail.displayName = "Mail";
export default Mail;
