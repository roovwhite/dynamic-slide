import path from 'node:path'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// base must match the GitHub Pages repo name
export default defineConfig({
  base: '/dynamic-slide/',
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(import.meta.dirname, './src'),
    },
  },
})
