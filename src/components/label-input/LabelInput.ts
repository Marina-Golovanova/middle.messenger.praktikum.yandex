import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { IInputProps, Input } from './components/Input';

export type ILabelInputProps = {
  label?: string;
  inputProps?: IInputProps;
  errorMessage?: string;
};

export type IInputType = 'text' | 'password';
export class LabelInput extends Block<ILabelInputProps, HTMLInputElement> {
  inputRef: Input;

  constructor(
    data: IComponentProps<ILabelInputProps, Partial<HTMLInputElement>>,
  ) {
    const input = new Input({
      attributes: data.attributes,
      props: data.props?.inputProps,
      listeners: data.listeners,
    });

    super({
      tagName: 'label',
      ...data,
      attributes: {
        ...data.attributes,
        className: `label ${data.attributes?.className || ''}`,
      },
      children: [
        new SimpleElement({
          tagName: 'span',
          props: { text: data.props?.label },
        }),

        input,
      ],
      listeners: [],
    });

    this.inputRef = input;
  }

  addChildren(children?: Block[]): void {
    const currentChildren = this.props?.errorMessage
      ? children?.concat(
          new SimpleElement({
            props: { text: this.props.errorMessage },
            attributes: { className: 'input-error-message' },
          }),
        )
      : children;

    super.addChildren(currentChildren);
  }

  setProps(newProps: ILabelInputProps) {
    this.inputRef.setProps({
      ...this.inputRef.props,
      ...newProps.inputProps,
      error: !!newProps.errorMessage,
    });
    super.setProps(newProps);
  }
}
