import { Icon } from '../../../../../../components/icon/Icon';
import { watchedIconTemplate } from '../../../../../../components/icons-templates/watchedIconTemplate';
import { SimpleElement } from '../../../../../../components/simple-element';
import { Block } from '../../../../../../modules/system/block';
import { IComponentProps } from '../../../../../../types';
import { IMessageInChat } from '../../../../types';
import { getMessageContent } from './utils/getMessageContents';

export class MessageInChat extends Block<IMessageInChat> {
  constructor(data: IComponentProps<IMessageInChat, Partial<HTMLElement>>) {
    super({
      tagName: 'div',
      ...data,
      attributes: {
        className: `message-in-chat ${
          data.props?.isUserMessage
            ? 'message-in-chat__sent'
            : 'message-in-chat__received'
        } ${data.props?.contentType !== 'text' ? 'message-in-chat__file' : ''}`,
      },
      children: [
        getMessageContent(
          data.props?.contentType || 'text',
          data.props?.content || '',
        ),
        new SimpleElement({
          attributes: {
            className: `message-in-chat__info ${
              data.props?.contentType !== 'text'
                ? 'message-in-chat__info--file'
                : ''
            } ${
              data.props?.isUserMessage && data.props.isRead
                ? 'message-in-chat__info--accent'
                : ''
            }`,
          },
          children: [
            new Icon({
              props: {
                template: watchedIconTemplate,
                className:
                  data.props?.isUserMessage && data.props?.isRead
                    ? 'message-in-chat__info__icon'
                    : 'hidden',
              },
            }),
            new SimpleElement({
              tagName: 'span',
              props: { text: data.props?.time },
            }),
          ],
        }),
      ],
    });
  }
}
