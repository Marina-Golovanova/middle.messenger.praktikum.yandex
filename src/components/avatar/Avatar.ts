import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';
import { SimpleElement } from '../simple-element';

type IAvatarProps = {
  imgSrc: string;
};

export class Avatar extends Block<IAvatarProps, Partial<HTMLDivElement>> {
  constructor(data: IComponentProps<IAvatarProps, Partial<HTMLDivElement>>) {
    super({
      tagName: 'div',
      ...data,
      children: [
        new SimpleElement<Partial<HTMLImageElement>>({
          tagName: 'img',
          attributes: {
            src: data.props?.imgSrc,
          },
        }),
      ],
      attributes: {
        ...data.attributes,
        className: 'avatar ' + (data.attributes?.className || ''),
      },
    });
  }
}
