import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { ButtonIcon } from '@components/button-icon';
import { addUserTemplate } from '@components/icons-templates/addUserTemplate';
import { userIconTemplate } from '@components/icons-templates/userIconTemplate';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element';
import { IComponentProps } from '@types';

export type IMessageListHeaderProps = {
  onSearchUser: () => void;
};

export class MessageListHeader extends SimpleElement<
  HTMLElement,
  IMessageListHeaderProps
> {
  constructor(
    data: IComponentProps<
      { text?: string | undefined } & IMessageListHeaderProps,
      Partial<HTMLElement>
    >,
  ) {
    super({
      ...data,
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
          listeners: [
            {
              event: 'click',
              callback: () => appRouter.go(paths.settings),
            },
          ],
        }),

        new LabelInput({
          attributes: {
            className: 'input--s input--stretched',
            placeholder: 'search',
          },
        }),

        new ButtonIcon({
          props: {
            template: addUserTemplate,
            iconProps: {
              title: 'add user',
              className:
                'chat__sidebar__header__icon chat__sidebar__header__icon--accent',
            },
          },
          listeners: [
            {
              event: 'click',
              callback: () => this.props?.onSearchUser(),
            },
          ],
        }),
      ],
    });
  }
}
