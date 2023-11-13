import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { userFormFields } from './constants';

type IUserFormProps = {
  readOnly?: boolean;
};

const getFields = (readOnly: boolean) => {
  return userFormFields.map(
    (it) =>
      new LabelInput({
        props: {
          label: it.label,
          inputProps: {
            readOnly,
          },
        },
        attributes: {
          value: it.value,
          placeholder: it.placeholder,
          name: it.name,
        },
      }),
  );
};

export class UserForm extends Block<IUserFormProps> {
  constructor(data: IComponentProps<IUserFormProps, Partial<HTMLElement>>) {
    super({
      tagName: 'fragment',
      ...data,
      children: [
        new FormLayout({
          children: getFields(!!data.props?.readOnly),
        }),
      ],
    });
  }

  componentDidMount() {
    this.element.replaceWith(this.element.children[0]);
  }
}
