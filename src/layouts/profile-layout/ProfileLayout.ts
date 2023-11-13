import { ButtonIcon } from '@components/button-icon';
import { arrowLeftTemplate } from '@components/icons-templates/arrowLeftTemplate';
import { Sidebar } from '@components/sidebar';
import { SimpleElement } from '@components/simple-element/SimpleElement';
import { MainLayout } from '@layouts/main-layout/MainLayout';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IProfileLayoutProps = {
  children: Block[];
};

export class ProfileLayout extends Block<IProfileLayoutProps, HTMLDivElement> {
  constructor(
    data: IComponentProps<IProfileLayoutProps, Partial<HTMLDivElement>>,
  ) {
    super({
      tagName: 'template',
      ...data,
      children: [
        new MainLayout({
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
        }),
      ],
    });
  }

  componentDidMount() {
    this.element.replaceWith(this.element.children[0]);
  }
}
