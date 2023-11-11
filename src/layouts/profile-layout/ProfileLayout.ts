import { ButtonIcon } from '../../components/button-icon/ButtonIcon';
import { arrowLeftTemplate } from '../../components/icons-templates/arrowLeftTemplate';
import { Sidebar } from '../../components/sidebar';
import { SimpleElement } from '../../components/simple-element/SimpleElement';
import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IProfileLayoutProps = {
  children: Block[];
};

export class ProfileLayout extends Block<IProfileLayoutProps> {
  constructor(
    data: IComponentProps<IProfileLayoutProps, Partial<HTMLElement>>,
  ) {
    super({
      tagName: 'main',
      ...data,
      children: [
        new Sidebar({
          attributes: {
            className: 'sidebar--xs',
          },

          children: [
            new SimpleElement({
              attributes: { className: 'profile-layout__sidebar' },

              children: [
                new ButtonIcon({
                  props: {
                    iconProps: {
                      className: 'profile-layout__icon',
                      title: 'back',
                    },
                    template: arrowLeftTemplate,
                  },
                }),
              ],
            }),
          ],
        }),
        ...(data?.children ? data.children : []),
      ],
      attributes: {
        className: 'main-layout',
      },
    });
  }
}
