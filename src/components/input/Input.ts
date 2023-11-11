import { template } from './templates/template-input';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

export type IInputProps = {
  label?: string;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  type?: IInputType;
  name?: string;
};

export type IInputType = 'text' | 'password';
export class Input extends Block<IInputProps, Partial<HTMLInputElement>> {
  constructor(data: IComponentProps<IInputProps, Partial<HTMLInputElement>>) {
    super({
      tagName: 'label',
      attributes: {
        ...data.attributes,
        className: `label ${data.attributes?.className || ''}`,
      },
      ...data,
    });
  }

  render() {
    return template(this.props);
  }

  setListeners() {
    if (!this.listeners) {
      return;
    }

    this.listeners.forEach(({ event, callback }) => {
      this.element.children[0].addEventListener(event, callback);
    });
  }
}
