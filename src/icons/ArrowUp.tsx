import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ArrowUp = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // Loading: Bounce
    const bounce = useCallback(() => {
      animate(
        ".arrow",
        { y: [0, -3, 0] },
        { duration: 1, repeat: Infinity, ease: "easeInOut" }
      );
    }, [animate]);

    // Action: Nudge Up
    const nudge = useCallback(async () => {
      await animate(
        ".arrow",
        { y: [0, -6, 0] },
        { duration: 0.4, ease: "easeInOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".arrow", { y: 0 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      play: nudge,
      stop: stop,
    }));

    useEffect(() => {
      if (loading) bounce();
      else stop();
    }, [loading, bounce, stop]);

    return (
      <motion.svg
        ref={scope}
        onMouseEnter={() => !loading &&
          animate(".arrow", { y: -2 }, { duration: 0.2, ease: "easeOut" }) // Hover = Nudge
        }
        onMouseLeave={() => !loading && stop()}
        onClick={() => !loading && nudge()} // Click = Launch/Move
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

        <motion.g className="arrow">
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </motion.g>
      </motion.svg>
    );
  }
);

ArrowUp.displayName = "ArrowUp";

export default ArrowUp;
