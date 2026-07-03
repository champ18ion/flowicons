import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Calendar = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".check1", { y: [0, -2, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
      animate(".check2", { y: [0, -2, 0] }, { duration: 1, delay: 0.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".card", { rotate: [0, -3, 3, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      animate(".check1", { y: 4, opacity: 0 }, { duration: 0.1 });
      await animate(".check2", { y: 4, opacity: 0 }, { duration: 0.1 });

      animate(".check1", { y: -4 }, { duration: 0 });
      animate(".check2", { y: -4 }, { duration: 0 });

      animate(".check1", { y: 0, opacity: 1 }, { duration: 0.3, type: "spring", bounce: 0.5 });
      await animate(".check2", { y: 0, opacity: 1 }, { duration: 0.3, type: "spring", bounce: 0.5 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".card", { rotate: 0 }, { duration: 0.2 });
      animate(".check1", { y: 0, opacity: 1 }, { duration: 0.2 });
      animate(".check2", { y: 0, opacity: 1 }, { duration: 0.2 });
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
        <motion.g className="card" style={{ transformOrigin: "12px 12px" }}>
          <rect width="18" height="18" x="3" y="4" rx="2"></rect>
          <path d="M3 10h18"></path>
          <motion.path className="check1" d="M8 2v4"></motion.path>
          <motion.path className="check2" d="M16 2v4"></motion.path>
        </motion.g>
      </motion.svg>
    );
  }
);

Calendar.displayName = "Calendar";
export default Calendar;
