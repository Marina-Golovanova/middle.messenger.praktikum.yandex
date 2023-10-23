import { defineConfig, Plugin } from 'vite';
import handlebars from 'vite-plugin-handlebars';
import postcssNested from 'postcss-nested';
import postcssImport from 'postcss-import';

export default defineConfig({
  plugins: [
    handlebars({
      partialDirectory: [
        './src/components/avatar',
        './src/components/button',
        './src/components/button-icon',
        './src/components/input',
        './src/components/form-layout',
        './src/components/error',
        './src/components/sidebar',
        './src/components/icons',
        './src/pages/authorization/modules/login-form',
        './src/pages/registration/modules/registration-form',
        './src/pages/profile/modules/user-form',
        './src/pages/profile/modules/user-form-edit',
        './src/layouts/centred-layout',
        './src/layouts/main-layout',
        './src/layouts/main-content-layout',
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
        userFields: [
          { label: 'first name', value: 'Ivan' },
          { label: 'last name', value: 'Ivanov' },
          { label: 'display name', value: 'ivanko' },
          { label: 'login', value: 'ivanko545' },
          { label: 'email', value: 'ivan@yandex.ru' },
          { label: 'phone', value: '+7-999-888-77-66' },
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
