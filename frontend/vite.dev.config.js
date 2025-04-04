import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Match the port in your NGINX proxy
    proxy: {
      '/api': {
        target: `http://dev.fordrunners.club:8443`,
        changeOrigin: true,
        secure: false
      },
      // WebSocket proxy
      '/ws': {
        target: 'ws://dev.fordrunners.club:8443',
        ws: true
      }
    },
    host: '0.0.0.0',
    allowedHosts: ['dev.fordrunners.club:8443']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
