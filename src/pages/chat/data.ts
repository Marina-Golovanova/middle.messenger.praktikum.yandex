import { IDialog, IMessageInListProps } from './types';

export const messageList: IMessageInListProps[] = [
  {
    chatName: 'Андрей',
    message: 'Изображение',
    date: '10:49',
    numberNewMessages: 2,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Киноклуб',
    message: 'стикер',
    date: '9:08',
    numberNewMessages: 0,
    isUserMessage: true,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Илья',
    message:
      'Друзья, у меня для вас особенный выпуск новостей! Сегодня произошел вот такой случай.',
    date: '6:03',
    numberNewMessages: 2,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Вадим',
    message: 'Круто!',
    isActiveChat: true,
    date: '12:00',
    isUserMessage: true,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Фестиваль',
    chatUserName: 'Анастасия',
    message: 'Было круто',
    date: 'Fr',
    numberNewMessages: 42355,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'тет-а-теты',
    message: 'Анна покинула чат',
    date: 'Th',
    numberNewMessages: 2,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: '1, 2, 3',
    message:
      'Миллионы россиян ежедневно проводят десятки часов выгуливая своих собак',
    date: 'We',
    numberNewMessages: 1,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
  {
    chatName: 'Design Destroyer',
    message:
      'В 2008 году художник Jon Rafman  начал собирать свою новую коллекцию',
    date: 'Mo',
    numberNewMessages: 4,
    isUserMessage: false,
    imageSrc: '/avatar.png',
  },
];

export const exampleDialog: IDialog = {
  chatName: 'Вадим',
  imageSrc: '/avatar.png',
  messages: [
    {
      content: 'Круто!',
      contentType: 'text',
      isUserMessage: true,
      time: '12:00',
      isRead: true,
    },
    {
      isUserMessage: false,
      time: '11:56',
      isRead: true,
      contentType: 'image',
      content: '/example-image.jpeg',
    },
    {
      content:
        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      contentType: 'text',
      isUserMessage: false,
      time: '11:55',
      isRead: true,
    },
    {
      content: 'Круто!',
      contentType: 'text',
      isUserMessage: true,
      time: '10:00',
      isRead: true,
    },
    {
      isUserMessage: false,
      time: '09:56',
      isRead: true,
      contentType: 'image',
      content: '/example-image.jpeg',
    },
    {
      content:
        'Привет! Смотри, тут всплыл интересный кусок лунной космической истории — НАСА в какой-то момент попросила Хассельблад адаптировать модель SWC для полетов на Луну. Сейчас мы все знаем что астронавты летали с моделью 500 EL — и к слову говоря, все тушки этих камер все еще находятся на поверхности Луны, так как астронавты с собой забрали только кассеты с пленкой. Хассельблад в итоге адаптировал SWC для космоса, но что-то пошло не так и на ракету они так никогда и не попали. Всего их было произведено 25 штук, одну из них недавно продали на аукционе за 45000 евро.',
      contentType: 'text',
      isUserMessage: false,
      time: '09:55',
      isRead: true,
    },
  ],
};
