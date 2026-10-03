import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// The compiled UI lives in ./public/assets and is served untouched.
// API calls are proxied to the Django backend.
const backend = process.env.VITE_BACKEND_URL || 'http://127.0.0.1:8000';

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3001,
    proxy: { '/_serverFn': backend, '/api': backend, '/~api': backend },
  },
});
