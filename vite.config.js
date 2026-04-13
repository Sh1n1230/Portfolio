import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/my-portfolio/',
  define: {
    __BUILD_DATE__: JSON.stringify(new Date().toLocaleDateString('ja-JP'))
  }
})
