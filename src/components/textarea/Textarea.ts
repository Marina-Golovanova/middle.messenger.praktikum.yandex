import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type ITextareaProps = {
  needClearAfterKeyPress?: boolean;
  onKeyPress: (value: string) => void;
};

export class Textarea extends Block<ITextareaProps, HTMLTextAreaElement> {
  constructor(
    data: IComponentProps<ITextareaProps, Partial<HTMLTextAreaElement>>,
  ) {
    super({
      tagName: 'textarea',
      ...data,
      attributes: { ...data?.attributes, className: 'textarea' },
      listeners: [
        {
          event: 'keypress',
          callback: (e) => {
            const event = e as KeyboardEvent;

            if (event.code === 'Enter') {
              data.props?.onKeyPress(this.element.value);

              if (data.props?.needClearAfterKeyPress) {
                e.preventDefault();
                this.clearValue();
              }
            }
          },
        },
      ],
    });
  }

  clearValue() {
    this.element.value = '';
  }
}
