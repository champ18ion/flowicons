import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Save = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".disk", { y: [0, -2, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".disk", { scale: [1, 1.05, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
      animate(".slot", { opacity: [1, 0.5, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".slot", { y: -2, opacity: 0 }, { duration: 0.1 });
      await animate(".disk", { y: -4, scale: 0.9 }, { duration: 0.1 });
      await animate(".disk", { y: 0, scale: 1 }, { duration: 0.2, type: "spring", bounce: 0.6 });
      animate(".slot", { y: 0, opacity: 1 }, { duration: 0.2 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".disk", { y: 0, scale: 1 }, { duration: 0.2 });
      animate(".slot", { y: 0, opacity: 1 }, { duration: 0.2 });
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
        <motion.path className="disk" style={{ transformOrigin: "50% 50%" }} d="M15.2 3a2 2 0 0 1 1.4.6l3.8 3.8a2 2 0 0 1 .6 1.4V19a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2z"></motion.path>
        <path d="M17 21v-7a1 1 0 0 0-1-1H8a1 1 0 0 0-1 1v7"></path>
        <motion.path className="slot" d="M7 3v4a1 1 0 0 0 1 1h7"></motion.path>
      </motion.svg>
    );
  }
);

Save.displayName = "Save";
export default Save;
