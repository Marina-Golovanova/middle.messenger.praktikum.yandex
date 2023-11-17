import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { changePasswordFields } from './constants';

const fields = changePasswordFields.map((field) => {
  const input = new LabelInput({
    props: {
      label: field.props.label,
    },
    attributes: field.attributes,
  });

  field.ref = input;

  return input;
});

const handleSubmitNewPassword = (e: Event) => {
  e.preventDefault();
  const passwordData: Record<string, string> = {};

  for (const field of changePasswordFields) {
    if (!field.attributes.name) {
      return;
    }

    const value = field.ref?.inputRef?.element?.value || '';

    if (field.attributes.name !== 'repeat_password' && !field.validate(value)) {
      field.ref?.setProps({
        ...field.ref.props,
        inputProps: field.props.inputProps,
      });

      console.error('Something is wrong');

      return;
    } else if (
      field.attributes.name === 'repeat_password' &&
      value !== passwordData['new_password']
    ) {
      field.ref?.setProps({
        ...field.ref.props,
        inputProps: field.props.inputProps,
      });

      return;
    }

    field.ref?.setProps({
      ...field.ref.props,
      inputProps: { errorMessage: undefined },
    });

    passwordData[field.attributes.name] = value;
  }

  console.log(passwordData);
};

export class ChangePasswordForm extends Block {
  constructor(
    data: IComponentProps<Record<string, unknown>, Partial<HTMLElement>>,
  ) {
    super({
      tagName: 'fragment',
      ...data,
      children: [
        new FormLayout({
          children: [
            ...fields,
            new SimpleElement({
              attributes: {
                className: 'form-layout__buttons-group',
              },
              children: [
                new SimpleElement({
                  attributes: {
                    className: 'change-password__buttons',
                  },
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
                      },
                    }),
                  ],
                }),
              ],
            }),
          ],
          listeners: [
            {
              event: 'submit',
              callback: handleSubmitNewPassword,
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
