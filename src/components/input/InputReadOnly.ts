import { template } from './template-input-readonly';
import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IInputProps = {
  label: string;
};
export class InputReadOnly extends Block<
  IInputProps,
  Partial<HTMLInputElement>
> {
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
