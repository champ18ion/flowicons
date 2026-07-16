import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const CloudRain = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".drop-1", { y: [0, 4, 0], opacity: [1, 0, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeIn", delay: 0 });
      animate(".drop-2", { y: [0, 4, 0], opacity: [1, 0, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeIn", delay: 0.2 });
      animate(".drop-3", { y: [0, 4, 0], opacity: [1, 0, 1] }, { duration: 0.8, repeat: Infinity, ease: "easeIn", delay: 0.4 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".cloud", { x: [-2, 2, -2] }, { duration: 1.4, repeat: Infinity, ease: "easeInOut" });
      animate(".drop-1", { y: [0, 2, 0], opacity: [1, 0.4, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".drop-2", { y: [0, 2, 0], opacity: [1, 0.4, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.15 });
      animate(".drop-3", { y: [0, 2, 0], opacity: [1, 0.4, 1] }, { duration: 0.7, repeat: Infinity, ease: "easeInOut", delay: 0.3 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".cloud", { scaleY: [1, 0.9, 1] }, { duration: 0.25, ease: "easeOut" });
      animate(".drop-1", { y: [0, 8], opacity: [1, 0] }, { duration: 0.4, ease: "easeIn", delay: 0 });
      animate(".drop-2", { y: [0, 8], opacity: [1, 0] }, { duration: 0.4, ease: "easeIn", delay: 0.1 });
      await animate(".drop-3", { y: [0, 8], opacity: [1, 0] }, { duration: 0.4, ease: "easeIn", delay: 0.2 });
      animate(".drop-1, .drop-2, .drop-3", { y: 0, opacity: 1 }, { duration: 0.15 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".cloud", { x: 0, scaleY: 1 }, { duration: 0.2 });
      animate(".drop-1, .drop-2, .drop-3", { y: 0, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242" className="cloud" />
        <motion.path d="M8 14v6" className="drop drop-1" />
        <motion.path d="M12 16v6" className="drop drop-2" />
        <motion.path d="M16 14v6" className="drop drop-3" />
      </motion.svg>
    );
  }
);

CloudRain.displayName = "CloudRain";
export default CloudRain;
