import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type ICentredLayoutProps = Record<string, never>;

export class CentredLayout extends Block<ICentredLayoutProps, HTMLDivElement> {
  constructor(
    data: IComponentProps<ICentredLayoutProps, Partial<HTMLDivElement>>,
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
