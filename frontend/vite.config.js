import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 443, // Match the port in your NGINX proxy
    proxy: {
      '/api': {
        target: `https://fordrunners.club`,
        secure: true
      },
      // WebSocket proxy
      '/ws': {
        target: 'wss://fordrunners.club:5000',
        ws: true,
        secure: true
      }
    },
    host: '0.0.0.0',
    allowedHosts: ['fordrunners.club']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
