export interface AnimatedIconProps {
    size?: number;
    color?: string;
    strokeWidth?: number;
    className?: string;
    loading?: boolean;
}

export interface AnimatedIconHandle {
    play: () => void;
    stop: () => void;
}
