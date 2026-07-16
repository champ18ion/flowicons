import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const HardDrive = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".led-left", { opacity: [1, 0.2, 1] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".led-right", { opacity: [1, 0.2, 1] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".led-left", { opacity: [1, 0.3, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".led-right", { opacity: [1, 0.3, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.35 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".body", { y: [0, -1, 0] }, { duration: 0.3, ease: "easeOut" });
      animate(".led-left", { opacity: [1, 0.1, 1] }, { duration: 0.2, ease: "easeOut" });
      await animate(".led-right", { opacity: [1, 0.1, 1] }, { duration: 0.2, ease: "easeOut", delay: 0.1 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".led-left, .led-right", { opacity: 1 }, { duration: 0.2 });
      animate(".body", { y: 0 }, { duration: 0.2 });
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
        <motion.path d="M10 16h.01" className="led led-right" />
        <motion.path d="M2.212 11.577a2 2 0 0 0-.212.896V18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-5.527a2 2 0 0 0-.212-.896L18.55 5.11A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z" className="body" />
        <motion.path d="M21.946 12.013H2.054" className="body" />
        <motion.path d="M6 16h.01" className="led led-left" />
      </motion.svg>
    );
  }
);

HardDrive.displayName = "HardDrive";
export default HardDrive;
