import {
  checkEmail,
  checkLogin,
  checkName,
  checkPassword,
  checkPhone,
} from '@utils/user-form/validations';
import { IFormField } from '@types';

export const registrationsFields: IFormField[] = [
  {
    props: {
      label: 'first name',
      errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
    },
    attributes: {
      placeholder: 'Anna',
      name: 'first_name',
    },
    validate: checkName,
  },
  {
    props: {
      label: 'second name',
      errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
    },
    attributes: {
      placeholder: 'Smith',
      name: 'second_name',
    },
    validate: checkName,
  },
  {
    props: {
      label: 'login',
      errorMessage:
        'Use Latin alphabet, numbers, "-", "_" . 3 to 20 letters. One letter.',
    },
    attributes: {
      name: 'login',
      placeholder: 'anna',
    },
    validate: checkLogin,
  },
  {
    props: {
      label: 'email',
      errorMessage: 'Invalid email',
    },
    attributes: {
      placeholder: 'example@yandex.com',
      name: 'email',
    },
    validate: checkEmail,
  },
  {
    props: {
      label: 'password',
      errorMessage:
        '8 to 40 letters, at least one capital letter and one number.',
    },
    attributes: {
      name: 'password',
      type: 'password',
    },
    validate: checkPassword,
  },
  {
    props: {
      label: 'phone',
      errorMessage: 'Invalid phone number',
    },
    attributes: { placeholder: '+79998887766', name: 'phone' },
    validate: checkPhone,
  },
];
