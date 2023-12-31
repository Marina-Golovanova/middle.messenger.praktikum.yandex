import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

export type IFormProps<T> = {
  requestError?: string;
} & T;

export class FormLayout<T = Record<string, string | undefined>> extends Block<
  IFormProps<T>,
  HTMLFormElement
> {
  errorMessage: Block;

  constructor(data: IComponentProps<IFormProps<T>, Partial<HTMLFormElement>>) {
    const dataChildren = [...(data.children || [])];
    const errorMessage = new SimpleElement({
      tagName: 'span',
      props: { text: data.props?.requestError },
      attributes: {
        className: data.props?.requestError
          ? 'form-layout__request-error'
          : 'hidden',
      },
    });

    super({
      tagName: 'form',
      ...data,
      attributes: {
        ...data.attributes,
        className: `form-layout ${data.attributes?.className || ''}`,
      },
      children: [...dataChildren, errorMessage],
    });

    this.errorMessage = errorMessage;
  }

  setProps(props: IFormProps<T>) {
    super.setProps(props);
    this.errorMessage.setProps({ text: props?.requestError });
  }

  setAttributes(attributes?: Partial<HTMLFormElement>) {
    const className = this.props?.requestError
      ? 'form-layout__request-error'
      : 'hidden';

    this.errorMessage.setAttributes({
      ...this.errorMessage.attributes,
      className,
    });

    super.setAttributes(attributes);
  }
}
