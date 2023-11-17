import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';
import { PORT } from './config/constant';
import { themeVariables } from './config/theme';
import { splitVendorChunkPlugin } from 'vite';
const timestamp = new Date().getTime();

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  return {
    plugins: [react(), splitVendorChunkPlugin()],

    // css
    css: {
      preprocessorOptions: {
        less: {
          javascriptEnabled: true,
          modifyVars: themeVariables,
        },
      },
    },
    server: {
      port: PORT,
    },
    build: {
      rollupOptions: {
        output: {
          // 入口文件名
          entryFileNames: `assets/[name].${timestamp}.js`,
          // 块文件名
          chunkFileNames: `assets/[name]-[hash].${timestamp}.js`,
          // 资源文件名 css 图片等等
          assetFileNames: `assets/[name]-[hash].${timestamp}.[ext]`,
        },
      },
    },
    resolve: {
      alias: [
        { find: /^~/, replacement: path.resolve(__dirname, './') },
        { find: '@', replacement: path.resolve(__dirname, 'src') },
        { find: '@pages', replacement: path.resolve(__dirname, 'src/pages') },
        { find: '@c', replacement: path.resolve(__dirname, 'config') },
      ],
    },
  };
});
