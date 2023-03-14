import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import eslint from 'vite-plugin-eslint';


// https://vitejs.dev/config/
export default defineConfig({
  define: {
    'process.env': process.env,
  },
  server: {
    port: 8000,
    watch: {
      ignored: ['!**/node_modules/**'],
      usePolling: true,
    },
  },
  plugins: [
    react(
      {
        include: 'src/*.jsx',
      },
    ),
    eslint(),
  ],
});

