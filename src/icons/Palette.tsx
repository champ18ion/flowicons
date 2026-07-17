import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Palette = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".paint-1", { opacity: [1, 0.2, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".paint-2", { opacity: [1, 0.2, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.2 });
      animate(".paint-3", { opacity: [1, 0.2, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.4 });
      animate(".paint-4", { opacity: [1, 0.2, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".paint-1", { scale: [1, 2, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".paint-2", { scale: [1, 2, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.25 });
      animate(".paint-3", { scale: [1, 2, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.5 });
      animate(".paint-4", { scale: [1, 2, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.75 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".paint-1", { scale: [1, 3, 1] }, { duration: 0.3, ease: "easeOut", delay: 0 });
      animate(".paint-2", { scale: [1, 3, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.08 });
      animate(".paint-3", { scale: [1, 3, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.16 });
      animate(".paint-4", { scale: [1, 3, 1] }, { duration: 0.3, ease: "easeOut", delay: 0.24 });
      await animate(".board", { rotate: [0, -4, 4, 0] }, { duration: 0.5, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".paint-1, .paint-2, .paint-3, .paint-4", { scale: 1, opacity: 1 }, { duration: 0.2 });
      animate(".board", { rotate: 0 }, { duration: 0.2 });
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
        <motion.path d="M12 22a1 1 0 0 1 0-20 10 9 0 0 1 10 9 5 5 0 0 1-5 5h-2.25a1.75 1.75 0 0 0-1.4 2.8l.3.4a1.75 1.75 0 0 1-1.4 2.8z" className="board" />
        <motion.circle cx="13.5" cy="6.5" r=".5" fill="currentColor" className="paint paint-1" />
        <motion.circle cx="17.5" cy="10.5" r=".5" fill="currentColor" className="paint paint-2" />
        <motion.circle cx="8.5" cy="7.5" r=".5" fill="currentColor" className="paint paint-3" />
        <motion.circle cx="6.5" cy="12.5" r=".5" fill="currentColor" className="paint paint-4" />
      </motion.svg>
    );
  }
);

Palette.displayName = "Palette";
export default Palette;
