import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Info = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".dot", { opacity: [1, 0, 1] }, { duration: 1, repeat: Infinity, ease: "linear" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".line", { y: [0, -1, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      animate(".dot", { y: -2, scale: 1.5 }, { duration: 0.1 });
      animate(".line", { y: 2, scaleY: 0.8 }, { duration: 0.1 });
      await new Promise(resolve => setTimeout(resolve, 100));
      animate(".dot", { y: 0, scale: 1 }, { duration: 0.2, type: "spring", bounce: 0.6 });
      animate(".line", { y: 0, scaleY: 1 }, { duration: 0.2, type: "spring", bounce: 0.6 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".dot", { opacity: 1, y: 0, scale: 1 }, { duration: 0.2 });
      animate(".line", { y: 0, scaleY: 1 }, { duration: 0.2 });
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
        <circle cx="12" cy="12" r="10"></circle>
        <motion.path className="line" d="M12 16v-4" style={{ transformOrigin: "50% 100%" }}></motion.path>
        <motion.path className="dot" d="M12 8h.01"></motion.path>
      </motion.svg>
    );
  }
);

Info.displayName = "Info";
export default Info;
