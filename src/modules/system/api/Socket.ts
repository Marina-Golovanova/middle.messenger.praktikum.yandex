import { IMessageInChat } from '@pages/chat/types';
import { IStoreState } from '@types';
import { store } from '../store/Store';

export type ISocketProps = {
  chatId: string;
  userId: string;
  token: string;
};

export class Socket {
  socket?: WebSocket;
  chatId?: string;

  setConnection(props: ISocketProps) {
    this.chatId = props.chatId;
    const socket = new WebSocket(
      `wss://ya-praktikum.tech/ws/chats/${props.userId}/${props.chatId}/${props.token}`,
    );

    socket.addEventListener('open', () => {
      console.log('Соединение установлено');

      socket.send(
        JSON.stringify({
          content: '0',
          type: 'get old',
        }),
      );
    });

    socket.addEventListener('close', (event) => {
      if (event.wasClean) {
        console.log('Соединение закрыто чисто');
      } else {
        console.log('Обрыв соединения');
      }

      console.log(`Код: ${event.code} | Причина: ${event.reason}`);
    });

    socket.addEventListener('message', (event) => {
      this.onMessage(event.data);
    });

    socket.addEventListener('error', () => {
      console.log('Something went wrong');
    });

    this.socket = socket;
  }

  onMessage(data: string) {
    const res = JSON.parse(data);

    const currentUserId = (store.getState() as IStoreState)?.user?.userData?.id;

    if (Array.isArray(res)) {
      const messages: IMessageInChat[] = res.map((it) => ({
        isUserMessage: currentUserId === it.user_id,
        isRead: it.is_read,
        content: it.content,
        time: it.time,
        contentType: 'text',
        chatId: it.chat_id,
      }));
      store.set('user.chatMessages', messages);
    } else {
      if (res.type === 'message') {
        const updatedMessages =
          (store.getState() as IStoreState)?.user?.chatMessages || [];

        store.set('user.chatMessages', [
          {
            isUserMessage: currentUserId === res.user_id,
            isRead: res.is_read,
            content: res.content,
            contentType: 'text',
            chatId: this.chatId || '',
            time: res.time,
          },

          ...updatedMessages,
        ]);
      }
    }
  }

  sendMessage(message: string) {
    if (!this.socket) {
      return;
    }

    this.socket.send(
      JSON.stringify({
        type: 'message',
        content: message,
      }),
    );
  }
}
