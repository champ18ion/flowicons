import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Bug = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".bug-element", { x: [-2, 2, -2] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".bug-element", { scale: [1, 1.1, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".bug-element", { y: [0, -10, 10, 0], x: [0, 5, -5, 0] }, { duration: 0.5 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".bug-element", { x: 0, scale: 1, y: 0 }, { duration: 0.2 });
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
        <motion.path d="M12 20v-9" className="bug-element" />
        <motion.path d="M14 7a4 4 0 0 1 4 4v3a6 6 0 0 1-12 0v-3a4 4 0 0 1 4-4z" className="bug-element" />
        <motion.path d="M14.12 3.88 16 2" className="bug-element" />
        <motion.path d="M21 21a4 4 0 0 0-3.81-4" className="bug-element" />
        <motion.path d="M21 5a4 4 0 0 1-3.55 3.97" className="bug-element" />
        <motion.path d="M22 13h-4" className="bug-element" />
        <motion.path d="M3 21a4 4 0 0 1 3.81-4" className="bug-element" />
        <motion.path d="M3 5a4 4 0 0 0 3.55 3.97" className="bug-element" />
        <motion.path d="M6 13H2" className="bug-element" />
        <motion.path d="m8 2 1.88 1.88" className="bug-element" />
        <motion.path d="M9 7.13V6a3 3 0 1 1 6 0v1.13" className="bug-element" />
      </motion.svg>
    );
  }
);

Bug.displayName = "Bug";
export default Bug;
