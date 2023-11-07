import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type ISimpleDivProps = Record<string, never>;

export class SimpleDiv extends Block<ISimpleDivProps, Partial<HTMLDivElement>> {
  constructor(data: IComponentProps<ISimpleDivProps, Partial<HTMLDivElement>>) {
    super({
      tagName: 'div',
      ...data,
    });
  }

  render() {
    return '';
  }
}
