import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IMainContentLayoutProps = Record<string, never>;

export class MainContentLayout extends Block<
  IMainContentLayoutProps,
  HTMLDivElement
> {
  constructor(
    data: IComponentProps<IMainContentLayoutProps, Partial<HTMLDivElement>>,
  ) {
    super({
      tagName: 'div',
      ...data,
      attributes: {
        className: 'main-content-layout',
      },
    });
  }
}
