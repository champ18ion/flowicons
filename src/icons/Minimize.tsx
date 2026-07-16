import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Minimize = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".corner", { opacity: [1, 0.3, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".corner-tl", { x: [0, 1.5, 0], y: [0, 1.5, 0] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut" });
      animate(".corner-tr", { x: [0, -1.5, 0], y: [0, 1.5, 0] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut" });
      animate(".corner-bl", { x: [0, 1.5, 0], y: [0, -1.5, 0] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut" });
      animate(".corner-br", { x: [0, -1.5, 0], y: [0, -1.5, 0] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".corner-tl", { x: [0, 3, 0], y: [0, 3, 0] }, { duration: 0.35, ease: "easeOut" });
      animate(".corner-tr", { x: [0, -3, 0], y: [0, 3, 0] }, { duration: 0.35, ease: "easeOut" });
      animate(".corner-bl", { x: [0, 3, 0], y: [0, -3, 0] }, { duration: 0.35, ease: "easeOut" });
      await animate(".corner-br", { x: [0, -3, 0], y: [0, -3, 0] }, { duration: 0.35, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".corner", { x: 0, y: 0, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="M8 3v3a2 2 0 0 1-2 2H3" className="corner corner-tl" />
        <motion.path d="M21 8h-3a2 2 0 0 1-2-2V3" className="corner corner-tr" />
        <motion.path d="M3 16h3a2 2 0 0 1 2 2v3" className="corner corner-bl" />
        <motion.path d="M16 21v-3a2 2 0 0 1 2-2h3" className="corner corner-br" />
      </motion.svg>
    );
  }
);

Minimize.displayName = "Minimize";
export default Minimize;
