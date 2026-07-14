import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Balloon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".balloon-element", { y: [0, -5, 0], rotate: [0, 2, -2, 0] }, { duration: 2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".balloon-element", { scale: [1, 1.05, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".balloon-element", { y: [0, -20], scale: [1, 1.2, 0], opacity: [1, 0] }, { duration: 0.6 }); await animate(".balloon-element", { y: 0, scale: 1, opacity: 1 }, { duration: 0.1 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".balloon-element", { y: 0, rotate: 0, scale: 1, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="M12 16v1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v1" className="balloon-element" />
        <motion.path d="M12 6a2 2 0 0 1 2 2" className="balloon-element" />
        <motion.path d="M18 8c0 4-3.5 8-6 8s-6-4-6-8a6 6 0 0 1 12 0" className="balloon-element" />
      </motion.svg>
    );
  }
);

Balloon.displayName = "Balloon";
export default Balloon;
