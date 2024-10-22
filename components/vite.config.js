import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const components = ['metricscomparison'];

export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws'
    },
  },
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