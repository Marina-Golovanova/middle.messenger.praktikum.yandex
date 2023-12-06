import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { IMessageInChat } from '@pages/chat/types';
import { ChatBlockHeader } from './modules/chat-block-header';
import { MessageArea } from './modules/message-area/MessageArea';
import { MessageInChat } from './modules/message-in-chat';

type IChatBlockProps = {
  imgSrc: string;
  chatName: string;
  messages: IMessageInChat[];
  onSendMessage: (message: string) => void;
};

const getMessages = (messages: IMessageInChat[]) =>
  messages.map((message) => new MessageInChat({ props: message }));

export class ChatBlock extends Block<IChatBlockProps> {
  chatBlockHeader: ChatBlockHeader;
  chatBlockMessages: SimpleElement<HTMLElement, { messages: MessageInChat[] }>;

  constructor(data: IComponentProps<IChatBlockProps, Partial<HTMLElement>>) {
    const chatBlockHeader = new ChatBlockHeader({
      props: {
        imgSrc: data.props?.imgSrc || '',
        chatName: data.props?.chatName || '',
      },
    });

    const chatBlockMessages = new SimpleElement<
      HTMLElement,
      { messages: MessageInChat[] }
    >({
      attributes: { className: 'chat-block__messages' },
      children: getMessages(data.props?.messages || []),
    });

    super({
      tagName: 'div',
      ...data,
      attributes: { className: 'chat-block__layout' },
      children: [
        chatBlockHeader,

        new SimpleElement<HTMLElement, { messages: MessageInChat[] }>({
          attributes: { className: 'chat-block__messages' },
          children: getMessages(data.props?.messages || []),
        }),

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
    this.chatBlockMessages = chatBlockMessages;
  }

  setProps(props: IChatBlockProps) {
    this.chatBlockHeader.setProps({
      imgSrc: props.imgSrc,
      chatName: props.chatName,
    });
    super.setProps(props);
  }
}
