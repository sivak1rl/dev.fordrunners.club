import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Match the port in your NGINX proxy
    proxy: {
      '/api': {
        target: `http://10.10.10.10:5000`,
        changeOrigin: true,
        secure: false
      },
      // WebSocket proxy
      '/ws': {
        target: 'ws://10.10.10.10:5000',
        ws: true
      }
    },
    host: '0.0.0.0',
    allowedHosts: ['10.10.10.10:3000', 'localhost']
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true
  }
})
