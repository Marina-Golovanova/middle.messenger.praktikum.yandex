import { Avatar } from '@components/avatar';
import { SimpleElement } from '@components/simple-element';
import { MainContentLayout } from '@layouts/main-content-layout';
import { ProfileLayout } from '@layouts/profile-layout';
import { ChangePasswordForm } from './modules/change-password-form';

export const changePassword = new ProfileLayout({
  children: [
    new MainContentLayout({
      children: [
        new SimpleElement({
          attributes: { className: 'profile__form-layout' },
          children: [
            new ChangePasswordForm({}),

            new SimpleElement({
              attributes: { className: 'profile__form-layout__avatar-layout' },
              children: [
                new Avatar({
                  props: {
                    imgSrc: '/avatar.png',
                  },
                  attributes: {
                    className: 'avatar--m',
                  },
                }),
              ],
            }),
          ],
        }),
      ],
    }),
  ],
});
