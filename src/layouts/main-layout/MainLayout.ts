import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IMainLayoutProps = Record<string, never>;

export class MainLayout extends Block<IMainLayoutProps, Partial<HTMLElement>> {
  constructor(data: IComponentProps<IMainLayoutProps, Partial<HTMLElement>>) {
    super({
      tagName: 'main',
      ...data,
      attributes: {
        className: 'main-layout',
      },
    });
  }
}
