import { Avatar } from '../../components/avatar';
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
      ],
    }),
  ],
});
