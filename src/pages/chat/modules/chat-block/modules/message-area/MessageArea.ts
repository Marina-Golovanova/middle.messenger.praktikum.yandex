import { ButtonIcon } from '../../../../../../components/button-icon/ButtonIcon';
import { arrowRightIconTemplate } from '../../../../../../components/icons-templates/arrowRightIconTemplate';
import { attachmentIconTemplate } from '../../../../../../components/icons-templates/attachmentIconTemplate';
import { Textarea } from '../../../../../../components/textarea';
import { Block } from '../../../../../../modules/system/block';
import { IComponentProps } from '../../../../../../types';

export class MessageArea extends Block {
  constructor(
    data: IComponentProps<Record<string, unknown>, Partial<HTMLElement>>,
  ) {
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

        new Textarea({
          attributes: { placeholder: 'Type text...', name: 'message' },
        }),

        new ButtonIcon({
          props: {
            template: arrowRightIconTemplate,
            iconProps: {
              className: 'message-area__icon message-area__icon--accent',
              title: 'send',
            },
          },
        }),
      ],
    });
  }
}
