import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { api } from '@modules/system/api';
import { store } from '@modules/system/store/Store';

export class ProfileController {
  async logOut() {
    const logOutRes = await api.logOut();

    if (logOutRes.status !== 200) {
      console.error('something went wrong');
      appRouter.go(paths.error);

      return;
    }

    store.removeState();
    appRouter.go(paths.signIn);
  }
}
