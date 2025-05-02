import { fileURLToPath, URL } from 'node:url';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueDevTools from 'vite-plugin-vue-devtools';
import svgLoader from 'vite-svg-loader';
import { configDefaults } from 'vitest/config';

// https://vite.dev/config/
export default defineConfig({
  base: '/SnackSnitch',
  plugins: [
    vue(),
    vueDevTools(),
    svgLoader(),
  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
    },
  },
  test: { // Добавляем секцию для Vitest
    globals: true, // Использовать глобальные функции тестов (describe, it, expect)
    environment: 'jsdom', // Эмулируем браузерную среду
    // setupFiles: './src/setupTests.ts', // Опционально: Файл для глобальной настройки тестов
    include: ['src/tests/**/*.test.{ts,js}'],
    exclude: [...configDefaults.exclude, 'e2e/**'], // Исключаем e2e-тесты, если они есть
    coverage: { // Опционально: Отчёты по покрытию кода
      provider: 'istanbul',
      reportsDirectory: 'coverage',
      reporter: ['text', 'json', 'html'],
    },
  },

  server: {
    proxy: {
      '/api': {
        target: 'https://vue-football-proxy.onrender.com',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  }
  
});
