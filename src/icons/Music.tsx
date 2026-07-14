import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Music = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".note1", { y: [0, -2, 0] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut" });
      animate(".note2", { y: [0, -2, 0] }, { duration: 0.8, delay: 0.2, repeat: Infinity, ease: "easeInOut" });
      animate(".beam", { rotate: [0, -2, 2, 0] }, { duration: 0.8, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".note1", { rotate: [0, 10, -10, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
      animate(".note2", { rotate: [0, -10, 10, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      animate(".beam", { y: -4 }, { duration: 0.1 });
      await animate(".note1", { scale: 1.2, y: 2 }, { duration: 0.1 });
      await animate(".note2", { scale: 1.2, y: 2 }, { duration: 0.1 });

      animate(".beam", { y: 0 }, { duration: 0.3, type: "spring", bounce: 0.6 });
      animate(".note1", { scale: 1, y: 0 }, { duration: 0.3, type: "spring", bounce: 0.6 });
      await animate(".note2", { scale: 1, y: 0 }, { duration: 0.3, type: "spring", bounce: 0.6 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".note1", { scale: 1, y: 0, rotate: 0 }, { duration: 0.2 });
      animate(".note2", { scale: 1, y: 0, rotate: 0 }, { duration: 0.2 });
      animate(".beam", { y: 0, rotate: 0 }, { duration: 0.2 });
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
        <motion.path className="beam" style={{ transformOrigin: "15px 5px" }} d="M9 18V5l12-2v13"></motion.path>
        <motion.circle className="note1" style={{ transformOrigin: "6px 18px" }} cx="6" cy="18" r="3"></motion.circle>
        <motion.circle className="note2" style={{ transformOrigin: "18px 16px" }} cx="18" cy="16" r="3"></motion.circle>
      </motion.svg>
    );
  }
);

Music.displayName = "Music";
export default Music;
