import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { Avatar } from '@components/avatar';
import { ButtonIcon } from '@components/button-icon';
import { editIconTemplate } from '@components/icons-templates/editIconTemplate';
import { exitIconTemplate } from '@components/icons-templates/exitIconTemplate';
import { loader } from '@components/loader';
import { SimpleElement } from '@components/simple-element';
import { MainContentLayout } from '@layouts/main-content-layout';
import { ProfileLayout } from '@layouts/profile-layout';
import { api } from '@modules/system/api';
import { UserForm } from './modules/user-form/UserForm';

const formLayout = new SimpleElement({
  attributes: { className: 'profile__form-layout' },
  children: [loader],
});

api
  .getUserData()
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .then((res: any) => {
    if (res.status === 200) {
      formLayout.addChildren([
        new UserForm({
          props: {
            isEditable: false,
            userData: JSON.parse(res.responseText),
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
      ]);

      loader.setAttributes({ className: 'hidden' });
    } else {
      appRouter.go(paths.error);
    }
  })
  .catch(() => appRouter.go(paths.error));

export const profile = new ProfileLayout({
  children: [
    new MainContentLayout({
      children: [
        formLayout,

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
