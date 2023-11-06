import { template } from './template';
import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IInputProps = {
  label: string;
};
export class Input extends Block<IInputProps, Partial<HTMLInputElement>> {
  constructor(data: IComponentProps<IInputProps, Partial<HTMLButtonElement>>) {
    super({
      tagName: 'label',
      ...data,
    });
  }

  render() {
    return template(this.props);
  }
}
