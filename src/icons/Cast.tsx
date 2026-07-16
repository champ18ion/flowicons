import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Cast = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".wave-1", { opacity: [1, 0.2, 1] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".wave-2", { opacity: [1, 0.2, 1] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.2 });
      animate(".dot", { opacity: [1, 0.2, 1] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut", delay: 0.4 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".wave-1", { opacity: [0.5, 1, 0.5] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".wave-2", { opacity: [0.5, 1, 0.5] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut", delay: 0.25 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".screen", { scaleY: [1, 0.94, 1] }, { duration: 0.2, ease: "easeOut" });
      animate(".dot", { scale: [1, 1.6, 1] }, { duration: 0.25, ease: "easeOut" });
      animate(".wave-2", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.05 });
      await animate(".wave-1", { pathLength: [0, 1], opacity: [0, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.2 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".wave-1, .wave-2", { opacity: 1, pathLength: 1 }, { duration: 0.2 });
      animate(".dot", { scale: 1, opacity: 1 }, { duration: 0.2 });
      animate(".screen", { scaleY: 1 }, { duration: 0.2 });
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
        <motion.path d="M2 8V6a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2h-6" className="screen" />
        <motion.path d="M2 12a9 9 0 0 1 8 8" className="wave wave-1" />
        <motion.path d="M2 16a5 5 0 0 1 4 4" className="wave wave-2" />
        <motion.line x1="2" x2="2.01" y1="20" y2="20" className="dot" />
      </motion.svg>
    );
  }
);

Cast.displayName = "Cast";
export default Cast;
