import { SimpleElement } from '@components/simple-element';
import { IComponentProps } from '@types';

export class PopupLayout extends SimpleElement<HTMLElement> {
  constructor(data: IComponentProps<{ text?: string }, Partial<HTMLElement>>) {
    super({
      ...data,
      attributes: { ...data.attributes, className: 'popup-layout' },
    });
  }
}
