import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: './src/setupTests.js',
    globals: true,
    env: { VITE_FIREBASE_API_KEY: 'test-key', VITE_FIREBASE_AUTH_DOMAIN: 'test.firebaseapp.com' }
  }
});
