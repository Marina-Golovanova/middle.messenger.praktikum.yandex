import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { loginButtons, loginFields } from './constants';
import { IUserSignInData } from '@types';
import { LoginFormController } from './LoginFormController';

const fields = loginFields.map((field) => {
  const inputField = new LabelInput({
    ...field,
    props: {
      label: field.props.label,
    },
  });

  field.ref = inputField;

  return inputField;
});

const buttons = loginButtons.map(
  (button) =>
    new Button({
      props: {
        text: button.text,
      },
      attributes: button,
      listeners: button.listeners,
    }),
);

const loginFormController = new LoginFormController();

export const loginForm = new FormLayout({
  attributes: {
    className: 'form-layout__with-frame',
  },
  listeners: [
    {
      event: 'submit',
      callback: (e) => {
        e.preventDefault();

        const loginData: Record<string, string> = {};

        loginFields.forEach((field) => {
          if (!field.attributes.name) {
            return;
          }

          const value = field.ref?.inputRef?.element?.value || '';
          loginData[field.attributes.name] = value;
        });

        loginFormController.login(loginData as IUserSignInData, {
          onSuccess: () => {
            fields.forEach((field) => {
              field.inputRef.setAttributes({ value: '' });
            });
          },
          onError: (errorMessage: string) => {
            loginForm.setProps({ requestError: '' });
            loginForm.setProps({
              requestError: errorMessage,
            });
          },
        });
      },
    },
  ],
  children: [...fields, ...buttons],
});

loginForm.componentDidMount = () => {
  loginFormController.checkIsUserAuthorized();
};
