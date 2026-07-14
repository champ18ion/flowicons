import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const CigaretteOff = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".cigaretteoff-element", { opacity: [0.5, 1, 0.5] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".cigaretteoff-element", { scale: [1, 1.05, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".cigaretteoff-element", { rotate: [0, 15, -15, 0], scale: [1, 1.2, 1] }, { duration: 0.5 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".cigaretteoff-element", { opacity: 1, scale: 1, rotate: 0 }, { duration: 0.2 });
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
        <motion.path d="M12 12H3a1 1 0 0 0-1 1v2a1 1 0 0 0 1 1h13" className="cigaretteoff-element" />
        <motion.path d="M18 8c0-2.5-2-2.5-2-5" className="cigaretteoff-element" />
        <motion.path d="m2 2 20 20" className="cigaretteoff-element" />
        <motion.path d="M21 12a1 1 0 0 1 1 1v2a1 1 0 0 1-.5.866" className="cigaretteoff-element" />
        <motion.path d="M22 8c0-2.5-2-2.5-2-5" className="cigaretteoff-element" />
        <motion.path d="M7 12v4" className="cigaretteoff-element" />
      </motion.svg>
    );
  }
);

CigaretteOff.displayName = "CigaretteOff";
export default CigaretteOff;
