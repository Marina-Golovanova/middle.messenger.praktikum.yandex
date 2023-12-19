import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element';
import { ProfileController } from '@pages/profile/ProfileController';
import { IChangePasswordData, IComponentProps } from '@types';
import { snakeCaseToCamelCase } from '@utils/snakeCaseToCamelCase';
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
  onError: (message: string) => void;
};

const handleSubmitNewPassword = (props: IHandleSubmitNewPassword) => {
  props.event.preventDefault();
  const passwordData: Record<string, string> = {};

  for (const field of changePasswordFields) {
    if (!field.attributes.name) {
      return;
    }

    const value = field.ref?.inputRef?.element?.value || '';

    passwordData[snakeCaseToCamelCase(field.attributes.name)] = value;
  }

  const profileController = new ProfileController();
  profileController.changePassword(passwordData as IChangePasswordData, {
    onOldPasswordError: (message) => {
      const oldPasswordField = changePasswordFields.find(
        (field) => field.attributes?.name === 'old_password',
      );

      if (oldPasswordField) {
        oldPasswordField.ref?.setProps({ errorMessage: message });
      }
    },
    onNewPasswordError: (message) => {
      const newPasswordField = changePasswordFields.find(
        (field) => field.attributes?.name === 'new_password',
      );

      if (newPasswordField) {
        newPasswordField.ref?.setProps({ errorMessage: message });
      }
    },
    onRepeatPasswordError: (message) => {
      const repeatPasswordField = changePasswordFields.find(
        (field) => field.attributes?.name === 'repeat_password',
      );

      if (repeatPasswordField) {
        repeatPasswordField.ref?.setProps({ errorMessage: message });
      }
    },
    onSuccess: () => {
      changePasswordFields.forEach((field) => {
        field.ref?.setProps({ errorMessage: undefined });
      });
      props.onSuccess();
    },
    onError: (message) => {
      changePasswordFields.forEach((field) => {
        field.ref?.setProps({ errorMessage: undefined });
      });
      props.onError(message);
    },
  });
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
                className: 'profile__form-layout__change-password__buttons',
              },
              children: [cancelButton, saveButton],
            }),
          ],
        }),
      ],
      listeners: [
        {
          event: 'submit',
          callback: (e) => {
            e.preventDefault();

            handleSubmitNewPassword({
              event: e,
              onSuccess: () => data.props?.onSuccess(),
              onError: (message: string) =>
                (this as unknown as FormLayout).setProps({
                  requestError: message,
                }),
            });
          },
        },
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
