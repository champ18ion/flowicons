import { motion } from "motion/react";
import type { AnimatedIconProps } from "../core/types";

export const FlowIcon = ({
    size = 24,
    color = "currentColor",
    strokeWidth = 2,
    ...props
}: AnimatedIconProps) => {
    return (
        <svg
            width={size}
            height={size}
            viewBox="0 0 24 24"
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            {...props}
        >
            {/* Outer Circle/Ring */}
            <motion.circle
                cx="12"
                cy="12"
                r="10"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 1.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "loop",
                    repeatDelay: 1
                }}
            />

            {/* Flowing Waves/Lines */}
            <motion.path
                d="M8 12C8 12 9.5 9 12 9C14.5 9 16 12 16 12C16 12 14.5 15 12 15C9.5 15 8 12 8 12Z"
                initial={{ pathLength: 0, opacity: 0, scale: 0.8 }}
                animate={{ pathLength: 1, opacity: 1, scale: 1 }}
                transition={{
                    duration: 1,
                    ease: "backOut",
                    repeat: Infinity,
                    repeatType: "reverse",
                    repeatDelay: 0.5
                }}
            />

            <motion.path
                d="M12 7V17"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />

            <motion.path
                d="M7 12H17"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 1 }}
                transition={{
                    duration: 0.8,
                    delay: 0.5,
                    ease: "easeInOut",
                    repeat: Infinity,
                    repeatType: "reverse"
                }}
            />
        </svg>
    );
};

export default FlowIcon;
