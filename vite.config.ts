import react from "@vitejs/plugin-react";
import graphqlLoader from "vite-plugin-graphql-loader";
import { defineConfig } from "vitest/config";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), graphqlLoader()],
  test: {
    globals: true,
    environment: "jsdom",
    setupFiles: ["src/__tests__/setup.ts"],
  },
});
