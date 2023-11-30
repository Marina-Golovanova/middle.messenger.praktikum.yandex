import { defineConfig, Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import checker from 'vite-plugin-checker';
import path from 'path';

export default defineConfig({
  plugins: [
    handlebars() as Plugin,
    checker({
      typescript: true,
    }),
  ],
  css: {
    postcss: {
      plugins: [postcssImport(), postcssNested],
    },
  },
  resolve: {
    alias: {
      '@modules': path.resolve(__dirname, 'src/modules'),
      '@components': path.resolve(__dirname, 'src/components'),
      '@layouts': path.resolve(__dirname, 'src/layouts'),
      '@pages': path.resolve(__dirname, 'src/pages'),
      '@utils': path.resolve(__dirname, 'src/utils'),
      '@app-router': path.resolve(__dirname, 'src/app-router'),
      '@types': path.resolve(__dirname, 'src/types.ts'),
    },
  },
  // server: {
  //   port: 3000,
  //   proxy: {
  //     'https://ya-praktikum.tech/api/v2': {
  //       target: 'http://localhost:5173',
  //       changeOrigin: true,
  //     },
  //   },
  // },
});
