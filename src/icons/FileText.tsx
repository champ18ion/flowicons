import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const FileText = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".line-1", { opacity: [1, 0.3, 1] }, { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".line-2", { opacity: [1, 0.3, 1] }, { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.15 });
      animate(".line-3", { opacity: [1, 0.3, 1] }, { duration: 0.6, repeat: Infinity, ease: "easeInOut", delay: 0.3 });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".line-1", { opacity: [0.5, 1, 0.5] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0 });
      animate(".line-2", { opacity: [0.5, 1, 0.5] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.2 });
      animate(".line-3", { opacity: [0.5, 1, 0.5] }, { duration: 1, repeat: Infinity, ease: "easeInOut", delay: 0.4 });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      animate(".line-1", { pathLength: [0, 1] }, { duration: 0.2, ease: "easeOut" });
      animate(".line-2", { pathLength: [0, 1] }, { duration: 0.25, ease: "easeOut", delay: 0.1 });
      await animate(".line-3", { pathLength: [0, 1] }, { duration: 0.25, ease: "easeOut", delay: 0.2 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".line-1, .line-2, .line-3", { opacity: 1, pathLength: 1 }, { duration: 0.2 });
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
        <motion.path d="M6 22a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h8a2.4 2.4 0 0 1 1.704.706l3.588 3.588A2.4 2.4 0 0 1 20 8v12a2 2 0 0 1-2 2z" className="sheet" />
        <motion.path d="M14 2v5a1 1 0 0 0 1 1h5" className="sheet" />
        <motion.path d="M10 9H8" className="line line-1" />
        <motion.path d="M16 13H8" className="line line-2" />
        <motion.path d="M16 17H8" className="line line-3" />
      </motion.svg>
    );
  }
);

FileText.displayName = "FileText";
export default FileText;
