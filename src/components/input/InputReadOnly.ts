import { template } from './template-input-readonly';
import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';
import { IInputType } from './Input';

type IInputProps = {
  label: string;
  className?: string;
  placeholder?: string;
  value?: string;
  type?: IInputType;
  name?: string;
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
