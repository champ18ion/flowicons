import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Shuffle = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".line-a", { opacity: [1, 0.3, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut" });
      animate(".line-b", { opacity: [0.3, 1, 0.3] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".line-a", { opacity: [1, 0.4, 1] }, { duration: 1.1, repeat: Infinity, ease: "easeInOut" });
      animate(".line-b", { opacity: [0.4, 1, 0.4] }, { duration: 1.1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".line-a", { pathLength: [0, 1] }, { duration: 0.45, ease: "easeOut" });
      await animate(".line-b", { pathLength: [0, 1] }, { duration: 0.45, ease: "easeOut", delay: 0.1 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".line-a, .line-b", { opacity: 1, pathLength: 1 }, { duration: 0.2 });
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
        <motion.path d="M2 18h1.4c1.3 0 2.5-.6 3.3-1.7l6.1-8.6c.8-1.1 2-1.7 3.3-1.7H22" className="line-a" />
        <motion.path d="m18 2 4 4-4 4" className="line-a" />
        <motion.path d="M2 6h1.9c1.5 0 2.9.9 3.6 2.2" className="line-b" />
        <motion.path d="M22 18h-5.9c-1.3 0-2.6-.7-3.3-1.8l-.5-.8" className="line-b" />
        <motion.path d="m18 14 4 4-4 4" className="line-b" />
      </motion.svg>
    );
  }
);

Shuffle.displayName = "Shuffle";
export default Shuffle;
