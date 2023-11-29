import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element';
import { api } from '@modules/system/api';
import { IComponentProps } from '@types';
import { changePasswordFields } from './constants';

type IChangePasswordProps = {
  onSuccess: () => void;
  onCancel: () => void;
};

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

export type IHandleSubmitNewPassword = {
  event: Event;
  onSuccess: () => void;
};

const handleSubmitNewPassword = (props: IHandleSubmitNewPassword) => {
  props.event.preventDefault();
  const passwordData: Record<string, string> = {};

  for (const field of changePasswordFields) {
    if (!field.attributes.name) {
      return;
    }

    const value = field.ref?.inputRef?.element?.value || '';

    if (field.attributes.name !== 'repeat_password' && !field.validate(value)) {
      field.ref?.setProps({
        ...field.ref.props,
        errorMessage: field.props.errorMessage,
      });

      console.error('Something is wrong');

      return;
    } else if (
      field.attributes.name === 'repeat_password' &&
      value !== passwordData['new_password']
    ) {
      field.ref?.setProps({
        ...field.ref.props,
        errorMessage: field.props.errorMessage,
      });

      return;
    }

    field.ref?.setProps({
      ...field.ref.props,
      errorMessage: undefined,
    });

    passwordData[field.attributes.name] = value;
  }

  api
    .changePassword({
      oldPassword: passwordData.old_password,
      newPassword: passwordData.new_password,
    })
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    .then((res: any) => {
      if (res.status === 200) {
        props.onSuccess();
      } else {
        console.error(res.responseText);
      }
    })
    .catch((e) => console.error(e));
};

export class ChangePasswordForm extends FormLayout<IChangePasswordProps> {
  cancelButton: Button;
  saveButton: Button;

  constructor(
    data: IComponentProps<IChangePasswordProps, Partial<HTMLFormElement>>,
  ) {
    const cancelButton = new Button({
      props: {
        text: 'cancel',
      },
      attributes: {
        className: 'button--normal button--s',
        type: 'button',
      },
    });

    const saveButton = new Button({
      props: {
        text: 'save',
      },
      attributes: {
        className: 'button--accent button--s',
      },
      listeners: [
        {
          event: 'submit',
          callback: (e) => {
            handleSubmitNewPassword({
              event: e,
              onSuccess: () => data.props?.onSuccess(),
            });
          },
        },
      ],
    });

    super({
      ...data,
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
                cancelButton,
                new Button({
                  props: {
                    text: 'save',
                  },
                  attributes: {
                    className: 'button--accent button--s',
                  },
                  listeners: [
                    {
                      event: 'submit',
                      callback: (e) => {
                        handleSubmitNewPassword({
                          event: e,
                          onSuccess: () => data.props?.onSuccess(),
                        });
                      },
                    },
                  ],
                }),
              ],
            }),
          ],
        }),
      ],
    });

    this.cancelButton = cancelButton;
    this.saveButton = saveButton;
  }

  setProps(props: IChangePasswordProps) {
    super.setProps(props);
    this.saveButton.addListener({
      event: 'click',
      callback: () => this.props?.onSuccess(),
    });
    this.cancelButton.addListener({
      event: 'click',
      callback: () => this.props?.onCancel(),
    });
  }
}
