import { template } from './template-input';
import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IInputProps = {
  label?: string;
  errorMessage?: string;
  className?: string;
  placeholder?: string;
  value?: string;
  type?: IInputType;
};

export type IInputType = 'text' | 'password';
export class Input extends Block<IInputProps, Partial<HTMLInputElement>> {
  inputs: Element[];

  constructor(data: IComponentProps<IInputProps, Partial<HTMLInputElement>>) {
    super({
      tagName: 'label',
      ...data,
    });

    this.inputs = Array.from(this.getContent().children);
  }

  render() {
    return template(this.props);
  }
}
