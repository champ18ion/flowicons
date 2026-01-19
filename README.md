# FlowIcons 🌊

A high-performance, organic React icon library powered by `motion/react`. Built for developers who care about micro-interactions and premium user experiences.

## 🚀 Why FlowIcons?

Unlike static icon libraries, FlowIcons follow the **"Coca-Cola Standard"**—every icon is designed to feel alive, fluid, and responsive to user intent.

### Three Organic States
- **✨ Hover (Invitation)**: A continuous, subtle motion that says "I'm ready for interaction."
- **⚡ Click (Result)**: A decisive, punchy one-shot animation that confirms an action.
- **🔄 Loading (Progress)**: A seamless looping state that keeps the user engaged during async tasks.

## 📦 Installation

```bash
npm install @champ18ion/flowicons
```

## 🛠️ Usage

### Basic Usage
```tsx
import { Heart } from "@champ18ion/flowicons";

export default function App() {
  return (
    <Heart 
      size={24} 
      color="#f43f5e" 
      onClick={() => console.log("Liked!")}
    />
  );
}
```

### The Loading Differentiator 💎
You can easily toggle a high-quality loading state for any icon. Perfect for buttons, form submissions, and data fetching.

```tsx
import { Rocket } from "@champ18ion/flowicons";
import { useState } from "react";

function SubmitButton() {
  const [isDeploying, setIsDeploying] = useState(false);

  return (
    <button onClick={() => setIsDeploying(true)}>
      <Rocket loading={isDeploying} />
      <span>{isDeploying ? "Launching..." : "Deploy"}</span>
    </button>
  );
}
```

## 🎨 Customization

Every icon supports standard customization props:
- `size`: width and height in pixels.
- `color`: CSS color string.
- `strokeWidth`: Thickness of the paths.
- `loading`: Boolean to toggle the loop animation.
- `className`: For custom Tailwind or CSS styling.

## 🤝 Contributing

We want to build the most "organic" icon library on the web. 
Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for our guide on the "Coca-Cola Standard" of animation and how to add your own icons.

Happy animating! 🎨
