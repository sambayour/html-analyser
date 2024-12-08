import { fileURLToPath } from "node:url";
import { defineConfig } from "vite";
import { configDefaults } from "vitest/config";
import vuePlugin from "@vitejs/plugin-vue";

export default defineConfig({
  plugins: [vuePlugin()],
  test: {
    environment: "jsdom",
    exclude: [...configDefaults.exclude, "e2e/*"],
    root: fileURLToPath(new URL("./", import.meta.url)),
    transformMode: {
      web: [/\.[jt]sx$/],
    },
    coverage: {
      provider: "v8",
      reporter: ["text", "json", "html"],
    },
  },
});
