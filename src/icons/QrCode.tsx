import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Qrcode = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
    (
        { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
        ref
    ) => {
        const [scope, animate] = useAnimate();

        // Loading: Scan Line
        const scan = useCallback(() => {
            animate(
                ".scan-line",
                { y: [0, 24, 0], opacity: [0, 1, 0] },
                { duration: 2, repeat: Infinity, ease: "linear" }
            );
        }, [animate]);

        // Hover: Focus Corners
        const hoverFocus = useCallback(() => {
            animate(
                ".qr-outer",
                { scale: [1, 1.1, 1] },
                { duration: 0.6, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.2 }
            );
        }, [animate]);

        // Action: Capture (Flash)
        const playCapture = useCallback(async () => {
            // 1. Flash
            await animate(scope.current, { scale: 1.1, filter: "brightness(1.5)" }, { duration: 0.1 });

            // 2. Settle
            animate(scope.current, { scale: 1, filter: "brightness(1)" }, { duration: 0.4, type: "spring", bounce: 0.5 });

            // 3. Bits draw
            animate(".qr-inner", { opacity: [0, 1], scale: [0.8, 1] }, { duration: 0.3 });

        }, [animate, scope]);

        const stop = useCallback(() => {
            animate(".scan-line", { opacity: 0, y: 0 }, { duration: 0.2 });
            animate(".qr-outer", { scale: 1 }, { duration: 0.2 });
            animate(scope.current, { scale: 1, filter: "brightness(1)" }, { duration: 0.2 });
            animate(".qr-inner", { opacity: 1, scale: 1 }, { duration: 0.2 });
        }, [animate, scope]);

        useImperativeHandle(ref, () => ({
            play: playCapture,
            stop: stop,
        }));

        useEffect(() => {
            if (loading) scan();
            else stop();
        }, [loading, scan, stop]);

        return (
            <motion.svg
                ref={scope}
                onMouseEnter={() => !loading && hoverFocus()}
                onMouseLeave={() => !loading && stop()}
                onClick={() => !loading && playCapture()}
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

                {/* Outer Square Markers associated with reference style */}
                <motion.rect className="qr-outer" x="4" y="4" width="6" height="6" rx="1" style={{ transformOrigin: "7px 7px" }} />
                <motion.rect className="qr-outer" x="4" y="14" width="6" height="6" rx="1" style={{ transformOrigin: "7px 17px" }} />
                <motion.rect className="qr-outer" x="14" y="4" width="6" height="6" rx="1" style={{ transformOrigin: "17px 7px" }} />

                {/* Inner Bits - More substantial to match reference */}
                <motion.g className="qr-inner">
                    <path d="M14 17h3v3h-3z" />
                    <path d="M14 14h3v3h-3z" />
                    <path d="M17 14h3v3h-3z" />
                    <path d="M10 10h4v4h-4z" />
                </motion.g>

                {/* Inner tiny dots for corners (often in these styles) */}
                <motion.path className="qr-outer" d="M7 7h.01" strokeWidth="3" strokeLinecap="round" />
                <motion.path className="qr-outer" d="M7 17h.01" strokeWidth="3" strokeLinecap="round" />
                <motion.path className="qr-outer" d="M17 7h.01" strokeWidth="3" strokeLinecap="round" />

                {/* Scan line overlay */}
                <motion.line className="scan-line" x1="2" y1="-2" x2="22" y2="-2" stroke="currentColor" strokeWidth="2" opacity="0" />

            </motion.svg>
        );
    }
);

Qrcode.displayName = "QrCode";
export default Qrcode;
