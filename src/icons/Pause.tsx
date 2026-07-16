import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Pause = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".bar-left", { scaleY: [1, 0.7, 1] }, { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".bar-right", { scaleY: [1, 0.7, 1] }, { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".bar-left", { scaleY: [1, 0.85, 1] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".bar-right", { scaleY: [1, 0.85, 1] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".bar-left", { x: [0, 2, 0], scaleY: [1, 0.85, 1] }, { duration: 0.3, ease: "easeOut" });
      await animate(".bar-right", { x: [0, -2, 0], scaleY: [1, 0.85, 1] }, { duration: 0.3, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".bar-left, .bar-right", { x: 0, scaleY: 1 }, { duration: 0.2 });
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
        <motion.rect x="5" y="3" width="5" height="18" rx="1" className="bar bar-left" />
        <motion.rect x="14" y="3" width="5" height="18" rx="1" className="bar bar-right" />
      </motion.svg>
    );
  }
);

Pause.displayName = "Pause";
export default Pause;
