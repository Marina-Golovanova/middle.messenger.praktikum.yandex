import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

export class Textarea extends Block<
  Record<string, unknown>,
  HTMLTextAreaElement
> {
  constructor(
    data: IComponentProps<
      Record<string, unknown>,
      Partial<HTMLTextAreaElement>
    >,
  ) {
    super({
      tagName: 'textarea',
      ...data,
      attributes: { ...data?.attributes, className: 'textarea' },
    });
  }
}
