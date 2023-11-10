import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type ISidebarProps = Record<string, never>;

export class Sidebar extends Block<ISidebarProps, Partial<HTMLDivElement>> {
  constructor(data: IComponentProps<ISidebarProps, Partial<HTMLDivElement>>) {
    super({
      tagName: 'div',
      ...data,
      attributes: {
        ...data.attributes,
        className: 'sidebar ' + (data.attributes?.className || ''),
      },
    });
  }
}
