import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

export type IInputProps = {
  error?: boolean;
  readOnly?: boolean;
};

export class Input extends Block<IInputProps, HTMLInputElement> {
  constructor(data: IComponentProps<IInputProps, Partial<HTMLInputElement>>) {
    super({
      tagName: 'input',
      ...data,
      attributes: {
        ...data.attributes,
        className: `input ${data.attributes?.className || ''}`,
      },
    });

    if (data.props?.readOnly) {
      this.element.readOnly = true;
    }
  }

  setAttributes(attributes?: Partial<HTMLInputElement> | undefined): void {
    if (attributes?.value !== undefined) {
      this.element.value = attributes.value;
    }

    const className = this.props?.error
      ? `${this.attributes?.className} input--error`
      : this.attributes?.className?.replace('input--error', '');

    super.setAttributes({ ...attributes, className });
  }

  setProps(props: IInputProps) {
    super.setProps(props);
    this.element.readOnly = !!props.readOnly;
  }
}
