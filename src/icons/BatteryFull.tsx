import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const BatteryFull = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".bar-1", { opacity: [0.3, 1, 0.3] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".bar-2", { opacity: [0.3, 1, 0.3] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.15 });
      animate(".bar-3", { opacity: [0.3, 1, 0.3] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.3 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".bar-1", { scaleY: [1, 0.6, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".bar-2", { scaleY: [1, 0.6, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.1 });
      animate(".bar-3", { scaleY: [1, 0.6, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".bar-1", { scaleY: [0.2, 1] }, { duration: 0.2, ease: "easeOut" });
      animate(".bar-2", { scaleY: [0.2, 1] }, { duration: 0.2, ease: "easeOut", delay: 0.1 });
      await animate(".bar-3", { scaleY: [0.2, 1] }, { duration: 0.2, ease: "easeOut", delay: 0.2 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".bar-1, .bar-2, .bar-3", { scaleY: 1, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="M6 10v4" className="bar bar-1" />
        <motion.path d="M10 10v4" className="bar bar-2" />
        <motion.path d="M14 10v4" className="bar bar-3" />
        <motion.path d="M22 14v-4" className="tip" />
        <motion.rect x="2" y="6" width="16" height="12" rx="2" className="cell" />
      </motion.svg>
    );
  }
);

BatteryFull.displayName = "BatteryFull";
export default BatteryFull;
