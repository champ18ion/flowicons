import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@champ18ion/flowicons": path.resolve(__dirname, "../src"),
    },
    dedupe: ["react", "react-dom", "framer-motion"],
  },
  server: {
    fs: {
      allow: [path.resolve(__dirname, "..")],
    },
  },
});
