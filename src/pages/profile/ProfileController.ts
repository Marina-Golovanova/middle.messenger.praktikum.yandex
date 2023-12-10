import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { api } from '@modules/system/api';
import { store } from '@modules/system/store/Store';
import { IChangePasswordData, IStoreState, IUserData } from '@types';
import { avatarBasePath, avatarDefaultUrl } from '@constants';
import { ChangePasswordError, validate } from './utils/validate';

export type IHandleProps = {
  onSuccess: () => void;
  onError: () => void;
};

export type IChangePasswordHandleProps = {
  onSuccess: () => void;
  onError: (message: string) => void;
  onOldPasswordError: (message: string) => void;
  onNewPasswordError: (message: string) => void;
  onRepeatPasswordError: (message: string) => void;
};

export class ProfileController {
  async logOut() {
    try {
      const logOutRes = await api.logOut();

      if (logOutRes.status !== 200) {
        console.error('something went wrong');
        appRouter.go(paths.error);

        return;
      }

      store.removeState();
      appRouter.go(paths.signIn);
    } catch (e) {
      console.error(e);

      appRouter.go(paths.error);
    }
  }

  getAvatarUrl() {
    const avatarUrl = (store.getState() as IStoreState)?.user?.userData?.avatar;

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
    try {
      const editUserRes = await api.editUser(userData);

      if (editUserRes.status !== 200) {
        handleProps.onError();

        return;
      }
      handleProps.onSuccess();
      store.set('user.userData', userData);
    } catch (e) {
      console.error(e);
    }
  }

  async changePassword(
    data: IChangePasswordData,
    handleProps: IChangePasswordHandleProps,
  ) {
    try {
      validate(data);

      const changePasswordRes = await api.changePassword({
        oldPassword: data.oldPassword,
        newPassword: data.newPassword,
      });

      if (changePasswordRes.status !== 200) {
        handleProps.onError(JSON.parse(changePasswordRes.responseText).reason);
        return;
      }

      handleProps.onSuccess();
    } catch (e) {
      if (e === ChangePasswordError.OldPasswordError) {
        handleProps.onOldPasswordError(e);
      } else if (e === ChangePasswordError.NewPasswordError) {
        handleProps.onNewPasswordError(e);
      } else if (e === ChangePasswordError.RepeatPasswordError) {
        handleProps.onRepeatPasswordError(e);
      } else {
        handleProps.onError('Something went wrong');
      }
    }
  }
}
