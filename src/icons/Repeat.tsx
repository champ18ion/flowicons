import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Repeat = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".top", { x: [0, 4, 0], opacity: [1, 0.4, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut" });
      animate(".bottom", { x: [0, -4, 0], opacity: [1, 0.4, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".top", { x: [0, 2, 0] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut" });
      animate(".bottom", { x: [0, -2, 0] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".top", { x: [0, 6, 0] }, { duration: 0.45, ease: "easeOut" });
      await animate(".bottom", { x: [0, -6, 0] }, { duration: 0.45, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".top, .bottom", { x: 0, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="m17 2 4 4-4 4" className="top" />
        <motion.path d="M3 11v-1a4 4 0 0 1 4-4h14" className="top" />
        <motion.path d="m7 22-4-4 4-4" className="bottom" />
        <motion.path d="M21 13v1a4 4 0 0 1-4 4H3" className="bottom" />
      </motion.svg>
    );
  }
);

Repeat.displayName = "Repeat";
export default Repeat;
