import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type ISimpleElementProps<Props> = {
  text?: string;
} & Props;

export class SimpleElement<
  T extends HTMLElement,
  Props = Record<string, string | undefined>,
> extends Block<ISimpleElementProps<Props>, T> {
  constructor(
    data: { tagName?: string } & IComponentProps<
      ISimpleElementProps<Props>,
      Partial<T>
    >,
  ) {
    const tagName = data.tagName || 'div';
    super({ tagName, ...data });
  }

  render() {
    return this.props?.text || '';
  }
}
