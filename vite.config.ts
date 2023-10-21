import { defineConfig, Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: ['./src/components/button'],
      context: {
        title: 'Hello, world!',
      },
    }) as Plugin,
  ],
  css: {
    postcss: {
      plugins: [postcssImport(), postcssNested],
    },
  },
});
