import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IPopupProps = {
  header?: Block;
  body?: Block;
  footer?: Block;
};

export class Popup extends Block<IPopupProps> {
  constructor(data: IComponentProps<IPopupProps, Partial<HTMLElement>>) {
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
      attributes: { className: 'popup' },
      children,
    });
  }
}
