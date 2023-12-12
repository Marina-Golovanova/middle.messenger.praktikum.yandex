import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

export type IBurgerMenuItem = {
  icon?: Block;
  text: string;
  onClick: () => void;
};

export class BurgerMenuItem extends Block<IBurgerMenuItem, HTMLLIElement> {
  constructor(data: IComponentProps<IBurgerMenuItem, HTMLLIElement>) {
    const children: Block[] = [];

    if (data.props?.icon) {
      children.push(data.props.icon);
    }

    children.push(new SimpleElement({ props: { text: data.props?.text } }));

    super({
      ...data,
      tagName: 'li',
      attributes: { className: 'burger-menu__item' },
      children,
      listeners: [
        {
          event: 'click',
          callback: () => data.props?.onClick(),
        },
      ],
    });
  }
}
