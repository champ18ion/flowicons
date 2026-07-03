import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Monitor = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".screen", { opacity: [1, 0.5, 1] }, { duration: 1, repeat: Infinity, ease: "linear" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".monitor", { y: [0, -2, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      await animate(".screen", { scaleY: 0.05, opacity: 0 }, { duration: 0.15, ease: "easeIn" });
      await animate(".screen", { scaleX: 0, opacity: 0 }, { duration: 0.1, ease: "easeIn" });
      animate(".screen", { scaleY: 1, scaleX: 1, opacity: 1 }, { duration: 0.3, type: "spring", bounce: 0.5 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".monitor", { y: 0 }, { duration: 0.2 });
      animate(".screen", { opacity: 1, scaleX: 1, scaleY: 1 }, { duration: 0.2 });
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
        <motion.g className="monitor" style={{ transformOrigin: "12px 18px" }}>
          <motion.rect className="screen" width="20" height="14" x="2" y="3" rx="2" style={{ transformOrigin: "12px 10px" }}></motion.rect>
          <line x1="8" x2="16" y1="21" y2="21"></line>
          <line x1="12" x2="12" y1="17" y2="21"></line>
        </motion.g>
      </motion.svg>
    );
  }
);

Monitor.displayName = "Monitor";
export default Monitor;
