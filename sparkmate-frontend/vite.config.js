import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/Fluttr-Find-your-vibe/',
  plugins: [react(), tailwindcss()],
  build: {
    outDir: 'docs'
  }
})
