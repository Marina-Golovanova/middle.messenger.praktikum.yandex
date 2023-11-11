import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

export class Image extends Block {
  constructor(
    data: IComponentProps<Record<string, unknown>, Partial<HTMLImageElement>>,
  ) {
    super({
      tagName: 'img',
      ...data,
    });
  }
}
