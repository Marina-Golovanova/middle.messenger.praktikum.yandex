import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type ICentredLayoutProps = Record<string, never>;

export class CentredLayout extends Block<
  ICentredLayoutProps,
  Partial<HTMLElement>
> {
  constructor(
    data: IComponentProps<ICentredLayoutProps, Partial<HTMLElement>>,
  ) {
    super({
      tagName: 'main',
      ...data,
      attributes: {
        className: 'centred-layout',
      },
    });
  }
}
