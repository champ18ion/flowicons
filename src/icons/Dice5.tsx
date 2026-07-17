import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Dice5 = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".die", { rotate: [0, 8, -8, 0] }, { duration: 0.6, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".die", { rotate: [0, 4, -4, 0] }, { duration: 0.9, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".pip-1", { opacity: [1, 0, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.1 });
      animate(".pip-2", { opacity: [1, 0, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.2 });
      animate(".pip-3", { opacity: [1, 0, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.15 });
      animate(".pip-4", { opacity: [1, 0, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.25 });
      animate(".pip-5", { opacity: [1, 0, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.3 });
      await animate(".die", { rotate: [0, 360] }, { duration: 0.6, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".die", { rotate: 0 }, { duration: 0.2 });
      animate(".pip-1, .pip-2, .pip-3, .pip-4, .pip-5", { opacity: 1 }, { duration: 0.2 });
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
        <motion.rect width="18" height="18" x="3" y="3" rx="2" ry="2" className="die" />
        <motion.path d="M8 8h.01" className="pip pip-1" />
        <motion.path d="M16 8h.01" className="pip pip-2" />
        <motion.path d="M12 12h.01" className="pip pip-3" />
        <motion.path d="M8 16h.01" className="pip pip-4" />
        <motion.path d="M16 16h.01" className="pip pip-5" />
      </motion.svg>
    );
  }
);

Dice5.displayName = "Dice5";
export default Dice5;
