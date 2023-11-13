import {
  checkEmail,
  checkLogin,
  checkName,
  checkPassword,
  checkPhone,
} from '@utils/validations';
import { ILabelInputProps, LabelInput } from '@components/label-input';
import { IListener } from '@types';

type IRegistrationField = {
  props: ILabelInputProps;
  attributes: Partial<HTMLInputElement>;
  listeners?: IListener[];
  ref?: LabelInput;
  validate: (value: string) => boolean;
};

export const registrationsFields: IRegistrationField[] = [
  {
    props: {
      label: 'first name',
      inputProps: {
        errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
      },
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
      inputProps: {
        errorMessage: 'Use Latin or Cyrillic alphabet, capitalize first letter',
      },
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
      inputProps: {
        errorMessage:
          'Use Latin alphabet, numbers, "-", "_" . 3 to 20 letters. One letter.',
      },
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
      inputProps: {
        errorMessage: 'Invalid email',
      },
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
      inputProps: {
        errorMessage:
          '8 to 40 letters, at least one capital letter and one number.',
      },
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
      inputProps: {
        errorMessage: 'Invalid phone number',
      },
    },
    attributes: { placeholder: '+79998887766', name: 'phone' },
    validate: checkPhone,
  },
];
