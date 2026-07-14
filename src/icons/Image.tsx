import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Image = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".sun", { scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".sun", { y: [0, -1, 0], scale: [1, 1.1, 1] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      animate(".mountains", { y: [0, 2, 0] }, { duration: 0.3 });
      await animate(".sun", { y: -4, scale: 1.5, rotate: 45 }, { duration: 0.15 });
      await animate(".sun", { y: 0, scale: 1, rotate: 0 }, { duration: 0.3, type: "spring", bounce: 0.6 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".sun", { y: 0, scale: 1, opacity: 1, rotate: 0 }, { duration: 0.2 });
      animate(".mountains", { y: 0 }, { duration: 0.2 });
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
        <rect width="18" height="18" x="3" y="3" rx="2" ry="2"></rect>
        <motion.circle className="sun" style={{ transformOrigin: "9px 9px" }} cx="9" cy="9" r="2"></motion.circle>
        <motion.path className="mountains" d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"></motion.path>
      </motion.svg>
    );
  }
);

Image.displayName = "Image";
export default Image;
