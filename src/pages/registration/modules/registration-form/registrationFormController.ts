import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { api } from '@modules/system/api';
import { store } from '@modules/system/store/Store';
import { IUserSignUpData } from '@types';
import { validate } from './utils/validate';

export type IRegistrationFormHandleProps = {
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
};

export class RegistrationFormController {
  async signUp(
    data: IUserSignUpData,
    handleProps: IRegistrationFormHandleProps,
  ) {
    try {
      if (!validate(data)) {
        console.error('something went wrong');
        return;
      }

      const res = await api.signUp(data);

      if (res.status !== 200) {
        handleProps.onError(JSON.parse(res.responseText).reason);
        return;
      }

      const userDataRes = await api.getUserData();
      if (userDataRes.status === 200) {
        store.set('user.userData', JSON.parse(userDataRes.responseText));
        handleProps.onSuccess();
        appRouter.go(paths.messenger);
      }
    } catch (e) {
      appRouter.go(paths.error);
    }
  }
}
