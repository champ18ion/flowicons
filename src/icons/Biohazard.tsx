import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Biohazard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".biohazard-element", { rotate: [0, 360] }, { duration: 3, repeat: Infinity, ease: "linear" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".biohazard-element", { scale: [1, 1.1, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".biohazard-element", { scale: [1, 1.3, 1], rotate: [0, 45, 0] }, { duration: 0.5 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".biohazard-element", { rotate: 0, scale: 1 }, { duration: 0.2 });
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
        <motion.circle cx="12" cy="11.9" r="2" className="biohazard-element" />
        <motion.path d="M6.7 3.4c-.9 2.5 0 5.2 2.2 6.7C6.5 9 3.7 9.6 2 11.6" className="biohazard-element" />
        <motion.path d="m8.9 10.1 1.4.8" className="biohazard-element" />
        <motion.path d="M17.3 3.4c.9 2.5 0 5.2-2.2 6.7 2.4-1.2 5.2-.6 6.9 1.5" className="biohazard-element" />
        <motion.path d="m15.1 10.1-1.4.8" className="biohazard-element" />
        <motion.path d="M16.7 20.8c-2.6-.4-4.6-2.6-4.7-5.3-.2 2.6-2.1 4.8-4.7 5.2" className="biohazard-element" />
        <motion.path d="M12 13.9v1.6" className="biohazard-element" />
        <motion.path d="M13.5 5.4c-1-.2-2-.2-3 0" className="biohazard-element" />
        <motion.path d="M17 16.4c.7-.7 1.2-1.6 1.5-2.5" className="biohazard-element" />
        <motion.path d="M5.5 13.9c.3.9.8 1.8 1.5 2.5" className="biohazard-element" />
      </motion.svg>
    );
  }
);

Biohazard.displayName = "Biohazard";
export default Biohazard;
