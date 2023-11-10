import { Avatar } from '../../components/avatar';
import { ButtonIcon } from '../../components/button-icon/ButtonIcon';
import { editIconTemplate } from '../../components/icons-templates/editIconTemplate';
import { exitIconTemplate } from '../../components/icons-templates/exitIconTemplate';
import { SimpleDiv } from '../../components/simple-div';
import { MainContentLayout } from '../../layouts/main-content-layout';
import { ProfileLayout } from '../../layouts/profile-layout';
import { userForm } from './modules/user-form';

export const profile = new ProfileLayout({
  children: [
    new MainContentLayout({
      children: [
        new SimpleDiv({
          attributes: { className: 'profile__form-layout' },
          children: [
            userForm,
            new SimpleDiv({
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

        new SimpleDiv({
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
