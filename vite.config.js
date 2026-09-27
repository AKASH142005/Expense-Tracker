import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  
  // vite.config.js
  server: {
    proxy: {
      "/api": {
        target: "https://appsail-50046310854.development.catalystappsail.in",
        changeOrigin: true,
        secure: true,
      },
    },
  },
})
