import { Sidebar } from '../../components/sidebar';
import { SimpleElement } from '../../components/simple-element';
import { MainLayout } from '../../layouts/main-layout/MainLayout';
import { exampleDialog, messageList } from './data';
import { ChatBlock } from './modules/chat-block';
import { MessageInList } from './modules/message-in-list';
import { messageListHeader } from './modules/message-list-header';

const messages = messageList.map((it) => new MessageInList({ props: it }));

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
            new SimpleElement({
              tagName: 'ul',
              attributes: {
                className: 'chat__sidebar__message-list',
              },
              children: messages,
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
      },
    }),
  ],
});
