import { defineConfig } from 'vite';

export default defineConfig({
  base: './',
  
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          three: ['three'],
          gsap: ['gsap'],
          tweakpane: ['tweakpane']
        }
      }
    }
  },
  
  // Force proper module resolution
  resolve: {
    alias: {
      '@': '/src'
    }
  },
  
  // Ensure dependencies are properly bundled
  optimizeDeps: {
    include: ['three', 'gsap', 'tweakpane']
  },
  
  // Development server settings
  server: {
    port: 3000,
    open: true
  }
});