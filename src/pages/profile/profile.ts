import { Avatar } from '@components/avatar';
// import { Button } from '@components/button';
import { ButtonIcon } from '@components/button-icon';
import { editIconTemplate } from '@components/icons-templates/editIconTemplate';
import { exitIconTemplate } from '@components/icons-templates/exitIconTemplate';
import { SimpleElement } from '@components/simple-element';
import { MainContentLayout } from '@layouts/main-content-layout';
import { ProfileLayout } from '@layouts/profile-layout';
import { UserForm } from './modules/user-form/UserForm';

export const profile = new ProfileLayout({
  children: [
    new MainContentLayout({
      children: [
        new SimpleElement({
          attributes: { className: 'profile__form-layout' },
          children: [
            new UserForm({
              props: {
                isEditable: false,
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
              ],
            }),
          ],
        }),

        new SimpleElement({
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
            }),

            new ButtonIcon({
              props: {
                template: exitIconTemplate,
                iconProps: {
                  className: 'profile__actions__icon',
                  title: 'exit',
                },
              },
            }),
          ],
        }),
      ],
    }),
  ],
});
