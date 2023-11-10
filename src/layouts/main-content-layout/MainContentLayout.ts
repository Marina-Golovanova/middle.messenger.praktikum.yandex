import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IMainContentLayoutProps = Record<string, never>;

export class MainContentLayout extends Block<
  IMainContentLayoutProps,
  Partial<HTMLElement>
> {
  constructor(
    data: IComponentProps<IMainContentLayoutProps, Partial<HTMLElement>>,
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
