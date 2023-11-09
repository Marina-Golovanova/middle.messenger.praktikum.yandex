import { template } from './template';
import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IErrorProps = {
  errorNumber: number;
  errorMessage: string;
};

export class ErrorMessage extends Block<IErrorProps> {
  constructor(data: IComponentProps<IErrorProps, Partial<HTMLDivElement>>) {
    super({
      tagName: 'div',
      attributes: {
        className: 'error',
      },
      ...data,
    });
  }

  render() {
    return template(this.props);
  }
}
