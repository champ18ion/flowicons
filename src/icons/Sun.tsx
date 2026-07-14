import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Sun = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".sun-group", { rotate: 90 }, { duration: 3, repeat: Infinity, ease: "linear" });
      animate(".core", { scale: [1, 1.2, 1] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".sun-group", { rotate: [0, 15, -15, 0] }, { duration: 2, repeat: Infinity, ease: "easeInOut" });
      animate(".rays", { scale: [1, 1.1, 1] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      animate(".core", { scale: 1.3 }, { duration: 0.1 });
      await animate(".rays", { scale: 0.8, opacity: 0 }, { duration: 0.15 });
      animate(".core", { scale: 1 }, { duration: 0.4, type: "spring", bounce: 0.6 });
      await animate(".rays", { scale: 1.2, opacity: 1 }, { duration: 0.15 });
      await animate(".rays", { scale: 1 }, { duration: 0.3, type: "spring", bounce: 0.5 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".sun-group", { rotate: 0 }, { duration: 0.2 });
      animate(".core", { scale: 1 }, { duration: 0.2 });
      animate(".rays", { scale: 1, opacity: 1 }, { duration: 0.2 });
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
        <motion.g className="sun-group" style={{ transformOrigin: "12px 12px" }}>
          <motion.circle className="core" style={{ transformOrigin: "12px 12px" }} cx="12" cy="12" r="4"></motion.circle>
          <motion.g className="rays" style={{ transformOrigin: "12px 12px" }}>
            <path d="M12 2v2"></path>
            <path d="M12 20v2"></path>
            <path d="m4.93 4.93 1.41 1.41"></path>
            <path d="m17.66 17.66 1.41 1.41"></path>
            <path d="M2 12h2"></path>
            <path d="M20 12h2"></path>
            <path d="m6.34 17.66-1.41 1.41"></path>
            <path d="m19.07 4.93-1.41 1.41"></path>
          </motion.g>
        </motion.g>
      </motion.svg>
    );
  }
);

Sun.displayName = "Sun";
export default Sun;
