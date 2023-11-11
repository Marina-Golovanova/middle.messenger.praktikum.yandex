import { Avatar } from '../../components/avatar';
import { Button } from '../../components/button';
import { SimpleElement } from '../../components/simple-element';
import { MainContentLayout } from '../../layouts/main-content-layout';
import { ProfileLayout } from '../../layouts/profile-layout';
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
              attributes: {
                className: 'form-layout__buttons-group',
              },
              children: [
                new SimpleElement({
                  attributes: {
                    className: 'change-password__buttons',
                  },
                  children: [
                    new Button({
                      props: {
                        text: 'cancel',
                      },
                      attributes: {
                        className: 'button--normal button--s',
                      },
                    }),
                    new Button({
                      props: {
                        text: 'save',
                      },
                      attributes: {
                        className: 'button--accent button--s',
                      },
                    }),
                  ],
                }),
              ],
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
      ],
    }),
  ],
});
