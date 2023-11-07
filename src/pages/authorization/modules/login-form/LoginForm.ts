import { Button } from '../../../../components/button';
import { FormLayout } from '../../../../components/form-layout';
import { Input } from '../../../../components/input';
import { SimpleDiv } from '../../../../components/simple-div/SimpleDiv';
import { IListener } from '../../../../types';
import { render } from '../../../../utils/render';

type ILoginField = {
  label: string;
  placeholder?: string;
  name: string;
  listeners?: IListener[];
};

type ILoginButton = {
  text: string;
  className?: string;
  listeners?: IListener[];
} & Partial<HTMLButtonElement>;

const loginFields: ILoginField[] = [
  {
    label: 'login',
    placeholder: 'example@yandex.ru',
    name: 'login',
  },
  {
    label: 'password',
    name: 'password',
  },
];

const loginButtons: ILoginButton[] = [
  {
    text: 'sign in',
    className: 'button--accent button--l',
    type: 'submit',
  },
  {
    text: 'sign up',
    className: 'button--normal button--l',
    type: 'button',
  },
];

export const loginForm = new FormLayout({
  attributes: {
    id: 'form-layout',
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
});

loginForm.componentDidMount = () => {
  loginFields.forEach((field) => {
    const input = new Input({
      props: {
        ...field,
      },
      attributes: {
        className: 'label',
      },
      listeners: field.listeners,
    });

    render('#form-layout', input);
  });

  const buttonsGroupLayout = new SimpleDiv({
    attributes: {
      id: 'buttons-group-layout',
      className: 'form-layout__buttons-group',
    },
  });

  buttonsGroupLayout.componentDidMount = () => {
    loginButtons.forEach((button) => {
      const buttonElement = new Button({
        props: {
          ...button,
        },
        attributes: {
          ...button,
        },
      });

      render('#buttons-group-layout', buttonElement);
    });
  };

  render('#form-layout', buttonsGroupLayout);
};
