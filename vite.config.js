import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue()],
  base: "./",
  server: {
    host: true,
    port: 5000,
    strictPort: true,
    hmr: false,
  },
});
