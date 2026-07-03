import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Zap = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".bolt", { opacity: [1, 0.4, 1] }, { duration: 0.5, repeat: Infinity, ease: "linear" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".bolt", { y: [0, -2, 0], scale: [1, 1.05, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      animate(".bolt", { scale: 1.5, rotate: 10, fill: color }, { duration: 0.1 });
      await new Promise(r => setTimeout(r, 100));
      animate(".bolt", { scale: 0.8, rotate: -5, fill: "transparent" }, { duration: 0.1 });
      await new Promise(r => setTimeout(r, 100));
      animate(".bolt", { scale: 1.2, rotate: 0, fill: color }, { duration: 0.1 });
      await new Promise(r => setTimeout(r, 100));
      animate(".bolt", { scale: 1, rotate: 0, fill: "transparent" }, { duration: 0.3, type: "spring", bounce: 0.6 });
    }, [animate, color]);

    const stop = useCallback(() => {
      animate(".bolt", { y: 0, scale: 1, opacity: 1, rotate: 0, fill: "transparent" }, { duration: 0.2 });
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
        <motion.path className="bolt" style={{ transformOrigin: "12px 12px" }} d="M4 14a1 1 0 0 1-.78-1.63l9.9-10.2a.5.5 0 0 1 .86.46l-1.92 6.02A1 1 0 0 0 13 10h7a1 1 0 0 1 .78 1.63l-9.9 10.2a.5.5 0 0 1-.86-.46l1.92-6.02A1 1 0 0 0 11 14z"></motion.path>
      </motion.svg>
    );
  }
);

Zap.displayName = "Zap";
export default Zap;
