import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type ISimpleElementProps = {
  text?: string;
};

export class SimpleElement<T extends Partial<HTMLElement>> extends Block<
  ISimpleElementProps,
  T
> {
  constructor(
    data: { tagName?: string } & IComponentProps<ISimpleElementProps, T>,
  ) {
    const tagName = data.tagName || 'div';
    super({ tagName, ...data });
  }

  render() {
    return this.props?.text || '';
  }
}
