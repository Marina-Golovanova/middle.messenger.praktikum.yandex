import { SimpleElement } from '@components/simple-element';
import { store } from '@modules/system/store/Store';
import { IMessageInListProps } from '@pages/chat/types';
import { IComponentProps } from '@types';
import { isEqual } from '@utils/isEqual';
import { messageInListConnector } from '../message-in-list';
import { MessageInList } from '../message-in-list/MessageInList';

export type IMessageListProps = {
  messages: IMessageInListProps[];
  onMessageClick?: (id: string) => void;
};

const getMessagesInList = (
  messages: IMessageInListProps[],
  onMessageClick?: (id: string) => void,
) =>
  messages.map((message) => {
    const messageInList = new messageInListConnector({
      tagName: 'div',
      props: {
        ...message,
        onClick: (id: string) => {
          store.set('user.activeChatId', id);
          onMessageClick?.(id);
        },
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

    this.messages = (messages as MessageInList[]) || [];
  }

  setProps(props: IMessageListProps) {
    if (!this.props?.messages) {
      return;
    }

    if (!isEqual(props.messages, this.props?.messages)) {
      this.children = getMessagesInList(
        props.messages || [],
        this?.props?.onMessageClick,
      );
      super.setProps(props);
    }
  }
}
