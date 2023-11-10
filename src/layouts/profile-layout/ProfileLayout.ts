import { ButtonIcon } from '../../components/button-icon/ButtonIcon';
import { arrowLeft } from '../../components/icons-templates/arrowLeft';
import { Sidebar } from '../../components/sidebar';
import { SimpleDiv } from '../../components/simple-div/SimpleDiv';
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
            new SimpleDiv({
              attributes: { className: 'profile-layout__sidebar' },

              children: [
                new ButtonIcon({
                  props: {
                    iconProps: {
                      className: 'profile-layout__icon',
                      title: 'back',
                    },
                    template: arrowLeft,
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
