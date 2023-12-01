import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { Avatar } from '@components/avatar';
import { ButtonIcon } from '@components/button-icon';
import { editIconTemplate } from '@components/icons-templates/editIconTemplate';
import { exitIconTemplate } from '@components/icons-templates/exitIconTemplate';
import { photoIconTemplate } from '@components/icons-templates/photoIconTemplate';
import { loader } from '@components/loader';
import { SimpleElement } from '@components/simple-element';
import { MainContentLayout } from '@layouts/main-content-layout';
import { ProfileLayout } from '@layouts/profile-layout';
import { api } from '@modules/system/api';
import { store } from '@modules/system/store/Store';
import { IUserData } from '@types';
import { ChangePasswordForm } from './modules/change-password-form';
import { userFormController } from './modules/user-form/userFormController';

const handleLogOut = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  api.logOut().then((res: any) => {
    if (res.status === 200) {
      store.removeState();
      appRouter.go(paths.signIn);
    } else {
      appRouter.go(paths.error);
    }
  });
};

const profileActions = new SimpleElement({
  attributes: {
    className: 'profile__actions',
  },
  children: [
    new ButtonIcon({
      props: {
        template: editIconTemplate,
        iconProps: {
          className: 'profile__actions__icon',
          title: 'edit',
        },
      },
      listeners: [
        {
          event: 'click',
          callback: () => {
            userForm.setProps({ ...userForm?.props, isEditable: true });
            profileActions.hide();
            changeAvatarButton.show();
          },
        },
      ],
    }),

    new ButtonIcon({
      props: {
        template: exitIconTemplate,
        iconProps: {
          className: 'profile__actions__icon',
          title: 'exit',
        },
      },
      listeners: [
        {
          event: 'click',
          callback: handleLogOut,
        },
      ],
    }),
  ],
});

const avatar = new Avatar({
  props: {
    imgSrc: '/avatar.png',
  },
  attributes: {
    className: 'avatar--m',
  },
});

const changePasswordForm = new ChangePasswordForm({});

const userForm = new userFormController({
  tagName: 'form',
  props: {
    userData: (store.getState()?.user as { userData: IUserData })?.userData,
    isEditable: false,
    onSaveChanges: () => {
      profileActions.show();
      userForm.setProps({ ...userForm.props, isEditable: false });
      changeAvatarButton.hide();
    },
    onCancel: () => {
      profileActions.show();
      userForm.setProps({ ...userForm.props, isEditable: false });
      changeAvatarButton.hide();
    },
    onChangePasswordClick: () => {
      userForm.hide();
      profileActions.hide();
      changePasswordForm.show();
    },
  },
});

changePasswordForm.setProps({
  onSuccess: () => {
    console.log('onSuccess');
  },
  onCancel: () => {
    changePasswordForm.hide();
    userForm.show();
    profileActions.show();
  },
});

const formLayout = new SimpleElement({
  attributes: { className: 'profile__form-layout' },
  children: [userForm, changePasswordForm],
});

const loadAvatarErrorMessage = new SimpleElement({
  attributes: {
    className: 'profile__form-layout__avatar-layout__avatar-error',
  },
  props: { text: 'Something went wrong' },
});

loadAvatarErrorMessage.hide();

const changeAvatarButton = new ButtonIcon({
  props: {
    isInputFile: true,
    template: photoIconTemplate,
    onLoadFile: (e) => {
      loader.show();
      const target = e.target as HTMLInputElement;
      const blobFile = target.files?.[0];

      if (!blobFile) {
        return;
      }

      const formData = new FormData();
      formData.append('avatar', blobFile);

      api
        .changeAvatar(formData)
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        .then((res: any) => {
          if (res.status === 200) {
            loadAvatarErrorMessage.hide();

            loader.hide();
            avatar.setProps({
              ...avatar.props,
              imgSrc: `https://ya-praktikum.tech/api/v2/resources${
                JSON.parse(res.responseText).avatar
              }`,
            });
          }
        })
        .catch(() => loadAvatarErrorMessage.show());
    },
    iconProps: {
      className: 'profile__form-layout__photo-icon',
      title: 'choose an avatar',
    },
  },
});

changeAvatarButton.hide();

export const profile = new ProfileLayout({
  children: [
    new MainContentLayout({
      children: [formLayout, profileActions],
    }),
  ],
  props: {
    onClickBack: () => {
      if (userForm.props?.isEditable) {
        userForm.setProps({ ...userForm.props, isEditable: false });
        profileActions.show();
      } else {
        appRouter.go(paths.messenger);
      }
    },
  },
});

changePasswordForm.hide();
