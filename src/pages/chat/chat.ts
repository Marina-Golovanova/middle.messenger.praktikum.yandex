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
import { MessageList } from './modules/message-list';
import { messageListHeader } from './modules/message-list-header';
import { IMessageInListProps } from './types';

const messageListElement = new MessageList({ props: { messages: [] } });

const messageListPromise = api.getChats();

messageListPromise.then((res) => {
  if (res.status === 200) {
    const messages = JSON.parse(res.responseText);
    messageListElement.setProps({
      messages,
      onMessageClick: (id) => {
        const updatedMessages = messages.map((message: IMessageInListProps) =>
          message.id === id ? { ...message, isActiveChat: true } : message,
        );
        messageListElement.setProps({
          ...messageListElement.props,
          messages: updatedMessages,
        });
        api.getToken(id).then((res) => console.log(res));
      },
    });
  }
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
                    if (!title.length) {
                      console.error('Empty name');

                      return;
                    }

                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    api.createChat(title).then((res: any) => {
                      if (res.status === 200) {
                        const { id } = JSON.parse(res.responseText);
                        const newChat = new MessageInList({
                          props: { id, title },
                        });
                        messageListElement.addChildren([newChat], true);
                        newChatTitleInput.inputRef.setAttributes({ value: '' });
                        createChatPopup.destroy();
                      }
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
