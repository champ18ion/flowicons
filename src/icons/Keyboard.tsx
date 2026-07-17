import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Keyboard = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".key-1", { opacity: [1, 0.2, 1] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".key-3", { opacity: [1, 0.2, 1] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.15 });
      animate(".key-6", { opacity: [1, 0.2, 1] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".key-2", { opacity: [1, 0.3, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".key-5", { opacity: [1, 0.3, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.2 });
      animate(".key-4", { opacity: [1, 0.3, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.4 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".key-1, .key-3, .key-5, .key-7", { opacity: [1, 0.2, 1] }, { duration: 0.25, ease: "easeOut" });
      animate(".key-2, .key-4, .key-6", { opacity: [1, 0.2, 1] }, { duration: 0.25, ease: "easeOut", delay: 0.12 });
      await animate(".spacebar", { y: [0, 1, 0] }, { duration: 0.3, ease: "easeOut", delay: 0.2 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".key-1, .key-2, .key-3, .key-4, .key-5, .key-6, .key-7", { opacity: 1 }, { duration: 0.2 });
      animate(".spacebar", { y: 0 }, { duration: 0.2 });
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
        <motion.rect width="20" height="16" x="2" y="4" rx="2" className="frame" />
        <motion.path d="M6 8h.01" className="key key-1" />
        <motion.path d="M10 8h.01" className="key key-2" />
        <motion.path d="M14 8h.01" className="key key-3" />
        <motion.path d="M18 8h.01" className="key key-4" />
        <motion.path d="M8 12h.01" className="key key-5" />
        <motion.path d="M12 12h.01" className="key key-6" />
        <motion.path d="M16 12h.01" className="key key-7" />
        <motion.path d="M7 16h10" className="spacebar" />
      </motion.svg>
    );
  }
);

Keyboard.displayName = "Keyboard";
export default Keyboard;
