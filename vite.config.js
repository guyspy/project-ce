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
    allowedHosts: [
      "c898c282-508f-4ad3-b5ac-c9cf6df8d7e5-00-33iky2i7arslk.worf.replit.dev",
      // 您可能還需要添加其他主機
    ],
  },
});
