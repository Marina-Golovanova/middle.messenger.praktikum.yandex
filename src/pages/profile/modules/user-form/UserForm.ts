import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps, IUserData, IFormField } from '@types';
import { handleSubmitForm } from '@utils/user-form/handleSubmitForm';
import { userFormFields } from './constants';

type IUserFormProps = {
  isEditable: boolean;
  userData: IUserData;
};

const getFields = (userFormFields: IFormField[], isEditable: boolean) => {
  return userFormFields.map((field) => {
    const { inputProps, ...props } = field.props;

    const input = new LabelInput({
      props: {
        ...field.props,
        inputProps: {
          readOnly: !isEditable,
        },
      },
      attributes: field.attributes,

      listeners: [
        {
          event: 'blur',
          callback: (e) => {
            if (!isEditable) {
              return;
            }

            const target = e.target as HTMLInputElement;
            const value = target.value;

            if (!field.validate(value)) {
              input.setProps({ ...input.props, inputProps });
            } else {
              input.setProps({ ...props, inputProps: undefined });
            }
          },
        },
      ],
    });

    field.ref = input;

    return input;
  });
};

export class UserForm extends Block<IUserFormProps> {
  constructor(data: IComponentProps<IUserFormProps, Partial<HTMLElement>>) {
    super({
      tagName: 'fragment',
      ...data,
      children: [
        new FormLayout({
          children: [
            ...getFields(
              userFormFields.map((field) => ({
                ...field,
                attributes: {
                  ...field.attributes,
                  value:
                    data.props?.userData?.[
                      field.attributes.name as keyof IUserData
                    ] || '',
                },
              })),
              !!data.props?.isEditable,
            ),
            data.props?.isEditable
              ? new SimpleElement({
                  attributes: { className: 'profile-edit__buttons' },
                  children: [
                    new Button({
                      props: {
                        text: 'cancel',
                      },
                      attributes: {
                        className: 'button--normal button--s',
                      },
                    }),

                    new Button({
                      props: {
                        text: 'save',
                      },
                      attributes: {
                        className: 'button--accent button--s',
                        type: 'submit',
                      },
                    }),
                  ],
                })
              : new SimpleElement({
                  attributes: {
                    className: 'form-layout__buttons-group',
                  },
                  children: [
                    new Button({
                      props: {
                        text: 'change password',
                      },
                      attributes: {
                        className: 'button--accent',
                      },
                    }),
                  ],
                }),
          ],
          listeners: [
            {
              event: 'submit',
              callback: (e) => handleSubmitForm(e, userFormFields),
            },
          ],
        }),
      ],
    });
  }

  componentDidMount() {
    this.element.replaceWith(this.element.children[0]);
  }
}
