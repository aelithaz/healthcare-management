import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import path from 'path'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      // map “axios” imports to the real ESM file
      'axios': path.resolve(__dirname, 'node_modules/axios/dist/esm/axios.js'),
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    proxy: { '/api': 'http://localhost:3001' },
  },
  optimizeDeps: {
    include: ['axios'],
  },
  build: {
    commonjsOptions: {
      transformMixedEsModules: true,
      include: [/node_modules/],
    },
  },
})
