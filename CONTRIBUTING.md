# Contributing to FlowIcons 🌊

We love your input! We want to make contributing to FlowIcons as easy and transparent as possible. First off, thank you for considering contributing to Flowicons! It's people like you that make Flowicons such a great tool for the community.

## The "Coca-Cola Standard" 🥤

We aim for animations that feel **premium, organic, and fluid**. They should trigger joy and feel distinct.

- **Micro-interactions matter**: Icons shouldn't just exist; they should react.
- **Hover vs. Click**: 
  - **Hover**: Should be an invitation. A looping, continuous motion (like a heartbeat, a spin, or a wave) that says "I am active."
  - **Click**: Should be the *result*. A decisive, one-shot animation (like a launch, a flash, or a check draw) that says "I have done what you asked."
- **Performance**: Use `motion/react` for optimized bundle size. Avoid huge dependencies.

## How Can I Contribute?

### Adding New Icons
1. **Design the Icon**: Create a new React component for the icon in `src/icons/`.
2. **Animation**: Use `motion` for animations. Ensure the icon follows the style and structure of existing icons.
3. **Export**: Export the new icon from `src/index.ts`.
4. **Types**: Ensure proper types are used (refer to `src/core/types.ts`).

### Reporting Bugs
If you find a bug, please open an issue on GitHub with a clear description and steps to reproduce.

### Pull Requests
1. Fork the repo and create your branch from `main`.
2. Make sure your code follows the existing style.
3. Ensure the project builds successfully with `npm run build`.
4. Open a pull request with a descriptive title and summary of changes.

## How to Add a New Icon

### 1. Template
Copy this template for any new icon. It handles all the boilerplate for `ref`, `loading`, and types.

```tsx
import { forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
import { motion, useAnimate } from "motion/react";
import type { AnimatedIconHandle, AnimatedIconProps } from "../core/types";

const MyIcon = forwardRef<AnimatedIconHandle, AnimatedIconProps>(
  (
    { size = 24, color = "currentColor", strokeWidth = 2, className = "", loading = false },
    ref
  ) => {
    const [scope, animate] = useAnimate();

    // 1. Loading Animation (Looping)
    const loadingAnim = useCallback(() => {
      animate(
        ".my-element",
        { opacity: [0.5, 1, 0.5] },
        { duration: 2, repeat: Infinity }
      );
    }, [animate]);

    // 2. Hover Animation (Looping / Continuous)
    const hoverAnim = useCallback(() => {
        animate(
            ".my-element",
            { scale: [1, 1.1, 1] },
            { duration: 0.8, repeat: Infinity, ease: "easeInOut" }
        );
    }, [animate]);

    // 3. Click/Action Animation (One-Shot, Punchy)
    const clickAnim = useCallback(async () => {
      await animate(".my-element", { scale: 1.5 }, { duration: 0.2 });
      await animate(".my-element", { scale: 1 }, { duration: 0.2 });
    }, [animate]);

    // 4. Stop/Reset
    const stop = useCallback(() => {
      animate(".my-element", { scale: 1, opacity: 1 }, { duration: 0.2 });
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
        <motion.path d="..." className="my-element" />
      </motion.svg>
    );
  }
);

MyIcon.displayName = "MyIcon";
export default MyIcon;
```

### 2. Checklist
- [ ] **Export it**: Add your export to `src/index.ts`.
- [ ] **Test it**: Add it to `playground/src/App.tsx` and run `npm run dev` to see it in action.
- [ ] **Verify Colors**: Ensure `stroke={color}` or `fill={color}` is correctly applied.

## Development Setup

1. Clone the repository.
2. Install dependencies: `npm install`.
3. Start the build in watch mode: `npm run build -- --watch` or simply use the playground for live feedback.
4. Open the playground to test your changes: `cd playground && npm install && npm run dev`.

## Pull Requests Check
- Keep PRs focused.
- Include a description of the animation (e.g., "Hover: Wiggles, Click: Explodes").
- Ensure no lint/build errors (`npm run build`).

## License

By contributing, you agree that your contributions will be licensed under its MIT License.

Happy animating! 🎨

