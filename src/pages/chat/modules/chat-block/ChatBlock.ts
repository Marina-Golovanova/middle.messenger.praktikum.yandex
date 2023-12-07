import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps, IStoreState } from '@types';
import { IMessageInChat } from '@pages/chat/types';
import { ChatBlockHeader } from './modules/chat-block-header';
import { MessageArea } from './modules/message-area/MessageArea';
import { MessageInChat } from './modules/message-in-chat';
import { store } from '@modules/system/store/Store';

type IChatBlockProps = {
  imgSrc: string;
  chatName: string;
  chatMessages: IMessageInChat[];
  onSendMessage: (message: string) => void;
  onDeleteChat: (chatId: string) => void;
};

const getMessages = (messages: IMessageInChat[]) =>
  messages.map((message) => new MessageInChat({ props: message }));

export class ChatBlock extends Block<IChatBlockProps> {
  chatBlockHeader: ChatBlockHeader;
  chatBlockContainer: SimpleElement<HTMLElement, { messages: MessageInChat[] }>;

  constructor(data: IComponentProps<IChatBlockProps, Partial<HTMLElement>>) {
    const chatBlockHeader = new ChatBlockHeader({
      props: {
        imgSrc: data.props?.imgSrc || '',
        chatName: data.props?.chatName || '',
        onDelete: () =>
          data.props?.onDeleteChat(
            (store.getState() as IStoreState)?.user?.activeChatId,
          ),
      },
    });

    const chatBlockContainer = new SimpleElement<
      HTMLElement,
      { messages: MessageInChat[] }
    >({
      attributes: { className: 'chat-block__messages' },
    });

    super({
      tagName: 'div',
      ...data,
      attributes: { className: 'chat-block__layout' },
      children: [
        chatBlockHeader,

        chatBlockContainer,

        new SimpleElement({
          attributes: { className: 'chat-block__footer' },
          children: [
            new MessageArea({
              props: {
                onSendMessage: (message) =>
                  data.props?.onSendMessage?.(message),
              },
            }),
          ],
        }),
      ],
    });

    this.chatBlockHeader = chatBlockHeader;
    this.chatBlockContainer = chatBlockContainer;
  }

  setProps(props: IChatBlockProps) {
    super.setProps(props);

    this.chatBlockHeader.setProps({
      imgSrc: this?.props?.imgSrc || '',
      chatName: this?.props?.chatName || '',
      onDelete: () => {
        this.props?.onDeleteChat(
          (store.getState() as IStoreState)?.user?.activeChatId,
        );
      },
    });

    this.chatBlockContainer.children?.forEach((child) => {
      child.destroy();
    });

    this.chatBlockContainer.addChildren(
      getMessages(this?.props?.chatMessages || []),
    );
  }
}
