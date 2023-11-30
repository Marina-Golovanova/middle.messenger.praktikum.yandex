import { Avatar } from '@components/avatar';
import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { IMessageInListProps } from '@pages/chat/types';

export class MessageInList extends Block<IMessageInListProps, HTMLLIElement> {
  messageActiveBlur: Block;

  constructor(
    data: IComponentProps<IMessageInListProps, Partial<HTMLLIElement>>,
  ) {
    const messageActiveBlur = new SimpleElement({
      attributes: {
        className: data.props?.isActiveChat ? 'message--active' : '',
      },
    });

    super({
      tagName: 'li',
      ...data,
      attributes: { className: 'message__layout' },
      children: [
        messageActiveBlur,
        new Avatar({
          attributes: {
            className: 'avatar--s',
          },
          props: {
            imgSrc: data.props?.avatar || '/chat-avatar.png',
          },
        }),
        new SimpleElement({
          attributes: { className: 'message__block' },
          children: [
            new SimpleElement({
              attributes: { className: 'message__block__chat-name' },
              props: {
                text: data.props?.title,
              },
            }),

            new SimpleElement({
              attributes: { className: 'message__block__message' },
              children: [
                new SimpleElement({
                  tagName: 'span',
                  attributes: { className: 'message__block__message--accent' },
                  props: {
                    text: data.props?.isUserMessage
                      ? 'Вы: '
                      : data.props?.chatUserName
                      ? data.props?.chatUserName + ': '
                      : '',
                  },
                }),

                new SimpleElement({
                  tagName: 'span',
                  props: { text: data.props?.message },
                }),
              ],
            }),
          ],
        }),
        new SimpleElement({
          attributes: { className: 'message__info' },
          children: [
            new SimpleElement({
              attributes: { className: 'message__info__date' },
              props: {
                text: data.props?.date,
              },
            }),
            new SimpleElement({
              attributes: {
                className: data.props?.numberNewMessages
                  ? 'message__info__number-new-messages'
                  : '',
              },
              props: {
                text: data.props?.numberNewMessages
                  ? `+${data.props.numberNewMessages}`
                  : '',
              },
            }),
          ],
        }),
      ],
      listeners: [
        {
          event: 'click',
          callback: () => this.props?.onClick?.(this.props?.id),
        },
      ],
    });

    messageActiveBlur.setAttributes({
      ...messageActiveBlur.attributes,
      className: this.props?.isActiveChat ? 'message--active' : '',
    });

    this.messageActiveBlur = messageActiveBlur;
  }

  setProps(props: IMessageInListProps) {
    this.messageActiveBlur.setAttributes({
      ...this.messageActiveBlur.attributes,
      className: props?.isActiveChat ? 'message--active' : '',
    });
    super.setProps(props);
  }
}
