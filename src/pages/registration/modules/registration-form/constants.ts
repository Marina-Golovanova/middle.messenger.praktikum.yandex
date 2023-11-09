import {
  checkEmail,
  checkLogin,
  checkName,
  checkPassword,
  checkPhone,
} from './utils/validations';
import { IInputType, Input } from '../../../../components/input';
import { IListener } from '../../../../types';

type IRegistrationField = {
  label: string;
  placeholder?: string;
  name: string;
  listeners?: IListener[];
  controller?: Input;
  errorMessage: string;
  type?: IInputType;
  value?: string;
  validate: (value: string) => boolean;
};

export const registrationsFields: IRegistrationField[] = [
  {
    label: 'first name',
    placeholder: 'Anna',
    name: 'first_name',
    errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
    validate: checkName,
  },
  {
    label: 'second name',
    placeholder: 'Smith',
    name: 'second_name',
    errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
    validate: checkName,
  },
  {
    label: 'login',
    name: 'login',
    placeholder: 'anna',
    errorMessage:
      'Use Latin alphabet, numbers, "-", "_" . 3 to 20 letters. One letter.',
    validate: checkLogin,
  },
  {
    label: 'email',
    placeholder: 'example@yandex.com',
    name: 'email',
    errorMessage: 'Invalid email',
    validate: checkEmail,
  },
  {
    label: 'password',
    name: 'password',
    type: 'password',
    errorMessage:
      '8 to 40 letters, at least one capital letter and one number.',
    validate: checkPassword,
  },
  {
    label: 'phone',
    placeholder: '+79998887766',
    name: 'phone',
    errorMessage: 'Invalid phone number',
    validate: checkPhone,
  },
];
