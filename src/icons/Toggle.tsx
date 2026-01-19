import { forwardRef, useImperativeHandle, useCallback, useState, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Toggle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();
        const [isOn, setIsOn] = useState(false);

        // Loading: Searching / Indecisive
        const pulse = useCallback(() => {
            animate(
                ".toggle-knob",
                { x: [0, 8, 2, 8, 0] },
                { duration: 2, repeat: Infinity, ease: "easeInOut" }
            );
            animate(
                ".toggle-track",
                { opacity: [1, 0.7, 1] },
                { duration: 2, repeat: Infinity }
            );
        }, [animate]);

        // Hover: Nudge (Tease interaction)
        const hoverNudge = useCallback(() => {
            animate(
                ".toggle-knob",
                { x: isOn ? 10 : 2 },
                { duration: 0.2, ease: "easeOut" }
            );
        }, [animate, isOn]);

        const hoverEnd = useCallback(() => {
            animate(".toggle-knob", { x: isOn ? 12 : 0 }, { duration: 0.2 });
        }, [animate, isOn]);


        // Action: Switch!
        const playSwitch = useCallback(async () => {
            const targetX = isOn ? 0 : 12;

            await animate(
                ".toggle-knob",
                { x: targetX },
                { duration: 0.3, type: "spring", stiffness: 300, damping: 20 }
            );

            setIsOn(!isOn);
        }, [animate, isOn]);

        const stop = useCallback(() => {
            animate(".toggle-track", { opacity: 1 }, { duration: 0.2 });
        }, [animate]);

        useImperativeHandle(ref, () => ({
            play: playSwitch,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) pulse();
            else stop();
        }, [loading, pulse, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverNudge()}
                onMouseLeave={() => !loading && hoverEnd()}
                onClick={() => !loading && playSwitch()}
                xmlns="http://www.w3.org/2000/svg"
                width={size}
                height={size}
                viewBox="0 0 32 32"
                fill="none"
                stroke={color}
                strokeWidth={strokeWidth}
                strokeLinecap="square"
                strokeMiterlimit="10"
                className={`${className} cursor-pointer`}
            >
                <motion.path
                    className="toggle-track"
                    d="m10,7h12c4.971,0,9,4.029,9,9h0c0,4.971-4.029,9-9,9h-12c-4.971,0-9-4.029-9-9h0c0-4.971,4.029-9,9-9Z"
                />

                <motion.circle
                    className="toggle-knob"
                    cx="10"
                    cy="16"
                    r="5"
                    style={{ transformOrigin: "center" }}
                />
            </motion.svg>
        );
    }
);

Toggle.displayName = "Toggle";
export default Toggle;
