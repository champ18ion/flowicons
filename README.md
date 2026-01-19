# FlowIcons 🌊

A high-quality, open-source React icon library powered by `motion/react`. 
Designed for "organic" user interfaces where icons feel alive.

## Features
- **Premium Animations**: Every icon has a distinct "Loading" (loop), "Hover" (loop), and "Click" (action) animation.
- **Lightweight**: Built on `motion/react` (Motion One) for minimal bundle size.
- **Controlled & Uncontrolled**: Use strictly as a visual component or control imperative animations via `ref`.

## Installation

```bash
npm install flowicons
```

## Usage

```tsx
import { Heart } from "flowicons";

export default function App() {
  return (
    <Heart 
      size={24} 
      color="red" 
      onClick={() => console.log("Liked!")}
    />
  );
}
```

## 🤝 Contributing

We want to build the most "organic" icon library on the web. 
Check out [CONTRIBUTING.md](./CONTRIBUTING.md) for our guide on the "Coca-Cola Standard" of animation and how to add new icons.
