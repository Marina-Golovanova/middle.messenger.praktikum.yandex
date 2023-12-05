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
import { store } from '@modules/system/store/Store';
import { IStoreState } from '@types';
import { ChangePasswordForm } from './modules/change-password-form';
import { userFormConnector } from './modules/user-form/userFormConnector';
import { ProfileController } from './ProfileController';

const profileController = new ProfileController();

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
            userForm.setProps({ isEditable: true });
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
          callback: profileController.logOut,
        },
      ],
    }),
  ],
});

const avatar = new Avatar({
  props: {
    imgSrc: profileController.getAvatarUrl(),
  },
  attributes: {
    className: 'avatar--m',
  },
});

const changePasswordForm = new ChangePasswordForm({});

const userForm = new userFormConnector({
  tagName: 'form',
  props: {
    userData: (store.getState() as IStoreState)?.user?.userData,
    isEditable: false,
    onSaveChanges: () => {
      profileActions.show();
      userForm.setProps({ isEditable: false });
      changeAvatarButton.hide();
    },
    onCancel: () => {
      profileActions.show();
      userForm.setProps({ isEditable: false });
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
    changePasswordForm.hide();
    userForm.show();
    profileActions.show();
  },
  onCancel: () => {
    changePasswordForm.hide();
    userForm.show();
    profileActions.show();
  },
});

const loadAvatarErrorMessage = new SimpleElement({
  attributes: {
    className: 'profile__form-layout__avatar-layout__avatar-error',
  },
  props: { text: 'Something went wrong' },
});

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

      profileController.changeAvatar(blobFile, {
        onSuccess: () => {
          loadAvatarErrorMessage.hide();
          loader.hide();
          avatar.setProps({
            imgSrc: profileController.getAvatarUrl(),
          });
        },
        onError: () => {
          loadAvatarErrorMessage.show();
        },
      });
    },
    iconProps: {
      className: 'profile__form-layout__photo-icon',
      title: 'choose an avatar',
    },
  },
});

const formLayout = new SimpleElement({
  attributes: { className: 'profile__form-layout' },
  children: [
    new SimpleElement({
      attributes: {
        className: 'profile__form-layout__avatar-layout',
      },
      children: [avatar, changeAvatarButton, loadAvatarErrorMessage],
    }),
    userForm,
    changePasswordForm,
  ],
});

loadAvatarErrorMessage.hide();

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
