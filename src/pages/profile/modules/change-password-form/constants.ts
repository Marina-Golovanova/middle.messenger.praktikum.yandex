import { IFormField } from '@types';
import { checkPassword } from '@utils/user-form/validations';

export const changePasswordFields: IFormField[] = [
  {
    props: {
      label: 'old password',
      errorMessage: 'Password is not correct',
    },
    attributes: { name: 'old_password' },
    validate: checkPassword,
  },
  {
    props: {
      label: 'new password',
      errorMessage:
        '8 to 40 letters, at least one capital letter and one number.',
    },
    attributes: { name: 'new_password' },
    validate: checkPassword,
  },
  {
    props: {
      label: 'repeat password',
      errorMessage: 'Password mismatch',
    },
    attributes: { name: 'repeat_password' },
    validate: () => false,
  },
];
