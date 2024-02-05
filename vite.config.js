import {defineConfig} from "vite";
import vue from "@vitejs/plugin-vue";
import {fileURLToPath, URL} from 'node:url'
import AutoImport from 'unplugin-auto-import/vite'
import Components from 'unplugin-vue-components/vite'
import {ElementPlusResolver} from 'unplugin-vue-components/resolvers'
// import { appConfigDir } from "@tauri-apps/api/path";
// import { getPluginDir } from "./src/utils/dir.js";


// https://vitejs.dev/config/
export default defineConfig(async () => ({
  
  plugins: [
    vue(),
    AutoImport({
      resolvers: [ElementPlusResolver()],
    }),
    Components({
      resolvers: [ElementPlusResolver()],
    }),
  ],
  //静态资源服务的文件夹
  publicDir: "public",
  base: './',
  resolve: {
    // 配置路径别名
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      "assets": "./src/assets",
      "components": "./src/components",
      "views": "./src/views",
      "utils": "./src/utils",
      "styles": "./src/styles",
      // "plugins": getPluginDir(),

    },
    // 导入时想要省略的扩展名列表
    extensions: ['.mjs', '.js', '.ts', '.jsx', '.tsx', '.json'],
  },


  // Vite options tailored for Tauri development and only applied in `tauri dev` or `tauri build`
  //
  // 1. prevent vite from obscuring rust errors
  clearScreen: true,
  // 2. tauri expects a fixed port, fail if that port is not available
  server: {
    port: 1420,
    strictPort: true,
    watch: {
      // 3. tell vite to ignore watching `src-tauri`
      ignored: ["**/src-tauri/**"],
    },
    // cors: true,//为开发服务器配置 CORS , 默认启用并允许任何源
    // https: false,//是否支持http2 如果配置成true 会打开https://localhost:3001/xxx;
    // open: false,//是否自动打开浏览器
  },
}));
