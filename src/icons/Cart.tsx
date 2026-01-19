import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Cart = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Rumble
        const rumble = useCallback(() => {
            animate(
                ".cart-icon",
                { y: [0, -1, 0, 1, 0] },
                { duration: 0.2, repeat: Infinity, ease: "linear" }
            );
        }, [animate]);

        // Hover: Roll
        const hoverRoll = useCallback(() => {
            animate(".cart-icon", { x: [0, 3, 0] }, { duration: 0.6, ease: "easeInOut" });
            animate(".cart-wheel", { rotate: [0, 360, 0] }, { duration: 1, ease: "easeOut" });
        }, [animate]);

        // Click: Roll Away
        const playRollAway = useCallback(async () => {
            await animate(".cart-icon", { x: 20, opacity: 0 }, { duration: 0.4, ease: "easeIn" });
            animate(".cart-icon", { x: 0, opacity: 1 }, { duration: 0.1 }); // Instant reset hidden
        }, [animate]);

        const stop = useCallback(() => {
            animate(".cart-icon", { x: 0, y: 0, scale: 1, opacity: 1 }, { duration: 0.2 });
            animate(".cart-wheel", { rotate: 0 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playRollAway,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) rumble();
            else stop();
        }, [loading, rumble, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverRoll()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playRollAway()}
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

                <motion.g className="cart-icon">
                    <motion.circle cx="6" cy="19" r="2" className="cart-wheel" />
                    <motion.circle cx="17" cy="19" r="2" className="cart-wheel" />
                    <path d="M17 17h-11v-14h-2" />
                    <path d="M6 5l14 1l-1 7h-13" />
                </motion.g>
            </motion.svg>
        );
    }
);

Cart.displayName = "Cart";
export default Cart;
