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
        './src/components/textarea',
        './src/pages/authorization/modules/login-form',
        './src/pages/registration/modules/registration-form',
        './src/pages/profile/modules/user-form',
        './src/pages/profile/modules/user-form-edit',
        './src/pages/profile/modules/change-password-form',
        './src/pages/chat/modules/message-list-header',
        './src/pages/chat/modules/message-in-list',
        './src/pages/chat/modules/chat-block',
        './src/pages/chat/modules/chat-block/modules/chat-block-header',
        './src/pages/chat/modules/chat-block/modules/message-area',
        './src/pages/chat/modules/chat-block/modules/message-in-chat',
        './src/layouts/centred-layout',
        './src/layouts/main-layout',
        './src/layouts/main-content-layout',
        './src/layouts/profile-layout',
      ],
      context: {
        loginFields: [
          { label: 'login', placeholder: 'example@yandex.ru', name: 'login' },
          { label: 'password', name: 'password' },
        ],
        registrationFields: [
          {
            label: 'first name',
            placeholder: 'Anna',
            name: 'first_name',
          },
          {
            label: 'second name',
            placeholder: 'Smith',
            name: 'second_name',
          },
          {
            label: 'email',
            placeholder: 'example@yandex.com',
            name: 'email',
          },
          { label: 'password', name: 'password' },
          { label: 'repeat password', name: 'repeatPassword' },
          {
            label: 'phone',
            placeholder: '+7-999-888-77-66',
            name: 'phone',
          },
        ],
        userFields: [
          { label: 'first name', value: 'Ivan', name: 'first_name' },
          { label: 'second name', value: 'Ivanov', name: 'second_name' },
          {
            label: 'display name',
            value: 'ivanko',
            name: 'display_name',
          },
          { label: 'login', value: 'ivanko545', name: 'login' },
          { label: 'email', value: 'ivan@yandex.ru', name: 'email' },
          { label: 'phone', value: '+7-999-888-77-66', name: 'phone' },
        ],
        changePasswordFields: [
          { label: 'old password', name: 'oldPassword' },
          { label: 'new password', name: 'newPassword' },
          { label: 'repeat password', name: 'repeatPassword' },
        ],
        messageList: [
          {
            chatName: 'Андрей',
            message: 'Изображение',
            isGroup: false,
            date: '10:49',
            numberNewMessages: 2,
            isUserMessage: false,
            isInfoMessage: true,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Киноклуб',
            message: 'стикер',
            isGroup: true,
            date: '9:08',
            numberNewMessages: 0,
            isUserMessage: true,
            isInfoMessage: true,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Илья',
            message:
              'Друзья, у меня для вас особенный выпуск новостей! Сегодня произошел вот такой случай.',
            isGroup: false,
            date: '6:03',
            numberNewMessages: 2,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Вадим',
            message: 'Круто!',
            isGroup: false,
            isActiveChat: true,
            date: '12:00',
            isUserMessage: true,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Фестиваль',
            chatUserName: 'Анастасия',
            message: 'Было круто',
            isGroup: true,
            date: 'Fr',
            numberNewMessages: 42355,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'тет-а-теты',
            message: 'Анна покинула чат',
            isGroup: true,
            date: 'Th',
            numberNewMessages: 2,
            isUserMessage: false,
            isInfoMessage: true,
            imageSrc: '/avatar.png',
          },
          {
            chatName: '1, 2, 3',
            message:
              'Миллионы россиян ежедневно проводят десятки часов выгуливая своих собак',
            isGroup: false,
            date: 'We',
            numberNewMessages: 1,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
          {
            chatName: 'Design Destroyer',
            message:
              'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
            isGroup: false,
            date: 'Mo',
            numberNewMessages: 4,
            isUserMessage: false,
            isInfoMessage: false,
            imageSrc: '/avatar.png',
          },
        ],
        exampleDialog: {
          chatName: 'Вадим',
          imageSrc: '/avatar.png',
          messages: [
            {
              message: 'Круто!',
              isUserMessage: true,
              time: '12:00',
              isRead: true,
            },
            {
              isUserMessage: false,
              time: '11:56',
              isRead: true,
              fileType: 'img',
              fileSrc: '/example-image.jpeg',
            },
            {
              message:
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
              isUserMessage: false,
              time: '11:55',
              isRead: true,
            },
            {
              message: 'Круто!',
              isUserMessage: true,
              time: '10:00',
              isRead: true,
            },
            {
              isUserMessage: false,
              time: '09:56',
              isRead: true,
              fileType: 'img',
              fileSrc: '/example-image.jpeg',
            },
            {
              message:
                'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
              isUserMessage: false,
              time: '09:55',
              isRead: true,
            },
          ],
        },
      },
    }) as Plugin,
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
