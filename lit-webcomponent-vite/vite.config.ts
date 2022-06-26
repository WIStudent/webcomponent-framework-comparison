import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: 'src/my-element.ts',
      name: "litwebcomponentvite",
      formats: ['es', 'iife', 'cjs']
    },
    rollupOptions: {
      external: /^lit/
    }
  }
})
