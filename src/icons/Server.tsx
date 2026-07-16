import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Server = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".led-top", { opacity: [1, 0.2, 1] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".led-bottom", { opacity: [1, 0.2, 1] }, { duration: 0.5, repeat: Infinity, ease: "easeInOut", delay: 0.25 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".led-top", { opacity: [1, 0.3, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".led-bottom", { opacity: [1, 0.3, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.35 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".unit-top", { scale: [1, 1.06, 1] }, { duration: 0.25, ease: "easeOut" });
      await animate(".unit-bottom", { scale: [1, 1.06, 1] }, { duration: 0.25, ease: "easeOut", delay: 0.12 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".led-top, .led-bottom", { opacity: 1 }, { duration: 0.2 });
      animate(".unit-top, .unit-bottom", { scale: 1 }, { duration: 0.2 });
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
        <motion.rect width="20" height="8" x="2" y="2" rx="2" ry="2" className="unit unit-top" />
        <motion.rect width="20" height="8" x="2" y="14" rx="2" ry="2" className="unit unit-bottom" />
        <motion.line x1="6" x2="6.01" y1="6" y2="6" className="led led-top" />
        <motion.line x1="6" x2="6.01" y1="18" y2="18" className="led led-bottom" />
      </motion.svg>
    );
  }
);

Server.displayName = "Server";
export default Server;
