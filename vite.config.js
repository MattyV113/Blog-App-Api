import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': 'http://localhost:5000',
    },
    build: {
      assetsInlineLimit: '2048',
      outDir: 'build',
      rollupOptions: {
        output: {
          manualChunks(id) {
            if (id.includes('node_modules')) {
              return id
                .toString()
                .split('node_modules/')[1]
                .split('/')[0]
                .toString();
            }
          },
        },
      },
    },
  },
  resolve: {
    alias: {
      './runtimeConfig': './runtimeConfig.browser',
    },
    extensions: ['.js', '.ts', '.jsx', '.css', '.json'],
  },
});
