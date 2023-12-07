import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IButtonProps = {
  template: HandlebarsTemplateDelegate<unknown>;
  isInputFile?: boolean;
  iconProps: Partial<SVGElement> & {
    title?: string;
  };
  onLoadFile?: (e: Event) => void;
};

export class ButtonIcon extends Block<IButtonProps, HTMLButtonElement> {
  constructor(data: IComponentProps<IButtonProps, Partial<HTMLButtonElement>>) {
    const input = new SimpleElement<HTMLInputElement>({
      tagName: 'input',
      attributes: {
        type: 'file',
        className: 'button-icon__input',
        accept: '.png,.jpg,.jpeg',
      },
      listeners: [
        {
          event: 'change',
          callback: (e) => {
            data?.props?.onLoadFile?.(e);
            input.element.value = '';
          },
        },
      ],
    });

    super({
      tagName: 'button',
      ...data,
      attributes: {
        ...data.attributes,
        className: `button-icon ${data.attributes?.className || ''}`,
      },
      children: data.props?.isInputFile ? [input] : [],
    });
  }

  render() {
    return this.props?.template(this.props.iconProps) || '';
  }
}
