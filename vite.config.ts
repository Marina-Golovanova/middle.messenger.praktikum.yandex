import { defineConfig, Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: [
        './src/components/button',
        './src/components/input',
        './src/components/form-layout',
        './src/components/error',
        './src/pages/authorization/modules/login',
        './src/pages/registration/modules/registration-form',
        './src/layouts/centred-layout',
      ],
      context: {
        loginFields: [
          { label: 'login', placeholder: 'example@yandex.ru' },
          { label: 'password' },
        ],
        registrationFields: [
          { label: 'first name', placeholder: 'Anna' },
          { label: 'last name', placeholder: 'Smith' },
          { label: 'email', placeholder: 'example@yandex.com' },
          { label: 'password' },
          { label: 'repeat password' },
          { label: 'phone', placeholder: '+7-999-888-77-66' },
        ],
      },
    }) as Plugin,
  ],
  css: {
    postcss: {
      plugins: [postcssImport(), postcssNested],
    },
  },
});
