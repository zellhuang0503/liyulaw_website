import { defineConfig } from "vite"
import react from "@vitejs/plugin-react"

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true
  },
  build: {
    outDir: "dist",
    sourcemap: false,
    minify: true,
    chunkSizeWarningLimit: 1600,
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'ui': ['framer-motion', '@heroicons/react'],
          'markdown': ['react-markdown']
        }
      },
      // 確保外部依賴項正確處理
      external: []
    }
  },
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  // 優化依賴項處理
  optimizeDeps: {
    include: ['react', 'react-dom', 'react-router-dom', 'framer-motion', '@heroicons/react', 'react-markdown']
  }
})
