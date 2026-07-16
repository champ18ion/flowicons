import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Snowflake = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".flake-part", { rotate: [0, 360] }, { duration: 2.5, repeat: Infinity, ease: "linear" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".flake-part", { rotate: [0, 12, -12, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".arm-1", { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }, { duration: 0.3, ease: "easeOut", delay: 0 });
      animate(".arm-2", { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.05 });
      animate(".arm-3", { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.1 });
      animate(".arm-4", { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.15 });
      animate(".arm-5", { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.2 });
      await animate(".arm-6", { scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.25 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".flake-part", { rotate: 0, scale: 1, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="m10 20-1.25-2.5L6 18" className="flake-part arm-1" />
        <motion.path d="M10 4 8.75 6.5 6 6" className="flake-part arm-1" />
        <motion.path d="m14 20 1.25-2.5L18 18" className="flake-part arm-2" />
        <motion.path d="m14 4 1.25 2.5L18 6" className="flake-part arm-2" />
        <motion.path d="m17 21-3-6h-4" className="flake-part arm-3" />
        <motion.path d="m17 3-3 6 1.5 3" className="flake-part arm-3" />
        <motion.path d="M2 12h6.5L10 9" className="flake-part arm-4" />
        <motion.path d="m20 10-1.5 2 1.5 2" className="flake-part arm-4" />
        <motion.path d="M22 12h-6.5L14 15" className="flake-part arm-5" />
        <motion.path d="m4 10 1.5 2L4 14" className="flake-part arm-5" />
        <motion.path d="m7 21 3-6-1.5-3" className="flake-part arm-6" />
        <motion.path d="m7 3 3 6h4" className="flake-part arm-6" />
      </motion.svg>
    );
  }
);

Snowflake.displayName = "Snowflake";
export default Snowflake;
