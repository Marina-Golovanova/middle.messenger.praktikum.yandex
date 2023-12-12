import { ButtonIcon } from '@components/button-icon';
import { crossTemplateIcon } from '@components/icons-templates/crossTemplateIcon';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { BurgerMenuItem, IBurgerMenuItem } from './components/burger-menu-item';

export type IBurgerMenuProps = {
  burgerMenuItems: IBurgerMenuItem[];
};

export class BurgerMenu extends Block<IBurgerMenuProps, HTMLUListElement> {
  constructor(
    data: IComponentProps<IBurgerMenuProps, Partial<HTMLUListElement>>,
  ) {
    const children = (data.props?.burgerMenuItems || []).map(
      (props) => new BurgerMenuItem({ props }),
    );

    super({
      ...data,
      tagName: 'ul',
      attributes: {
        className: `burger-menu ${data.attributes?.className || ''}`,
      },
      children: [
        ...children,
        new ButtonIcon({
          props: { template: crossTemplateIcon, iconProps: {} },
          attributes: {
            className: 'burger-menu__cross-icon',
          },
          listeners: [
            {
              event: 'click',
              callback: () => this.hide(),
            },
          ],
        }),
      ],
    });
  }
}
