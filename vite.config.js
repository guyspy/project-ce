import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  // 更可靠的判斷是否在 Replit 環境中運行的方式
  const isReplit = process.env.REPL_SLUG !== undefined || 
                 process.env.REPL_OWNER !== undefined || 
                 process.env.REPL_ID !== undefined;
  
  return {
    plugins: [vue()],
    base: "./",
    server: {
      host: isReplit ? true : process.env.HOST || 'localhost',
      port: isReplit ? 5000 : parseInt(process.env.PORT || '3000'),
      strictPort: isReplit,
      hmr: isReplit ? false : true,
      allowedHosts: isReplit ? [
        "c898c282-508f-4ad3-b5ac-c9cf6df8d7e5-00-33iky2i7arslk.worf.replit.dev",
        // 您可能還需要添加其他主機
      ] : 'all',
      // 開發時自動打開瀏覽器（本地環境）
      open: !isReplit,
    },
  };
});
