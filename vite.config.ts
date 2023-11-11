import { defineConfig, Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import checker from 'vite-plugin-checker';
import { pages } from './pagesConfig';
import path from 'path';

const pagesInput = {};

pages.forEach((page) => {
  pagesInput[page.name] = page.path;
});

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        ...pagesInput,
      },
    },
  },
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
      '@types': path.resolve(__dirname, 'src/types.ts'),
    },
  },
});
