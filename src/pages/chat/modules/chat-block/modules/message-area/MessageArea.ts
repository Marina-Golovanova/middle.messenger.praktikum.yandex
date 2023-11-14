import { ButtonIcon } from '@components/button-icon';
import { arrowRightIconTemplate } from '@components/icons-templates/arrowRightIconTemplate';
import { attachmentIconTemplate } from '@components/icons-templates/attachmentIconTemplate';
import { Textarea } from '@components/textarea';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IMessageAreaProps = {
  onSendMessage: (message: string) => void;
};

export class MessageArea extends Block<IMessageAreaProps, HTMLDivElement> {
  constructor(
    data: IComponentProps<IMessageAreaProps, Partial<HTMLDivElement>>,
  ) {
    const textarea = new Textarea({
      props: {
        needClearAfterKeyPress: true,
        onKeyPress: data.props!.onSendMessage,
      },
      attributes: { placeholder: 'Type text...', name: 'message' },
    });

    super({
      tagName: 'div',
      ...data,
      attributes: { className: 'message-area__layout' },
      children: [
        new ButtonIcon({
          props: {
            template: attachmentIconTemplate,
            iconProps: { className: 'message-area__icon', title: 'add file' },
          },
        }),

        textarea,

        new ButtonIcon({
          props: {
            template: arrowRightIconTemplate,
            iconProps: {
              className: 'message-area__icon message-area__icon--accent',
              title: 'send',
            },
          },
          listeners: [
            {
              event: 'click',
              callback: () => {
                data.props?.onSendMessage(textarea.element.value);
                textarea.clearValue();
              },
            },
          ],
        }),
      ],
    });
  }
}
