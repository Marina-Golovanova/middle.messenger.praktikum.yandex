import { defineConfig, Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';
import checker from 'vite-plugin-checker';
import { pages } from './pagesConfig';

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
});
