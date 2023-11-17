import { IFormField } from '@types';
import {
  checkEmail,
  checkLogin,
  checkName,
  checkPhone,
} from '@utils/user-form/validations';

type IUserData = {
  id: string;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
};

const mockUser: IUserData = {
  id: '1',
  firstName: 'Ivan',
  secondName: 'Ivanov',
  displayName: 'ivanko',
  login: 'ivanko545',
  email: 'ivan@yandex.ru',
  phone: '+79998887766',
};

export const userFormFields: IFormField[] = [
  {
    props: {
      label: 'first name',
      inputProps: {
        errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
      },
    },
    attributes: {
      value: mockUser.firstName,
      placeholder: 'Anna',
      name: 'first_name',
    },
    validate: checkName,
  },
  {
    props: {
      label: 'second name',
      inputProps: {
        errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
      },
    },
    attributes: {
      value: mockUser.secondName,
      placeholder: 'Smith',
      name: 'second_name',
    },
    validate: checkName,
  },
  {
    props: {
      label: 'display name',
      inputProps: {
        errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
      },
    },
    attributes: {
      value: mockUser.displayName,
      placeholder: 'anna',
      name: 'display_name',
    },
    validate: checkLogin,
  },
  {
    props: {
      label: 'login',
      inputProps: {
        errorMessage:
          'Use Latin alphabet, numbers, "-", "_" . 3 to 20 letters. One letter.',
      },
    },
    attributes: {
      value: mockUser.login,
      placeholder: 'anna123',
      name: 'login',
    },
    validate: checkLogin,
  },
  {
    props: {
      label: 'email',
      inputProps: {
        errorMessage: 'Invalid email',
      },
    },
    attributes: {
      value: mockUser.email,
      placeholder: 'anna@yandex.ru',
      name: 'email',
    },
    validate: checkEmail,
  },
  {
    props: {
      label: 'phone',
      inputProps: {
        errorMessage: 'Invalid phone number',
      },
    },
    attributes: {
      value: mockUser.phone,
      placeholder: '+79998887766',
      name: 'phone',
    },
    validate: checkPhone,
  },
];
