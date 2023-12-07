import { IChangePasswordData } from '@types';
import { checkPassword } from '@utils/user-form/validations';

const passwordFormValidationRules = {
  oldPassword: checkPassword,
  newPassword: checkPassword,
  repeatPassword: (newPassword: string, repeatPassword: string) =>
    newPassword === repeatPassword,
};

export enum ChangePasswordError {
  /* eslint-disable quotes */
  OldPasswordError = "old password isn't correct",
  NewPasswordError = "new password isn't correct",
  RepeatPasswordError = "repeated password doesn't match",
  /* eslint-enable quotes */
}

export const validate = (data: IChangePasswordData) => {
  if (!passwordFormValidationRules.oldPassword(data.oldPassword)) {
    throw ChangePasswordError.OldPasswordError;
  } else if (!passwordFormValidationRules.newPassword(data.newPassword)) {
    throw ChangePasswordError.NewPasswordError;
  } else if (
    !passwordFormValidationRules.repeatPassword(
      data.newPassword,
      data.repeatPassword,
    )
  ) {
    throw ChangePasswordError.RepeatPasswordError;
  }

  return true;
};
