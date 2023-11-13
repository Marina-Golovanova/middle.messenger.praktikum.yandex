import { ILabelInputProps, LabelInput } from '@components/label-input';
import { IListener } from '@types';
import { checkLogin, checkPassword } from '@utils/validations';

// type ILoginField = {
//   label: string;
//   placeholder?: string;
//   name: string;
//   type?: IInputType;
// };

type ILoginField = {
  props: ILabelInputProps;
  attributes: Partial<HTMLInputElement>;
  listeners?: IListener[];
  ref?: LabelInput;
  validate: (value: string) => boolean;
};

type ILoginButton = {
  text: string;
  className?: string;
} & Partial<HTMLButtonElement>;

export const loginFields: ILoginField[] = [
  {
    props: {
      label: 'login',
      inputProps: {
        errorMessage: 'Login is not correct',
      },
    },
    attributes: {
      placeholder: 'example@yandex.ru',
      name: 'login',
    },
    validate: checkLogin,
  },
  {
    props: {
      label: 'password',
      inputProps: {
        errorMessage: 'Password is not correct',
      },
    },
    attributes: {
      name: 'password',
      type: 'password',
    },
    validate: checkPassword,
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
