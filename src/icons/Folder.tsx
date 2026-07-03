import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Folder = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".flap", { rotateX: [0, 20, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".folder", { y: [0, -1, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      await animate(".folder", { scale: 1.1 }, { duration: 0.1 });
      await animate(".flap", { rotateX: 45 }, { duration: 0.15 });
      animate(".flap", { rotateX: 0 }, { duration: 0.3, type: "spring", bounce: 0.6 });
      await animate(".folder", { scale: 1 }, { duration: 0.3, type: "spring", bounce: 0.6 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".folder", { y: 0, scale: 1 }, { duration: 0.2 });
      animate(".flap", { rotateX: 0 }, { duration: 0.2 });
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
        style={{ overflow: "visible", perspective: "100px" }}
        whileTap={{ scale: 0.95 }}
      >
        <motion.g className="folder" style={{ transformOrigin: "12px 12px" }}>
           <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.69-.9L9.6 3.9A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"></path>
           <motion.path className="flap" style={{ transformOrigin: "12px 8px" }} d="M22 8H2v10a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8z" fill="transparent" stroke="transparent"></motion.path>
        </motion.g>
      </motion.svg>
    );
  }
);

Folder.displayName = "Folder";
export default Folder;
