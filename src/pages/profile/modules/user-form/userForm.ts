import { FormLayout } from '../../../../components/form-layout';
import { Input, InputReadOnly } from '../../../../components/input';
import { Block } from '../../../../modules/system/block';
import { IComponentProps } from '../../../../types';
import { userFormFields } from './constants';

type IUserFormProps = {
  readonly?: boolean;
};

const getFields = (readonly: boolean) => {
  const InputConstructor = readonly ? InputReadOnly : Input;
  return userFormFields.map(
    (it) =>
      new InputConstructor({
        props: {
          label: it.label,
          value: it.value,
          placeholder: it.placeholder,
          name: it.name,
        },
        attributes: {
          className: 'label',
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
          children: getFields(!!data.props?.readonly),
        }),
      ],
    });
  }
}
