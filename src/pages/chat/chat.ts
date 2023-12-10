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
import { IStoreState } from '@types';
import { ChatController } from './ChatController';
import { chatBlockConnector } from './modules/chat-block';
import { messageListConnector } from './modules/message-list';
import { MessageListHeader } from './modules/message-list-header';
import { UserList } from './modules/user-list';
import { UserSearchPopup } from './modules/user-search-popup/UserSearchPopup';

const chatController = new ChatController();

const handleOnSearchUser = (value: string) => {
  chatController.addUserByLogin(value, {
    onSuccess: () => {
      userSearchPopup.destroy();
    },
    onUserAbsent: () => console.error('User absents'),
    onError: () => console.error('Something went wrong'),
    onEmptyValue: () => console.error('type valut'),
    onUserAlreadyExists: () => console.error('chat already exists'),
  });
};

const handleOnAddUserToChat = (value: string) => {
  chatController.addUserToChatByLogin(value, {
    onSuccess: () => {
      userSearchPopup.destroy();
    },
    onUserAbsent: () => console.error('User absents'),
    onError: () => console.error('Something went wrong'),
    onEmptyValue: () => console.error('type valut'),
    onUserAlreadyExists: () => console.error('chat already exists'),
  });
};

const userSearchPopup = new PopupLayout({
  children: [
    new UserSearchPopup({
      props: {
        onSearch: (value: string) => {
          handleOnSearchUser(value);
        },
        onCancel: () => {
          userSearchPopup.destroy();
        },
      },
    }),
  ],
});

const userAddPopup = new PopupLayout({
  children: [
    new UserSearchPopup({
      props: {
        onSearch: (value: string) => {
          handleOnAddUserToChat(value);
        },
        onCancel: () => {
          userAddPopup.destroy();
        },
      },
    }),
  ],
});

const userListPopupLayout = new PopupLayout({});

const userListPopup = new UserList({
  props: {
    onClose: () => {
      userListPopupLayout.destroy();
    },
    onDeleteUser: (id) => {
      chatController.deleteUserFromChat(id, {
        onSuccess: () => {
          userListPopup.setProps({
            users: (userListPopup?.props?.users || []).filter(
              (user) => user.id !== id,
            ),
          });
        },
        onError: () => {
          console.error('Something went wrong');
        },
      });
    },
  },
});

userListPopupLayout.addChildren([userListPopup]);

const chatBlock = new chatBlockConnector({
  tagName: 'div',
  props: {
    onAddUser: () => {
      chatBlock.addChildren([userAddPopup]);
    },
    onShowUsers: async () => {
      const users = await chatController.getChatUsers();

      chat.addChildren([userListPopupLayout]);

      userListPopup.setProps({ users });
    },
    onChangeChatImage: (file: File) => {
      chatController.changeAvatar(file);
    },
  },
});

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
        chatController.connectToSocket(id);

        const currentChat = (
          store.getState() as IStoreState
        )?.user?.messages?.find((it) => it.id === id);

        emptyChatBlock.hide();

        chatBlock.setProps({
          imgSrc: currentChat?.avatar || avatarDefaultUrl,
          chatName: currentChat?.title || '',
          onSendMessage: (message: string) => {
            if (message.length) {
              chatController.sendMessage(message);
            }
          },
          onDeleteChat: (id: string) => {
            chatController.deleteChat(id);
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
            new MessageListHeader({
              props: {
                onSearchUser: () => {
                  chat.addChildren([userSearchPopup]);
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
                    chat.addChildren([createChatPopup]);
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

chatBlock.hide();
