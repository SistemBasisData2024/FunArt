import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import dotenv from 'dotenv';

// Load environment variables from .env.local file
dotenv.config({ path: '.env.local' });

// Access your environment variable
// eslint-disable-next-line no-undef
const apiBaseUrl = process.env.VITE_API_URL;

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: apiBaseUrl,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
    port: 4000, // Change this to your preferred port
  },
});