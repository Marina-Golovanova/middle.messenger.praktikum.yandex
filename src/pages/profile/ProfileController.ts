import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { api } from '@modules/system/api';
import { store } from '@modules/system/store/Store';
import { IStoreState, IUserData } from '@types';

export type IHandleProps = {
  onSuccess: () => void;
  onError: () => void;
};

const avatarBasePath = 'https://ya-praktikum.tech/api/v2/resources';

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

  getAvatarUrl() {
    const avatarUrl = (store.getState() as IStoreState)?.user?.userData?.avatar;
    const avatarDefaultUrl = '/avatar.png';

    if ((store.getState() as IStoreState)?.user?.userData?.avatar) {
      return `${avatarBasePath}${avatarUrl}`;
    }

    return avatarDefaultUrl;
  }

  async changeAvatar(blobFile: File | undefined, handleProps: IHandleProps) {
    try {
      if (!blobFile) {
        console.error('File is absent');

        return;
      }

      const formData = new FormData();
      formData.append('avatar', blobFile);

      const changeAvatarRes = await api.changeAvatar(formData);

      if (changeAvatarRes.status !== 200) {
        handleProps.onError();

        return;
      }

      store.set(
        'user.userData.avatar',
        JSON.parse(changeAvatarRes.responseText).avatar,
      );

      handleProps.onSuccess();
    } catch (e) {
      console.error(e);
    }
  }

  async editUser(userData: IUserData, handleProps: IHandleProps) {
    const editUserRes = await api.editUser(userData);

    if (editUserRes.status !== 200) {
      handleProps.onError();

      return;
    }
    handleProps.onSuccess();
    store.set('user.userData', userData);
  }
}
