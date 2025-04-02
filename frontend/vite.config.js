import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 8080, // Match the port in your NGINX proxy
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false
      },
      // WebSocket proxy
      '/ws': {
        target: 'ws://localhost:5000',
        ws: true
      }
    },
    host: '0.0.0.0',
    allowedHosts: ['dev.fordrunners.club', 'localhost']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
