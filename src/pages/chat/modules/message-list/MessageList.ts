import { SimpleElement } from '@components/simple-element';
import { IMessageInListProps } from '@pages/chat/types';
import { IComponentProps } from '@types';
import { MessageInList } from '../message-in-list';

export type IMessageListProps = {
  messages: IMessageInListProps[];
  onMessageClick?: (id: string) => void;
};

const getMessagesInList = (
  messages: IMessageInListProps[],
  onMessageClick?: (id: string) => void,
) =>
  messages.map((message) => {
    const messageInList = new MessageInList({
      props: {
        ...message,
        onClick: (id) => onMessageClick?.(id),
      },
    });

    return messageInList;
  });

export class MessageList extends SimpleElement<HTMLElement, IMessageListProps> {
  messages: MessageInList[];

  constructor(
    data: IComponentProps<
      { text?: string | undefined } & IMessageListProps,
      Partial<HTMLElement>
    >,
  ) {
    const messages = getMessagesInList(
      data.props?.messages || [],
      data.props?.onMessageClick,
    );

    super({
      ...data,
      attributes: { className: 'chat__sidebar__message-list' },
      children: messages,
    });

    this.messages = messages || [];
  }

  setProps(props: IMessageListProps) {
    this.children = getMessagesInList(props.messages, props.onMessageClick);
    super.setProps(props);
  }
}
