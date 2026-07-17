import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Smile = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".eye-left, .eye-right", { scaleY: [1, 0.1, 1] }, { duration: 1.4, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".eye-left, .eye-right", { scaleY: [1, 0.1, 1] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
      animate(".mouth", { y: [0, 0.5, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".mouth", { scale: [1, 1.3, 1] }, { duration: 0.4, ease: "easeOut" });
      await animate(".face", { y: [0, -3, 0], rotate: [0, -5, 5, 0] }, { duration: 0.5, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".eye-left, .eye-right", { scaleY: 1 }, { duration: 0.2 });
      animate(".mouth", { scale: 1, y: 0 }, { duration: 0.2 });
      animate(".face", { y: 0, rotate: 0 }, { duration: 0.2 });
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
        <motion.circle cx="12" cy="12" r="10" className="face" />
        <motion.path d="M8 14s1.5 2 4 2 4-2 4-2" className="mouth" />
        <motion.line x1="9" x2="9.01" y1="9" y2="9" className="eye eye-left" />
        <motion.line x1="15" x2="15.01" y1="9" y2="9" className="eye eye-right" />
      </motion.svg>
    );
  }
);

Smile.displayName = "Smile";
export default Smile;
