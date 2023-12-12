import { IUserSignInData } from '@types';
import { checkLogin, checkPassword } from '@utils/user-form/validations';

type ILoginFormValidateRules = {
  login: (value: string) => boolean;
  password: (value: string) => boolean;
};

const loginFormValidateRules: ILoginFormValidateRules = {
  login: checkLogin,
  password: checkPassword,
};

export const validate = (data: IUserSignInData) => {
  return (
    loginFormValidateRules.login(data.login) &&
    loginFormValidateRules.password(data.password)
  );
};
