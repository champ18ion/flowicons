import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Plus = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".icon-element", { rotate: 90 }, { duration: 1, repeat: Infinity, ease: "linear" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".icon-element", { rotate: [0, 15, -15, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      await animate(".icon-element", { scale: 1.2, rotate: 90 }, { duration: 0.15 });
      await animate(".icon-element", { scale: 1, rotate: 180 }, { duration: 0.2, type: "spring" });
      animate(".icon-element", { rotate: 0 }, { duration: 0 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".icon-element", { scale: 1, rotate: 0 }, { duration: 0.2 });
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
        <motion.g className="icon-element" style={{ transformOrigin: "50% 50%" }}>
          <path d="M5 12h14"></path>
          <path d="M12 5v14"></path>
        </motion.g>
      </motion.svg>
    );
  }
);

Plus.displayName = "Plus";
export default Plus;
