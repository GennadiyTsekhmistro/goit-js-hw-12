import { defineConfig } from "vite";

export default defineConfig({
  root: "src",
  define: {
    global: "window",
  },
});