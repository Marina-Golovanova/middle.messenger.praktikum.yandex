import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

export type IPopupProps<T> = {
  header?: Block;
  body?: Block;
  footer?: Block;
} & T;

export class Popup<T = Record<string, never>> extends Block<IPopupProps<T>> {
  constructor(data: IComponentProps<IPopupProps<T>, Partial<HTMLElement>>) {
    const { header, body, footer } = data.props || {};
    const children: Block[] = [];

    if (header) {
      header.setAttributes({
        ...header.attributes,
        className: `${header.attributes?.className || ''} popup__header`,
      });
      children.push(header);
    }

    if (body) {
      body.setAttributes({
        ...body.attributes,
        className: `${body.attributes?.className || ''} popup__body`,
      });
      children.push(body);
    }

    if (footer) {
      footer.setAttributes({
        ...footer.attributes,
        className: `${footer.attributes?.className || ''} popup__footer`,
      });
      children.push(footer);
    }

    super({
      tagName: 'div',
      ...data,
      attributes: { className: `popup ${data?.attributes?.className || ''}` },
      children,
    });
  }
}
