import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Coffee = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // Loading: Constant Steam
    const steaming = useCallback(() => {
      animate(
        ".steam",
        { y: [-2, -4], opacity: [0.6, 0] },
        { duration: 1, repeat: Infinity, ease: "linear", repeatDelay: 0.2 }
      );
    }, [animate]);

    // Hover: Rising Steam (One-shot)
    const hoverSteam = useCallback(() => {
      animate(".steam", { y: -3, opacity: [1, 0.5, 0] }, { duration: 0.6, ease: "easeOut" });
    }, [animate]);

    // Click: Sip/Tilt
    const playSip = useCallback(async () => {
        // Tilt cup
        await animate(".cup", { rotate: 15, x: 1 }, { duration: 0.2 });
        // Reset
        animate(".cup", { rotate: 0, x: 0 }, { type: "spring", bounce: 0.4 });
    }, [animate]);

    const stop = useCallback(() => {
        animate(".steam", { y: 0, opacity: 1 }, { duration: 0.2 });
        animate(".cup", { rotate: 0, x: 0 }, { duration: 0.2 });
    }, [animate]);

    useImperativeHandle(ref, () => ({
      play: playSip,
      stop: stop,
    }));

    useEffect(() => {
      if (loading) steaming();
      else stop();
    }, [loading, steaming, stop]);

    return (
      <motion.svg
        ref={scope}
        onMouseEnter={() => !loading && hoverSteam()}
        onMouseLeave={() => !loading && stop()}
        onClick={() => !loading && playSip()}
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
        
        <motion.path className="steam" d="M6 2v3" style={{ opacity: loading ? 0 : 1 }} />
        <motion.path className="steam" d="M10 2v3" style={{ opacity: loading ? 0 : 1 }} />
        <motion.path className="steam" d="M14 2v3" style={{ opacity: loading ? 0 : 1 }} />

        <motion.g className="cup" style={{ transformOrigin: "bottom center" }}>
            <path d="M16 8a1 1 0 0 1 1 1v8a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V9a1 1 0 0 1 1-1h14a4 4 0 1 1 0 8h-1" />
        </motion.g>
      </motion.svg>
    );
  }
);

Coffee.displayName = "Coffee";
export default Coffee;
