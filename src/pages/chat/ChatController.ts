import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { avatarBasePath } from '@constants';
import { api } from '@modules/system/api';
import { Socket } from '@modules/system/api/Socket';
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
  socket?: Socket;

  async setChats() {
    const chatsRes = await api.getChats();

    if (chatsRes.status === 200) {
      const chats = JSON.parse(chatsRes.responseText);
      const currentUserData = (store.getState() as IStoreState)?.user?.userData;

      if (!currentUserData) {
        console.error('something went wrong');

        return;
      }

      const currentUserId = currentUserData.id;

      for (const chat of chats) {
        console.log(chat);
        const { id, last_message, unread_count } = chat;
        chat.message = last_message?.content || '';
        chat.date = last_message?.time;
        chat.numberNewMessages = unread_count;

        chat.isUserMessage =
          last_message?.user?.login === currentUserData.login;

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
      ...((store.getState() as IStoreState)?.user?.messages || []),
    ];

    store.set('user.messages', updatedMessages);
    handleProps?.onSuccess?.();

    return id;
  }

  async connectToSocket(chatId: string) {
    try {
      const userId = (store.getState() as IStoreState)?.user?.userData?.id;

      if (!userId) {
        console.error('Something went wrong');

        return;
      }

      const tokenRes = await api.getToken(chatId);

      if (tokenRes.status !== 200) {
        console.error('Something went wrong');

        return;
      }

      const socket = new Socket();
      socket.setConnection({
        chatId,
        userId,
        token: JSON.parse(tokenRes.responseText).token,
      });
      this.socket = socket;
    } catch (e) {
      console.error('Something went wrong');
    }
  }

  async addUserByLogin(userLogin: string, handleProps: ISearchHandleProps) {
    try {
      if (!userLogin.length) {
        handleProps.onEmptyValue();

        return;
      }

      if (
        ((store.getState() as IStoreState).user?.users || []).find(
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

  sendMessage(message: string) {
    if (!this.socket) {
      return;
    }

    this.socket.sendMessage(message);
  }

  async deleteChat(id: string) {
    try {
      const deleteChatRes = await api.deleteChat(id);

      if (deleteChatRes.status !== 200) {
        console.error('something went wrong');

        return;
      }

      const updatedMessages = (
        (store.getState() as IStoreState)?.user?.messages || []
      ).filter((it) => it.id !== id);

      store.set('user.messages', updatedMessages);
      store.set('user.activeChat', null);
      store.set('user.chatMessages', null);
    } catch (e) {
      console.error(e);
    }
  }
}
