/// <reference types="vitest/config" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: "./src/test/vitest-setup.ts",
    coverage: {
      exclude: [
        "src/**/index.ts",
        "src/test/vitest-setup.ts",
        "./eslint.config.js",
        "./vite.config.ts",
        "src/vite-env.d.ts",
        "dist/**",
      ],
    },
  },
});
