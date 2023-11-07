import { template } from './template';
import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IButtonProps = {
  text: string;
};

export class Button extends Block<IButtonProps, Partial<HTMLButtonElement>> {
  constructor(data: IComponentProps<IButtonProps, Partial<HTMLButtonElement>>) {
    super({
      tagName: 'button',
      ...data,
    });
  }

  render() {
    return template(this.props);
  }

  setAttributes(attributes?: Partial<HTMLButtonElement>): void {
    const className = 'button ' + (attributes?.className || '');
    super.setAttributes({ ...attributes, className });
  }
}
