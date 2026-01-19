import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const PhoneVolume = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Ringing (Shake)
        const ring = useCallback(() => {
            animate(
                ".phone-body",
                { rotate: [-3, 3, -3], x: [0, 0, 0] },
                { duration: 0.3, repeat: Infinity, ease: "linear", repeatDelay: 0.1 }
            );
        }, [animate]);

        // Hover: Ripple based on reference
        const hoverListen = useCallback(() => {
            animate(
                ".phone-wave-inner",
                { scale: [1, 1.15, 1], opacity: [0.4, 1, 0.4] },
                { duration: 0.4, ease: "easeInOut" }
            );
            animate(
                ".phone-wave-outer",
                { scale: [1, 1.25, 1], opacity: [0.2, 0.8, 0.2] },
                { duration: 0.45, ease: "easeInOut", delay: 0.1 }
            );
        }, [animate]);

        // Stop Hover
        const stopHover = useCallback(() => {
            animate(".phone-wave-inner, .phone-wave-outer", { opacity: 1, scale: 1 }, { duration: 0.2 });
        }, [animate]);


        // Action: Blast (Loud Volume)
        const playBlast = useCallback(async () => {
            // 1. Phone recoil
            animate(".phone-body", { x: -2, y: 2, rotate: -5 }, { duration: 0.1 });

            // 2. Blast waves
            animate(".phone-wave-inner", { scale: 1.4, opacity: 1 }, { duration: 0.2, ease: "easeOut" });
            await animate(".phone-wave-outer", { scale: 1.5, opacity: 1 }, { duration: 0.2, ease: "easeOut" });

            // 3. Reset
            animate(".phone-body", { x: 0, y: 0, rotate: 0 }, { duration: 0.4, type: "spring", bounce: 0.5 });
            animate(".phone-wave-inner, .phone-wave-outer", { scale: 1, opacity: 1 }, { duration: 0.4, type: "spring", bounce: 0.5 });
        }, [animate]);

        const stop = useCallback(() => {
            animate(".phone-body", { rotate: 0, x: 0, y: 0 }, { duration: 0.2 });
            animate(".phone-wave-inner, .phone-wave-outer", { opacity: 1, scale: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playBlast,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) ring();
            else stop();
        }, [loading, ring, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverListen()}
                onMouseLeave={() => !loading && stopHover()}
                onClick={() => !loading && playBlast()}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 32 32"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="round" // Maintaining rounded style of library
                strokeLinejoin="round"
                className={`${className} cursor-pointer`}
                style={{ overflow: "visible" }}
                whileTap={{ scale: 0.95 }}
            >
                <motion.path
                    className="phone-body"
                    d="m21.3832,18.2745l-3.1744,3.9688c-3.4906-2.0516-6.3996-4.9606-8.4513-8.4513l3.9702-3.1756L9.9013,1.9994l-6.4617,1.6761c-.9444.2466-1.555,1.1606-1.4212,2.1274,1.7626,12.5517,11.6278,22.4169,24.1795,24.1795.9665.1332,1.8799-.4773,2.1264-1.4212l1.6758-6.4603-8.6168-3.8264Z"
                    style={{ transformOrigin: "center" }}
                />

                <motion.path
                    className="phone-wave-inner phone-wave"
                    style={{ transformOrigin: "21.5px 10.5px" }}
                    d="m19,8c2.7614,0,5,2.2386,5,5"
                />

                <motion.path
                    className="phone-wave-outer phone-wave"
                    style={{ transformOrigin: "24px 8px" }}
                    d="m19,3c5.5228,0,10,4.4772,10,10"
                />
            </motion.svg>
        );
    }
);

PhoneVolume.displayName = "PhoneVolume";
export default PhoneVolume;
