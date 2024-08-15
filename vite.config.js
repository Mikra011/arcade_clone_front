import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000, // Specify the port for development server
  },
  build: {
    outDir: 'dist', // Directory to output the production build
    sourcemap: true, // Generate source maps for debugging (optional)
    rollupOptions: {
      // Customize Rollup build options here
      input: {
        main: 'index.html', // Specify the entry points for your application
      },
      output: {
        format: 'es', // Specify the output format (e.g., 'es', 'cjs')
      },
    },
  },
});
