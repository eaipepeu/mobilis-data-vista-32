import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  base: '/mobilis-data-vista-32/', // Adicione esta linha
  plugins: [react()],
})

// https://vitejs.dev/config/
export default defineConfig(({ base: '/mobilis-data-vista-32/', }) => ({
  server: {
    host: "::",
    port: 8080,
  },
  plugins: [
    react(),
    mode === 'development' &&
    componentTagger(),
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
}));
