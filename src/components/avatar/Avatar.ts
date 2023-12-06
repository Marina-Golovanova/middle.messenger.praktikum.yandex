import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { SimpleElement } from '../simple-element';

type IAvatarProps = {
  imgSrc: string;
};

export class Avatar extends Block<IAvatarProps, HTMLDivElement> {
  imgRef: SimpleElement<HTMLImageElement>;

  constructor(data: IComponentProps<IAvatarProps, Partial<HTMLDivElement>>) {
    const img = new SimpleElement<HTMLImageElement>({
      tagName: 'img',
      attributes: {
        src: data.props?.imgSrc || '',
      },
    });

    super({
      tagName: 'div',
      ...data,
      children: [img],
      attributes: {
        ...data.attributes,
        className: `avatar ${data.attributes?.className || ''}`,
      },
    });

    this.imgRef = img;

    img.destroy();
  }

  setProps(props: IAvatarProps) {
    console.log(this.props, props);
    this.imgRef.setAttributes({
      ...this.imgRef.attributes,
      src: props.imgSrc,
    });
    super.setProps(props);
  }
}
