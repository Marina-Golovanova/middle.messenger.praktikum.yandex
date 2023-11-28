import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type ISimpleElementProps = {
  text?: string;
};

export class SimpleElement<T extends HTMLElement> extends Block<
  ISimpleElementProps,
  T
> {
  constructor(
    data: { tagName?: string } & IComponentProps<
      ISimpleElementProps,
      Partial<T>
    >,
  ) {
    const tagName = data.tagName || 'div';
    super({ tagName, ...data });
  }

  render() {
    return this.props?.text || '';
  }

  // setAttributes(attributes?: Partial<T> | undefined): void {
  //   console.log(attributes);
  //   console.log(1);
  //   super.setAttributes(attributes);
  // }
}
