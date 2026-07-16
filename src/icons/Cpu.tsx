import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Cpu = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".icon-element", { pathLength: [0, 1] }, { duration: 1.5, repeat: Infinity, ease: "linear" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(".icon-element", { rotate: [0, 5, -5, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".icon-element", { rotate: [0, -10, 10, 0] }, { duration: 0.5, ease: "easeOut" });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".icon-element", { scale: 1, rotate: 0, pathLength: 1, pathOffset: 0, y: 0, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="M12 20v2" className="icon-element" /><motion.path d="M12 2v2" className="icon-element" /><motion.path d="M17 20v2" className="icon-element" /><motion.path d="M17 2v2" className="icon-element" /><motion.path d="M2 12h2" className="icon-element" /><motion.path d="M2 17h2" className="icon-element" /><motion.path d="M2 7h2" className="icon-element" /><motion.path d="M20 12h2" className="icon-element" /><motion.path d="M20 17h2" className="icon-element" /><motion.path d="M20 7h2" className="icon-element" /><motion.path d="M7 20v2" className="icon-element" /><motion.path d="M7 2v2" className="icon-element" /><motion.rect x="4" y="4" width="16" height="16" rx="2" className="icon-element" /><motion.rect x="8" y="8" width="8" height="8" rx="1" className="icon-element" />
      </motion.svg>
    );
  }
);

Cpu.displayName = "Cpu";
export default Cpu;
