import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { api } from '@modules/system/api';
import { store } from '@modules/system/store/Store';
import { IStoreState } from '@types';

export type IMessageListHandleProps = {
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
};

export type ICreateChatHandleProps = {
  onSuccess: () => void;
  onError: () => void;
};

export class MessageListController {
  async setChats() {
    const chatsRes = await api.getChats();

    if (chatsRes.status === 200) {
      store.set('user.messages', JSON.parse(chatsRes.responseText));
    } else {
      appRouter.go(paths.error);
    }
  }

  async createChat(title: string, handleProps: ICreateChatHandleProps) {
    if (!title.length) {
      console.error('Empty name');

      return;
    }

    const createChatRes = await api.createChat(title);

    if (createChatRes.status !== 200) {
      handleProps.onError();
      return;
    }
    const { id } = JSON.parse(createChatRes.responseText);

    const updatedMessages = [
      { id, title },
      ...(store.getState() as IStoreState).user.messages,
    ];

    store.set('user.messages', updatedMessages);
    handleProps.onSuccess();
  }
}
