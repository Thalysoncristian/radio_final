import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    host: '0.0.0.0', // 🔧 Permite acesso de outros dispositivos na rede
  },
  build: {
    minify: 'esbuild',
    cssCodeSplit: true,
    sourcemap: false,
  },
  esbuild: {
    drop: ['console'],
  },
})
