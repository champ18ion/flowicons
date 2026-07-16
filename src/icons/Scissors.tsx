import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Scissors = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".blade-a", { rotate: [0, -10, 0] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut" });
      animate(".blade-b", { rotate: [0, 10, 0] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".handle-top, .handle-bottom", { scale: [1, 1.15, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".blade-a", { rotate: [0, -14, 0] }, { duration: 0.4, ease: "easeInOut" });
      await animate(".blade-b", { rotate: [0, 14, 0] }, { duration: 0.4, ease: "easeInOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".handle-top, .handle-bottom", { scale: 1 }, { duration: 0.2 });
      animate(".blade-a, .blade-b", { rotate: 0 }, { duration: 0.2 });
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
        <motion.circle cx="6" cy="6" r="3" className="handle handle-top" />
        <motion.path d="M8.12 8.12 12 12" className="blade blade-a" />
        <motion.path d="M20 4 8.12 15.88" className="blade blade-a" />
        <motion.circle cx="6" cy="18" r="3" className="handle handle-bottom" />
        <motion.path d="M14.8 14.8 20 20" className="blade blade-b" />
      </motion.svg>
    );
  }
);

Scissors.displayName = "Scissors";
export default Scissors;
