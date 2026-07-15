import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Anchor = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".anchor-element", { rotate: [0, 10, -10, 0] }, { duration: 2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".anchor-element", { y: [0, -3, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".anchor-element", { y: [0, 10, -2, 0], scale: [1, 0.9, 1.1, 1] }, { duration: 0.5, ease: "backOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".anchor-element", { rotate: 0, y: 0, scale: 1 }, { duration: 0.2 });
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
        <motion.path d="M12 6v16" className="anchor-element" />
        <motion.path d="m19 13 2-1a9 9 0 0 1-18 0l2 1" className="anchor-element" />
        <motion.path d="M9 11h6" className="anchor-element" />
        <motion.circle cx="12" cy="4" r="2" className="anchor-element" />
      </motion.svg>
    );
  }
);

Anchor.displayName = "Anchor";
export default Anchor;
