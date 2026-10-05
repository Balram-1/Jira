import { defineConfig } from "vite";

export default defineConfig({
  resolve: {
    alias: {
      $: "/src",
    },
  },
  esbuild: {
    jsx: "automatic",
  },
});
