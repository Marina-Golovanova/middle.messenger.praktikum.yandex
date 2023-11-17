import { Avatar } from '@components/avatar';
// import { Button } from '@components/button';
import { ButtonIcon } from '@components/button-icon';
import { photoIconTemplate } from '@components/icons-templates/photoIconTemplate';
import { SimpleElement } from '@components/simple-element';
import { MainContentLayout } from '@layouts/main-content-layout';
import { ProfileLayout } from '@layouts/profile-layout';
import { UserForm } from './modules/user-form/UserForm';

export const profileEdit = new ProfileLayout({
  children: [
    new MainContentLayout({
      children: [
        new SimpleElement({
          attributes: { className: 'profile__form-layout' },
          children: [
            new UserForm({ props: { isEditable: true } }),
            new SimpleElement({
              attributes: {
                className: 'form-layout__buttons-group',
              },
            }),
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

                new ButtonIcon({
                  props: {
                    template: photoIconTemplate,
                    iconProps: {
                      className: 'profile-edit__photo-icon',
                      title: 'choose an avatar',
                    },
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
