import { IInputType } from '@components/input';

type ILoginField = {
  label: string;
  placeholder?: string;
  name: string;
  type?: IInputType;
};

type ILoginButton = {
  text: string;
  className?: string;
} & Partial<HTMLButtonElement>;

export const loginFields: ILoginField[] = [
  {
    label: 'login',
    placeholder: 'example@yandex.ru',
    name: 'login',
  },
  {
    label: 'password',
    name: 'password',
    type: 'password',
  },
];

export const loginButtons: ILoginButton[] = [
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
