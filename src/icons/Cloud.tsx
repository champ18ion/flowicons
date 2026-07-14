import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Cloud = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".cloud", { x: [-2, 2, -2] }, { duration: 2.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".cloud", { y: [0, -1, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      await animate(".cloud", { scale: 1.1, y: -3 }, { duration: 0.15 });
      await animate(".cloud", { scale: 0.95, y: 1 }, { duration: 0.15 });
      await animate(".cloud", { scale: 1, y: 0 }, { duration: 0.3, type: "spring", bounce: 0.6 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".cloud", { x: 0, y: 0, scale: 1 }, { duration: 0.2 });
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
        <motion.path className="cloud" style={{ transformOrigin: "12px 14px" }} d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z"></motion.path>
      </motion.svg>
    );
  }
);

Cloud.displayName = "Cloud";
export default Cloud;
