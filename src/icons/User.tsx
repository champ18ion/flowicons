import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const User = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(".head", { y: [0, -2, 0] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
      animate(".body", { scaleX: [1, 1.05, 1] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
      animate(".head", { rotate: [0, -5, 5, 0] }, { duration: 1, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".head", { y: -4, scale: 1.2 }, { duration: 0.1 });
      await animate(".head", { y: 0, scale: 1 }, { duration: 0.2, type: "spring", bounce: 0.6 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".head", { y: 0, scale: 1, rotate: 0 }, { duration: 0.2 });
      animate(".body", { scaleX: 1 }, { duration: 0.2 });
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
        <motion.path className="body" style={{ transformOrigin: "50% 100%" }} d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></motion.path>
        <motion.circle className="head" style={{ transformOrigin: "50% 25%" }} cx="12" cy="7" r="4"></motion.circle>
      </motion.svg>
    );
  }
);

User.displayName = "User";
export default User;
