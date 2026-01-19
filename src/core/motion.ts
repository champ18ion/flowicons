export const transition = {
    // Classic spring presets for that "premium" feel
    smooth: {
        type: "spring",
        stiffness: 260,
        damping: 20,
    } as const,
    snappy: {
        type: "spring",
        stiffness: 400,
        damping: 25,
    } as const,
    bouncy: {
        type: "spring",
        stiffness: 600,
        damping: 15, // Low damping = more bounce
    } as const,
    // soft: Fleshy, organic (Heart, User Avatar)
    soft: {
        type: "spring",
        stiffness: 100,
        damping: 10,
        mass: 1,
    } as const,
    // For UI elements entering/exiting
    pop: {
        type: "spring",
        stiffness: 300,
        damping: 15,
    } as const
};



export const variants = {
    hover: {
        scale: 1.1,
        transition: transition.smooth,
    },
    tap: {
        scale: 0.9,
        transition: transition.snappy,
    },
};
