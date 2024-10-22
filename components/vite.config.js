import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

// Get all directories in src
const components = ['metrics']; // Add new components to this array

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: Object.fromEntries(
        components.map(comp => [
          comp,
          resolve(__dirname, `src/${comp}/index.jsx`)
        ])
      ),
      output: {
        entryFileNames: '[name].js',
        dir: '../static/js',
        format: 'iife'
      }
    },
    minify: 'terser',
    outDir: '../static/js',
  }
});