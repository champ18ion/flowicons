import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const ChartBar = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // Loading: Gentle Bar Vibe
    const vibe = useCallback(() => {
        animate(".bar-1", { scaleY: [1, 0.8, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 });
        animate(".bar-2", { scaleY: [1, 0.8, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 });
        animate(".bar-3", { scaleY: [1, 0.8, 1] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 });
    }, [animate]);

    // Hover: Grow (User Provided)
    const start = useCallback(() => {
      animate(".bar-1", { scaleY: [0, 1] }, { duration: 0.3, ease: "easeOut" });
      animate(
        ".bar-2",
        { scaleY: [0, 1] },
        { duration: 0.3, ease: "easeOut", delay: 0.1 },
      );
      animate(
        ".bar-3",
        { scaleY: [0, 1] },
        { duration: 0.3, ease: "easeOut", delay: 0.2 },
      );
      animate(
        ".base-line",
        { scaleX: [1, 1.05, 1] },
        { duration: 0.4, ease: "easeInOut" },
      );
    }, [animate]);

    // Click: Refresh Bounce
    const playRefresh = useCallback(async () => {
        await animate("path:not(.base-line)", { scaleY: 0.5 }, { duration: 0.1 });
        animate("path:not(.base-line)", { scaleY: 1 }, { type: "spring", bounce: 0.6 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(
        ".bar-1 , .bar-2 , .bar-3",
        { scaleY: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
      animate(
        ".base-line",
        { scaleX: 1 },
        { duration: 0.2, ease: "easeInOut" },
      );
    }, [animate]);

    useImperativeHandle(ref, () => ({
      play: playRefresh,
      stop: stop,
    }));

    useEffect(() => {
      if (loading) vibe();
      else stop();
    }, [loading, vibe, stop]);

    return (
      <motion.svg
        ref={scope}
        onMouseEnter={() => !loading && start()}
        onMouseLeave={() => !loading && stop()}
        onClick={() => !loading && playRefresh()}
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
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />

        <motion.path
          d="M3 13a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v6a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          className="bar-1"
          style={{ transformOrigin: "6px 20px" }}
        />

        <motion.path
          d="M9 5a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          className="bar-2"
          style={{ transformOrigin: "12px 20px" }}
        />

        <motion.path
          d="M15 9a1 1 0 0 1 1 -1h4a1 1 0 0 1 1 1v10a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1z"
          className="bar-3"
          style={{ transformOrigin: "18px 20px" }}
        />

        <motion.path
          d="M4 20h14"
          className="base-line"
          style={{ transformOrigin: "11px 20px" }}
        />
      </motion.svg>
    );
  }
);

ChartBar.displayName = "ChartBar";
export default ChartBar;
