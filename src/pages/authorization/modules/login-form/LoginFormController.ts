import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { api } from '@modules/system/api';
import { store } from '@modules/system/store/Store';
import { IUserData, IUserSignInData } from '@types';
import { validate } from './utils/validate';

export type ILoginFormHandleProps = {
  onSuccess: () => void;
  onError: (errorMessage: string) => void;
};

class LoginFormController {
  async login(data: IUserSignInData, handleProps: ILoginFormHandleProps) {
    try {
      if (!validate(data)) {
        // eslint-disable-next-line quotes
        handleProps.onError("Login or password aren't correct!");
        return;
      }

      const res = await api.signIn(data);

      if (res.status !== 200) {
        handleProps.onError(JSON.parse(res.responseText)?.reason);
        return;
      }

      const userDataRes = await api.getUserData();
      store.set('user.userData', JSON.parse(userDataRes.responseText));
      handleProps.onSuccess();

      appRouter.go(paths.messenger);
    } catch (e) {
      console.error(e);
      appRouter.go(paths.error);
    }
  }

  async checkIsUserAuthorized() {
    if ((store.getState()?.user as { userData: IUserData })?.userData?.id) {
      appRouter.go(paths.messenger);

      return;
    }

    const userDataRes = await api.getUserData();
    if (userDataRes.status === 200) {
      store.set('user.userData', JSON.parse(userDataRes.responseText));
      appRouter.go(paths.messenger);
    }
  }
}

export const loginFormController = new LoginFormController();
