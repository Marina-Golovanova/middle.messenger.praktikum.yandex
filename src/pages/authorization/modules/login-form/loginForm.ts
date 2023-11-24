import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { loginButtons, loginFields } from './constants';
import { api } from '@modules/system/api';
import { IUserSignInData } from '@types';
import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';

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

export const loginForm = new FormLayout({
  attributes: {
    className: 'form-layout__with-frame',
  },
  listeners: [
    {
      event: 'submit',
      callback: (e) => {
        e.preventDefault();

        let isError = false;

        const loginData: Record<string, string> = {};

        loginFields.forEach((field) => {
          if (!field.attributes.name) {
            return;
          }

          const value = field.ref?.inputRef?.element?.value || '';
          if (!field.validate(value)) {
            field.ref?.setProps({
              ...field.ref.props,
              inputProps: field.props.inputProps,
            });
            isError = true;
          } else {
            field.ref?.setProps({
              ...field.ref.props,
              inputProps: { errorMessage: undefined },
            });
            isError = false;
            loginData[field.attributes.name] = value;
          }
        });

        if (!isError) {
          const promise = api.signIn(loginData as IUserSignInData);

          promise
            .then((res) => {
              if (res.status !== 200) {
                loginForm.setProps({
                  requestError: JSON.parse(res.responseText).reason,
                });
              } else {
                loginForm.setProps({ requestError: undefined });
                appRouter.go(paths.messenger);
              }
            })
            .catch(() => loginForm?.setProps({ requestError: 'Try again' }));
        } else {
          console.error('Something is wrong');
        }
      },
    },
  ],
  children: [...fields, ...buttons],
});
