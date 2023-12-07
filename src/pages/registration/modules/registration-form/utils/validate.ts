import { IUserSignUpData } from '@types';
import {
  checkEmail,
  checkLogin,
  checkName,
  checkPassword,
  checkPhone,
} from '@utils/user-form/validations';

type IRegistrationFormValidateRules = {
  [key in keyof IUserSignUpData]: (value: string) => boolean;
};

const registrationFormValidateRules: IRegistrationFormValidateRules = {
  first_name: checkName,
  second_name: checkName,
  email: checkEmail,
  login: checkLogin,
  password: checkPassword,
  phone: checkPhone,
};

export const validate = (data: IUserSignUpData) => {
  for (const [key, fn] of Object.entries(registrationFormValidateRules)) {
    if (!fn(data[key as keyof IUserSignUpData])) {
      return false;
    }
  }

  return true;
};
