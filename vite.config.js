import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import tailwindcss from '@tailwindcss/vite'
import vueDevTools from 'vite-plugin-vue-devtools'



// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  server: {
    proxy: {
      "/api": {
        
        target: "https://bizethio-backend-production-4c6c.up.railway.app/",
        changeOrigin: true,
      },
    },
  },
  base: process.env.NODE_ENV === 'production'
    ? '/BIZEthio-frontend/'
    : '/',
})

