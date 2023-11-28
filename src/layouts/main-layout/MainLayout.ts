import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IMainLayoutProps = Record<string, never>;

export class MainLayout<T extends object = IMainLayoutProps> extends Block<
  T,
  HTMLDivElement
> {
  constructor(data: IComponentProps<T, Partial<HTMLElement>>) {
    super({
      tagName: 'main',
      ...data,
      attributes: {
        className: 'main-layout',
      },
    });
  }
}
