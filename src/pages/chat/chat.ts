import { Button } from '@components/button';
import { ButtonIcon } from '@components/button-icon';
import { plusIconTemplate } from '@components/icons-templates/plusIconTemplate';
import { LabelInput } from '@components/label-input';
import { Popup } from '@components/popup/Popup';
import { Sidebar } from '@components/sidebar';
import { SimpleElement } from '@components/simple-element';
import { avatarDefaultUrl } from '@constants';
import { MainLayout } from '@layouts/main-layout/MainLayout';
import { PopupLayout } from '@layouts/popup-layout';
import { Block } from '@modules/system/block';
import { store } from '@modules/system/store/Store';
import { IComponentProps, IStoreState } from '@types';
import { ChatController } from './ChatController';
import { ChatBlock } from './modules/chat-block';
import { messageListConnector } from './modules/message-list';
import { MessageListHeader } from './modules/message-list-header';

const chatController = new ChatController();

const chatBlock = new ChatBlock({});

const emptyChatBlock = new SimpleElement({
  props: { text: 'Select a chat to start a conversation' },
  attributes: { className: 'chat__chat-block__empty' },
});

const messageListElement = new messageListConnector({
  tagName: 'ul',
  props: {
    messages: (store.getState() as IStoreState)?.user?.messages || [],
    onMessageClick: (id: string) => {
      if (id === (store.getState() as IStoreState)?.user?.activeChatId) {
        const currentChat = (
          store.getState() as IStoreState
        )?.user?.messages?.find((it) => it.id === id);

        emptyChatBlock.hide();
        chatBlock.setProps({
          imgSrc: currentChat?.avatar || avatarDefaultUrl,
          chatName: currentChat?.title || '',
          messages: [],
          onSendMessage: (message) => {
            if (message.length) {
              console.log(message);
            }
          },
        });
        chatBlock.show();
      }
    },
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

                    chatController.createChat(title, {
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

const userSearchPopupInput = new LabelInput({
  attributes: { className: 'input--stretched' },
  props: { label: 'Type user login' },
  listeners: [
    {
      event: 'blur',
      callback: (e) => {
        const target = e.target as HTMLInputElement;
        userSearchPopupInput.inputRef.setAttributes({ value: target.value });
      },
    },
  ],
});

const userSearchPopup: Block = new PopupLayout({
  children: [
    new Popup({
      props: {
        header: userSearchPopupInput,
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
                  callback: () => userSearchPopup.destroy(),
                },
              ],
            }),

            new Button({
              props: { text: 'search' },
              attributes: { className: 'button--accent button--s' },
              listeners: [
                {
                  event: 'click',
                  callback: () => {
                    const userLogin =
                      userSearchPopupInput.inputRef.attributes?.value || '';

                    chatController.addUserByLogin(userLogin, {
                      onSuccess: () => {
                        userSearchPopupInput.inputRef.setAttributes({
                          value: '',
                        });
                        userSearchPopup.destroy();
                      },
                      onUserAbsent: () => console.error('User absents'),
                      onError: () => console.error('Something went wrong'),
                      onEmptyValue: () => console.log('type valut'),
                      onUserAlreadyExists: () =>
                        console.log('chat already exists'),
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

export class Chat extends MainLayout {
  chatBlock: ChatBlock;
  emptyChatBlock: SimpleElement<HTMLElement>;

  constructor(
    data: IComponentProps<Record<string, never>, Partial<HTMLElement>>,
  ) {
    super({
      ...data,
      children: [
        new Sidebar({
          attributes: { className: 'sidebar--s' },
          children: [
            new SimpleElement({
              attributes: {
                className: 'chat__sidebar__content-layout',
              },
              children: [
                new MessageListHeader({
                  props: {
                    onSearchUser: () => {
                      this.addChildren([userSearchPopup]);
                    },
                  },
                }),
                messageListElement,
                new ButtonIcon({
                  props: {
                    template: plusIconTemplate,
                    iconProps: {
                      className: 'chat__sidebar__create-chat-button__icon',
                      title: 'create new chat',
                    },
                  },
                  attributes: {
                    className: 'chat__sidebar__create-chat-button',
                  },
                  listeners: [
                    {
                      event: 'click',
                      callback: () => {
                        this.addChildren([createChatPopup]);
                      },
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
        chatBlock,
        emptyChatBlock,
      ],
    });

    this.chatBlock = chatBlock;
    this.emptyChatBlock = emptyChatBlock;

    this.chatBlock.hide();
  }
}
