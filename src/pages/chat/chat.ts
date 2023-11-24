import { ButtonIcon } from '@components/button-icon';
import { plusIconTemplate } from '@components/icons-templates/plusIconTemplate';
import { Sidebar } from '@components/sidebar';
import { SimpleElement } from '@components/simple-element';
import { MainLayout } from '@layouts/main-layout/MainLayout';
// import { api } from '@modules/system/api';
import { exampleDialog, messageList } from './data';
import { ChatBlock } from './modules/chat-block';
import { MessageInList } from './modules/message-in-list';
import { messageListHeader } from './modules/message-list-header';

const messageListElement = new SimpleElement({
  tagName: 'ul',
  attributes: {
    className: 'chat__sidebar__message-list',
  },
  children: messageList.map((it) => new MessageInList({ props: it })),
});

// const messageListPromise = api.getChats();

// messageListPromise.then((res) => {
//   if (res.status === 200) {
//     console.log(res);
//     messageListElement.addChildren([new MessageInList({})]);
//   }
// });

export const chat = new MainLayout({
  children: [
    new Sidebar({
      attributes: { className: 'sidebar--s' },
      children: [
        new SimpleElement({
          attributes: {
            className: 'chat__sidebar__content-layout',
          },
          children: [
            messageListHeader,
            messageListElement,
            new ButtonIcon({
              props: {
                template: plusIconTemplate,
                iconProps: {
                  className: 'chat__sidebar__create-chat-button__icon',
                  title: 'create new chat',
                },
              },
              attributes: { className: 'chat__sidebar__create-chat-button' },
              // props: { text: 'Create chat' },
              // attributes: { className: 'chat__sidebar__create-chat-button' },
            }),
          ],
        }),
      ],
    }),
    new ChatBlock({
      props: {
        imgSrc: exampleDialog.imageSrc,
        chatName: exampleDialog.chatName,
        messages: exampleDialog.messages,
        onSendMessage: (message) => {
          if (message.length) {
            console.log(message);
          }
        },
      },
    }),
  ],
});
