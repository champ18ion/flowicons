import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const BaggageClaim = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".baggageclaim-element", { x: [-2, 2, -2] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".baggageclaim-element", { y: [0, -2, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".baggageclaim-element", { x: [0, 10, 0], scale: [1, 0.9, 1] }, { duration: 0.5 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".baggageclaim-element", { x: 0, y: 0, scale: 1 }, { duration: 0.2 });
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
        <motion.path d="M22 18H6a2 2 0 0 1-2-2V7a2 2 0 0 0-2-2" className="baggageclaim-element" />
        <motion.path d="M17 14V4a2 2 0 0 0-2-2h-1a2 2 0 0 0-2 2v10" className="baggageclaim-element" />
        <motion.rect width="13" height="8" x="8" y="6" rx="1" className="baggageclaim-element" />
        <motion.circle cx="18" cy="20" r="2" className="baggageclaim-element" />
        <motion.circle cx="9" cy="20" r="2" className="baggageclaim-element" />
      </motion.svg>
    );
  }
);

BaggageClaim.displayName = "BaggageClaim";
export default BaggageClaim;
