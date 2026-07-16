import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Wind = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".gust-1", { x: [0, 3, 0] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".gust-2", { x: [0, 3, 0] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.1 });
      animate(".gust-3", { x: [0, 3, 0] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.2 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".gust-1", { x: [0, 2, 0] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".gust-2", { x: [0, 2, 0] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.15 });
      animate(".gust-3", { x: [0, 2, 0] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.3 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".gust-1", { x: [0, 6, 0], opacity: [1, 0.4, 1] }, { duration: 0.35, ease: "easeOut", delay: 0 });
      animate(".gust-2", { x: [0, 6, 0], opacity: [1, 0.4, 1] }, { duration: 0.35, ease: "easeOut", delay: 0.08 });
      await animate(".gust-3", { x: [0, 6, 0], opacity: [1, 0.4, 1] }, { duration: 0.35, ease: "easeOut", delay: 0.16 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".gust-1, .gust-2, .gust-3", { x: 0, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="M9.8 4.4A2 2 0 1 1 11 8H2" className="gust gust-1" />
        <motion.path d="M17.5 8a2.5 2.5 0 1 1 2 4H2" className="gust gust-2" />
        <motion.path d="M12.8 19.6A2 2 0 1 0 14 16H2" className="gust gust-3" />
      </motion.svg>
    );
  }
);

Wind.displayName = "Wind";
export default Wind;
