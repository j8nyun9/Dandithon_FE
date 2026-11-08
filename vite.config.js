// Vite uses this browser when opening the development site.
process.env.BROWSER = 'chrome';
import { defineConfig, loadEnv } from 'vite';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const target = env.DANDI_API_TARGET || `http://127.0.0.1:${process.env.PORT || 3001}`;
  return {
    plugins: [tailwindcss()],
    server: {
      port: 5173,
      open: true,
      proxy: { '/api': { target, changeOrigin: true } },
    },
  };
});

