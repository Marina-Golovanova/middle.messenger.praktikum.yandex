import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { Input } from '@components/input';
import { loginButtons, loginFields } from './constants';

const inputs = loginFields.map(
  (field) =>
    new Input({
      props: {
        ...field,
      },
      attributes: {
        className: 'label',
      },
    }),
);

const buttons = loginButtons.map(
  (button) =>
    new Button({
      props: {
        text: button.text,
      },
      attributes: button,
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
        const loginData: Record<string, string> = {};

        const inputsNames = loginFields.map((it) => it.name);

        inputsNames.forEach((name) => {
          const inputElement = document.getElementsByName(
            name,
          )[0] as HTMLInputElement;
          loginData[name] = inputElement.value;
        });

        console.log(loginData);
      },
    },
  ],
  children: [...inputs, ...buttons],
});
