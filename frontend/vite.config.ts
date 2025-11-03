import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue()],
  build: {
    outDir: '../public',
    emptyOutDir: true,
    rollupOptions: {
      external: ['react', 'react-dom']
    }
  },
  optimizeDeps: {
    exclude: ['@fractalwagmi/popup-connection']
  },
  resolve: {
    alias: {
      'react': 'vue',
      'react-dom': 'vue'
    }
  }
})
