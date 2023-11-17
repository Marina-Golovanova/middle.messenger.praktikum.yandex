import { ButtonIcon } from '@components/button-icon';
import { userIconTemplate } from '@components/icons-templates/userIconTemplate';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element';

export const messageListHeader = new SimpleElement({
  attributes: {
    className: 'chat__sidebar__header',
  },
  children: [
    new ButtonIcon({
      props: {
        template: userIconTemplate,
        iconProps: {
          title: 'profile',
          className: 'chat__sidebar__header__icon',
        },
      },
    }),

    new LabelInput({
      attributes: {
        className: 'input--s input--stretched',
        placeholder: 'search',
      },
    }),
  ],
});
