import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Building = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".building-element", { y: [0, -2, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".building-element", { scaleY: [1, 1.05, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".building-element", { scaleY: [1, 0.9, 1.1, 1], y: [0, 2, -2, 0] }, { duration: 0.5 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".building-element", { y: 0, scaleY: 1 }, { duration: 0.2 });
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
        <motion.path d="M12 10h.01" className="building-element" />
        <motion.path d="M12 14h.01" className="building-element" />
        <motion.path d="M12 6h.01" className="building-element" />
        <motion.path d="M16 10h.01" className="building-element" />
        <motion.path d="M16 14h.01" className="building-element" />
        <motion.path d="M16 6h.01" className="building-element" />
        <motion.path d="M8 10h.01" className="building-element" />
        <motion.path d="M8 14h.01" className="building-element" />
        <motion.path d="M8 6h.01" className="building-element" />
        <motion.path d="M9 22v-3a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v3" className="building-element" />
        <motion.rect x="4" y="2" width="16" height="20" rx="2" className="building-element" />
      </motion.svg>
    );
  }
);

Building.displayName = "Building";
export default Building;
