import { template } from './template-input';
import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IInputProps = {
  label: string;
};
export class Input extends Block<IInputProps, Partial<HTMLInputElement>> {
  constructor(data: IComponentProps<IInputProps, Partial<HTMLInputElement>>) {
    super({
      tagName: 'label',
      ...data,
    });
  }

  render() {
    return template(this.props);
  }
}
