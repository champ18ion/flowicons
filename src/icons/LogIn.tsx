import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const LogIn = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".arrow", { x: [0, 3, 0], opacity: [1, 0.4, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".arrow", { x: [0, 2, 0] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".door", { scaleY: [1, 1.05, 1] }, { duration: 0.35, ease: "easeOut", delay: 0.15 });
      await animate(".arrow", { x: [0, 7], opacity: [1, 0] }, { duration: 0.3, ease: "easeIn" });
      await animate(".arrow", { x: [-4, 0], opacity: [0, 1] }, { duration: 0.25, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".arrow", { x: 0, opacity: 1 }, { duration: 0.2 });
      animate(".door", { scaleY: 1 }, { duration: 0.2 });
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
        <motion.path d="M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4" className="door" />
        <motion.polyline points="10 17 15 12 10 7" className="arrow" />
        <motion.line x1="15" x2="3" y1="12" y2="12" className="arrow" />
      </motion.svg>
    );
  }
);

LogIn.displayName = "LogIn";
export default LogIn;
