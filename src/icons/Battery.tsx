import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Battery = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".charge", { scaleX: [0, 1, 0] }, { duration: 1.6, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".charge", { scaleX: [0.15, 0.4, 0.15] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".tip", { opacity: [1, 0.3, 1] }, { duration: 0.5, ease: "easeOut" });
      await animate(".charge", { scaleX: [0, 1] }, { duration: 0.5, ease: "easeOut" });
      animate(".charge", { scaleX: 0 }, { duration: 0.4, ease: "easeIn", delay: 0.2 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".charge", { scaleX: 0 }, { duration: 0.2 });
      animate(".tip", { opacity: 1 }, { duration: 0.2 });
      animate(".cell", { scale: 1 }, { duration: 0.2 });
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
        <motion.path d="M 22 14 L 22 10" className="tip" />
        <motion.rect x="2" y="6" width="16" height="12" rx="2" className="cell" />
        <motion.rect
          x="4"
          y="8"
          width="12"
          height="8"
          rx="1"
          className="charge"
          fill={color}
          stroke="none"
          initial={{ scaleX: 0 }}
          style={{ transformOrigin: "4px 12px" }}
        />
      </motion.svg>
    );
  }
);

Battery.displayName = "Battery";
export default Battery;
