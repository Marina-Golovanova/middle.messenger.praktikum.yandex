import { Button } from '@components/button';
import { ButtonIcon } from '@components/button-icon';
import { plusIconTemplate } from '@components/icons-templates/plusIconTemplate';
import { LabelInput } from '@components/label-input';
import { Popup } from '@components/popup/Popup';
import { Sidebar } from '@components/sidebar';
import { SimpleElement } from '@components/simple-element';
import { MainLayout } from '@layouts/main-layout/MainLayout';
import { PopupLayout } from '@layouts/popup-layout';
import { api } from '@modules/system/api';
import { Block } from '@modules/system/block';
import { exampleDialog } from './data';
import { ChatBlock } from './modules/chat-block';
import { MessageInList } from './modules/message-in-list';
import { messageListHeader } from './modules/message-list-header';

const messageListElement = new SimpleElement({
  tagName: 'ul',
  attributes: {
    className: 'chat__sidebar__message-list',
  },
  children: [],
});

const messageListPromise = api.getChats();

messageListPromise.then((res) => {
  if (res.status === 200) {
    messageListElement.addChildren([new MessageInList({})]);
  }
});

const createChatPopup: Block = new PopupLayout({
  children: [
    new Popup({
      props: {
        header: new LabelInput({
          attributes: { className: 'input--stretched' },
          props: { label: 'Type chat name' },
        }),
        footer: new SimpleElement({
          attributes: {
            className: 'chat__create-popup__controls',
          },
          children: [
            new Button({
              props: { text: 'cancel' },
              attributes: { className: 'button--dark button--s' },
              listeners: [
                {
                  event: 'click',
                  callback: () => createChatPopup.destroy(),
                },
              ],
            }),

            new Button({
              props: { text: 'create' },
              attributes: { className: 'button--accent button--s' },
            }),
          ],
        }),
      },
    }),
  ],
});

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
              listeners: [
                {
                  event: 'click',
                  callback: () => {
                    chat.addChildren([createChatPopup]);
                  },
                },
              ],
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
