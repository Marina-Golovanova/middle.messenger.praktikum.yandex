import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IButtonProps = {
  text: string;
};

export class Button extends Block<IButtonProps, HTMLButtonElement> {
  constructor(data: IComponentProps<IButtonProps, Partial<HTMLButtonElement>>) {
    super({
      tagName: 'button',
      ...data,
      attributes: {
        ...data.attributes,
        className: `button ${data.attributes?.className || ''}`,
      },
    });
  }

  render() {
    return this.props?.text || '';
  }
}
