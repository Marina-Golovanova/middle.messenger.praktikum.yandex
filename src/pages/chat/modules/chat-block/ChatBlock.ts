import { SimpleElement } from '../../../../components/simple-element';
import { Block } from '../../../../modules/system/block';
import { IComponentProps } from '../../../../types';
import { IMessageInChat } from '../../types';
import { ChatBlockHeader } from './modules/chat-block-header';
import { MessageArea } from './modules/message-area/MessageArea';
import { MessageInChat } from './modules/message-in-chat';

type IChatBlockProps = {
  imgSrc: string;
  chatName: string;
  messages: IMessageInChat[];
};

const getMessages = (messages: IMessageInChat[]) =>
  messages.map((message) => new MessageInChat({ props: message }));

export class ChatBlock extends Block<IChatBlockProps> {
  constructor(data: IComponentProps<IChatBlockProps, Partial<HTMLElement>>) {
    super({
      tagName: 'div',
      ...data,
      attributes: { className: 'chat-block__layout' },
      children: [
        new ChatBlockHeader({
          props: {
            imgSrc: data.props?.imgSrc || '',
            chatName: data.props?.chatName || '',
          },
        }),

        new SimpleElement({
          attributes: { className: 'chat-block__messages' },
          children: getMessages(data.props?.messages || []),
        }),

        new SimpleElement({
          attributes: { className: 'chat-block__footer' },
          children: [new MessageArea({})],
        }),
      ],
    });
  }
}
