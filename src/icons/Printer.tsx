import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Printer = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".paper-out", { y: [0, 2, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".paper-in", { y: [0, 1, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      animate(".paper-in", { y: 4, opacity: 0 }, { duration: 0.2 });
      await animate(".paper-out", { y: 6 }, { duration: 0.3 });
      animate(".paper-out", { opacity: 0 }, { duration: 0.1 });
      animate(".paper-out", { y: 0 }, { duration: 0 });
      animate(".paper-in", { y: -4, opacity: 0 }, { duration: 0 });
      await animate(".paper-in", { y: 0, opacity: 1 }, { duration: 0.2 });
      await animate(".paper-out", { opacity: 1 }, { duration: 0.2 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".paper-in", { y: 0, opacity: 1 }, { duration: 0.2 });
      animate(".paper-out", { y: 0, opacity: 1 }, { duration: 0.2 });
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
        <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
        <motion.g className="paper-in" style={{ transformOrigin: "12px 6px" }}>
          <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"></path>
        </motion.g>
        <motion.rect className="paper-out" x="6" y="14" width="12" height="8" rx="1"></motion.rect>
      </motion.svg>
    );
  }
);

Printer.displayName = "Printer";
export default Printer;
