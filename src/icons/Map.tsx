import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const Map = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    const loadingAnim = useCallback(() => {
      animate(".fold1", { y: [0, -2, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
      animate(".fold2", { y: [0, 2, 0] }, { duration: 1.2, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const hoverAnim = useCallback(() => {
      animate(".map-group", { scale: [1, 1.05, 1] }, { duration: 1.5, repeat: Infinity, ease: "easeInOut" });
    }, [animate]);

    const clickAnim = useCallback(async () => {
      animate(".fold1", { x: -2, y: -2 }, { duration: 0.1 });
      await animate(".fold2", { x: 2, y: 2 }, { duration: 0.1 });
      animate(".fold1", { x: 0, y: 0 }, { duration: 0.3, type: "spring", bounce: 0.6 });
      await animate(".fold2", { x: 0, y: 0 }, { duration: 0.3, type: "spring", bounce: 0.6 });
    }, [animate]);

    const stop = useCallback(() => {
      animate(".map-group", { scale: 1 }, { duration: 0.2 });
      animate(".fold1", { x: 0, y: 0 }, { duration: 0.2 });
      animate(".fold2", { x: 0, y: 0 }, { duration: 0.2 });
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
        <motion.g className="map-group" style={{ transformOrigin: "12px 12px" }}>
          <path d="M14.106 5.553a2 2 0 0 0 1.788 0l3.659-1.83A1 1 0 0 1 21 4.619v12.764a1 1 0 0 1-.553.894l-4.553 2.277a2 2 0 0 1-1.788 0l-4.212-2.106a2 2 0 0 0-1.788 0l-3.659 1.83A1 1 0 0 1 3 19.381V6.618a1 1 0 0 1 .553-.894l4.553-2.277a2 2 0 0 1 1.788 0z"></path>
          <motion.path className="fold1" d="M15 5.764v15"></motion.path>
          <motion.path className="fold2" d="M9 3.236v15"></motion.path>
        </motion.g>
      </motion.svg>
    );
  }
);

Map.displayName = "Map";
export default Map;
