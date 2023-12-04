import { Button } from '@components/button';
import { ButtonIcon } from '@components/button-icon';
import { plusIconTemplate } from '@components/icons-templates/plusIconTemplate';
import { LabelInput } from '@components/label-input';
import { Popup } from '@components/popup/Popup';
import { Sidebar } from '@components/sidebar';
import { SimpleElement } from '@components/simple-element';
import { MainLayout } from '@layouts/main-layout/MainLayout';
import { PopupLayout } from '@layouts/popup-layout';
import { Block } from '@modules/system/block';
import { store } from '@modules/system/store/Store';
import { IStoreState } from '@types';
import { exampleDialog } from './data';
import { ChatBlock } from './modules/chat-block';
import { messageListConnector } from './modules/message-list';
import { messageListHeader } from './modules/message-list-header';
import { MessageListController } from './modules/message-list/MessageListController';

const messageListElement = new messageListConnector({
  tagName: 'ul',
  props: {
    messages: (store.getState() as IStoreState)?.user?.messages || [],
  },
});

const newChatTitleInput = new LabelInput({
  attributes: { className: 'input--stretched' },
  props: { label: 'Type chat name' },
  listeners: [
    {
      event: 'blur',
      callback: (e) => {
        const target = e.target as HTMLInputElement;
        newChatTitleInput.inputRef.setAttributes({ value: target.value });
      },
    },
  ],
});

const createChatPopup: Block = new PopupLayout({
  children: [
    new Popup({
      props: {
        header: newChatTitleInput,
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
              listeners: [
                {
                  event: 'click',
                  callback: () => {
                    const title =
                      newChatTitleInput.inputRef.attributes?.value || '';

                    const messageListController = new MessageListController();
                    messageListController.createChat(title, {
                      onSuccess: () => {
                        newChatTitleInput.inputRef.setAttributes({ value: '' });
                        createChatPopup.destroy();
                      },
                      onError: () => console.error('Something went wrong'),
                    });
                  },
                },
              ],
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
