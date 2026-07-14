import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const MapPin = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".pin", { y: [0, -4, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".pin", { y: [0, -2, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      await animate(".pin", { y: -8 }, { duration: 0.15, ease: "easeOut" });
      await animate(".pin", { y: 2, scaleY: 0.8 }, { duration: 0.15, ease: "easeIn" });
      await animate(".pin", { y: 0, scaleY: 1 }, { duration: 0.3, type: "spring", bounce: 0.7 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".pin", { y: 0, scaleY: 1 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      play: clickAnim,
      stop: stop,
    }));

    useEffect(() => {
      if (loading) loadingAnim();
      else stop();
    }, [loading, loadingAnim, stop]);

    return (
      <motion.svg
        ref={scope}
        onMouseEnter={() => !loading && hoverAnim()}
        onMouseLeave={() => !loading && stop()}
        onClick={() => !loading && clickAnim()}
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
        <motion.g className="pin" style={{ transformOrigin: "12px 22px" }}>
          <path d="M20 10c0 4.993-5.539 10.193-7.399 11.799a1 1 0 0 1-1.202 0C9.539 20.193 4 14.993 4 10a8 8 0 0 1 16 0"></path>
          <circle cx="12" cy="10" r="3"></circle>
        </motion.g>
      </motion.svg>
    );
  }
);

MapPin.displayName = "MapPin";
export default MapPin;
