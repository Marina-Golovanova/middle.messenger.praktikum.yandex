import { ButtonIcon } from '@components/button-icon';
import { arrowLeftIconTemplate } from '@components/icons-templates/arrowLeftIconTemplate';
import { Sidebar } from '@components/sidebar';
import { SimpleElement } from '@components/simple-element/SimpleElement';
import { MainLayout } from '@layouts/main-layout/MainLayout';
import { IComponentProps } from '@types';

type IProfileLayoutProps = {
  onClickBack?: () => void;
};

export class ProfileLayout extends MainLayout<IProfileLayoutProps> {
  constructor(
    data: IComponentProps<IProfileLayoutProps, Partial<HTMLDivElement>>,
  ) {
    super({
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
                    template: arrowLeftIconTemplate,
                  },
                  listeners: [
                    {
                      event: 'click',
                      callback: () => {
                        data?.props?.onClickBack?.();
                      },
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
        ...(data?.children ? data.children : []),
      ],
    });
  }
}
