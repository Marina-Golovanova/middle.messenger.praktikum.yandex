import { IFormField } from '@types';
import {
  checkEmail,
  checkLogin,
  checkName,
  checkPhone,
} from '@utils/user-form/validations';

export const userFormFields: IFormField[] = [
  {
    props: {
      label: 'first name',
      errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
    },
    attributes: {
      value: '',
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
      value: '',
      placeholder: 'Smith',
      name: 'second_name',
    },
    validate: checkName,
  },
  {
    props: {
      label: 'display name',
      errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
    },
    attributes: {
      value: '',
      placeholder: 'anna',
      name: 'display_name',
    },
    validate: () => true,
  },
  {
    props: {
      label: 'login',
      errorMessage:
        'Use Latin alphabet, numbers, "-", "_" . 3 to 20 letters. One letter.',
    },
    attributes: {
      value: '',
      placeholder: 'anna123',
      name: 'login',
    },
    validate: checkLogin,
  },
  {
    props: {
      label: 'email',
      errorMessage: 'Invalid email',
    },
    attributes: {
      value: '',
      placeholder: 'anna@yandex.ru',
      name: 'email',
    },
    validate: checkEmail,
  },
  {
    props: {
      label: 'phone',
      errorMessage: 'Invalid phone number',
    },
    attributes: {
      value: '',
      placeholder: '+79998887766',
      name: 'phone',
    },
    validate: checkPhone,
  },
];
