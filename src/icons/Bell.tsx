import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Bell = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // Loading: Continuous Ringing
    const loop = useCallback(() => {
      animate(
        ".bell",
        { rotate: [0, -5, 5, -5, 5, 0] },
        { duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }
      );
      animate(
        ".clapper",
        { x: [0, -1, 1, -1, 1, 0] },
        { duration: 2, repeat: Infinity, ease: "easeInOut", repeatDelay: 1 }
      );
    }, [animate]);

    // Action: Ring
    const ring = useCallback(() => {
      animate(
        ".bell",
        { rotate: [0, -15, 12, -9, 6, -3, 0] },
        { duration: 0.5, ease: "easeInOut" }
      );
      animate(
        ".clapper",
        { x: [0, -2, 1.5, -1, 0.5, 0] },
        { duration: 0.5, ease: "easeInOut" }
      );
    }, [animate]);

    const stop = useCallback(() => {
      animate(".bell", { rotate: 0 }, { duration: 0.2 });
      animate(".clapper", { x: 0 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      play: ring,
      stop: stop,
    }));

    useEffect(() => {
      if (loading) loop();
      else stop();
    }, [loading, loop, stop]);

    return (
      <motion.svg
        ref={scope}
        onMouseEnter={() => !loading &&
          animate(".bell", { rotate: [0, -5, 5, 0] }, { duration: 0.5, ease: "easeInOut" }) // Hover = Gentle Sway
        }
        onMouseLeave={() => !loading && stop()}
        onClick={() => !loading && ring()} // Click = Ring
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

        <motion.g className="bell" style={{ transformOrigin: "12px 4px" }}>
          <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
          <path d="M13.73 21a2 2 0 01-3.46 0" />
        </motion.g>

        <motion.circle
          className="clapper"
          cx="12"
          cy="17"
          r="1"
          fill={color}
          stroke="none"
        />
      </motion.svg>
    );
  }
);

Bell.displayName = "Bell";

export default Bell;
