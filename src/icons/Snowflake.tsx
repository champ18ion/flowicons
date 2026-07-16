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
      animate(".icon-element", { rotate: [0, 360] }, { duration: 1.5, repeat: Infinity, ease: "linear" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".icon-element", { rotate: [0, 15, -15, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".icon-element", { scale: [1, 0.9, 1] }, { duration: 0.5, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".icon-element", { scale: 1, rotate: 0, pathLength: 1, pathOffset: 0, y: 0, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="m10 20-1.25-2.5L6 18" className="icon-element" /><motion.path d="M10 4 8.75 6.5 6 6" className="icon-element" /><motion.path d="m14 20 1.25-2.5L18 18" className="icon-element" /><motion.path d="m14 4 1.25 2.5L18 6" className="icon-element" /><motion.path d="m17 21-3-6h-4" className="icon-element" /><motion.path d="m17 3-3 6 1.5 3" className="icon-element" /><motion.path d="M2 12h6.5L10 9" className="icon-element" /><motion.path d="m20 10-1.5 2 1.5 2" className="icon-element" /><motion.path d="M22 12h-6.5L14 15" className="icon-element" /><motion.path d="m4 10 1.5 2L4 14" className="icon-element" /><motion.path d="m7 21 3-6-1.5-3" className="icon-element" /><motion.path d="m7 3 3 6h4" className="icon-element" />
      </motion.svg>
    );
  }
);

Snowflake.displayName = "Snowflake";
export default Snowflake;
