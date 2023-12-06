import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { avatarBasePath } from '@constants';
import { api } from '@modules/system/api';
import { store } from '@modules/system/store/Store';
import { IStoreState, IUserData } from '@types';
import { IMessageInListProps } from './types';

export type ICreateChatHandleProps = {
  onSuccess: () => void;
  onError: () => void;
};

export type ISearchHandleProps = {
  onSuccess: () => void;
  onError: () => void;
  onUserAlreadyExists: () => void;
  onUserAbsent: () => void;
  onEmptyValue: () => void;
};

export class ChatController {
  async setChats() {
    const chatsRes = await api.getChats();

    if (chatsRes.status === 200) {
      const chats = JSON.parse(chatsRes.responseText);
      const currentUserId = (store.getState() as IStoreState).user.userData.id;

      for (const chat of chats) {
        const { id } = chat;

        const chatUsersRes = await api.getChatUsers(id);
        if (chatUsersRes.status === 200) {
          const chatUsers = JSON.parse(chatUsersRes.responseText);

          if (chatUsers.length <= 1) {
            continue;
          }

          const externUsers = chatUsers.filter(
            (user: IUserData) => user.id !== currentUserId,
          );

          const chatName = externUsers
            .map((user: IUserData) => `${user.first_name} ${user.second_name}`)
            .join();

          const chatAvatar = externUsers.map((user: IUserData) => {
            return user.avatar;
          })[0];

          if (!(chat as IMessageInListProps).avatar && chatAvatar) {
            chat.avatar = `${avatarBasePath}${chatAvatar}`;
          }

          chat.title = chatName;
        }
      }

      store.set('user.messages', chats);
    } else {
      appRouter.go(paths.error);
    }
  }

  async createChat(title: string, handleProps?: ICreateChatHandleProps) {
    if (!title.length) {
      console.error('Empty name');

      return;
    }

    const createChatRes = await api.createChat(title);

    if (createChatRes.status !== 200) {
      handleProps?.onError?.();
      return;
    }
    const { id } = JSON.parse(createChatRes.responseText);

    const updatedMessages = [
      { id, title },
      ...(store.getState() as IStoreState).user.messages,
    ];

    store.set('user.messages', updatedMessages);
    handleProps?.onSuccess?.();

    return id;
  }

  async addUserByLogin(userLogin: string, handleProps: ISearchHandleProps) {
    try {
      if (!userLogin.length) {
        handleProps.onEmptyValue();

        return;
      }

      if (
        (store.getState() as IStoreState).user?.users?.find(
          (user) => user.login === userLogin,
        )
      ) {
        handleProps.onUserAlreadyExists();

        return;
      }

      const getUserByLoginRes = await api.getUserByLogin(userLogin);

      if (getUserByLoginRes.status !== 200) {
        handleProps.onError();

        return;
      }

      const users = JSON.parse(getUserByLoginRes.responseText);

      if (!users.length) {
        handleProps.onUserAbsent();

        return;
      }

      const user = users[0] as IUserData;

      store.set(
        'user.users',
        ((store.getState() as IStoreState).user?.users || []).concat([user]),
      );

      const id = await this.createChat(
        `${user.first_name} ${user.second_name}`,
      );

      if (!user.id) {
        return;
      }

      const addUserToChatRes = await api.addUserToChat([user.id], id);

      if (addUserToChatRes.status === 200) {
        handleProps.onSuccess();
      }
    } catch (e) {
      handleProps.onError();
    }
  }
}
