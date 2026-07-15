import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Beaker = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".beaker-element", { rotate: [0, -5, 5, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".beaker-element", { y: [0, -3, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".beaker-element", { y: [0, -10, 0], rotate: [0, 15, -15, 0] }, { duration: 0.6 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".beaker-element", { rotate: 0, y: 0 }, { duration: 0.2 });
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
        <motion.path d="M4.5 3h15" className="beaker-element" />
        <motion.path d="M6 3v16a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V3" className="beaker-element" />
        <motion.path d="M6 14h12" className="beaker-element" />
      </motion.svg>
    );
  }
);

Beaker.displayName = "Beaker";
export default Beaker;
