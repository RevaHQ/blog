import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

const components = ['metricscomparison', 'tailwindglobal', 'quoteblock', 'expandable'];

export default defineConfig({
  plugins: [
    react({
      fastRefresh: true,
      include: "**/*.jsx",
      exclude: "/node_modules/**",
    })
  ],
  server: {
    port: 5173,
    cors: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
    hmr: {
      host: 'localhost',
      protocol: 'ws',
      timeout: 120000,
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
        entryFileNames: 'assets/[name].js',
        assetFileNames: 'assets/[name][extname]',
        dir: '../static/js',
        format: 'es',
        inlineDynamicImports: false,
      }
    },
    minify: 'terser',
    outDir: '../static/js',
  }
});
