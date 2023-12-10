import { ButtonIcon } from '@components/button-icon';
import { crossTemplateIcon } from '@components/icons-templates/crossTemplateIcon';
import { deleteIconTemplate } from '@components/icons-templates/deleteIconTemplate';
import { IPopupProps, Popup } from '@components/popup';
import { SimpleElement } from '@components/simple-element';
import { IComponentProps } from '@types';

export type IUserListProps = {
  users?: {
    login: string;
    id: string;
  }[];
  onDeleteUser?: (id: string) => void;
  onClose?: () => void;
};

export class UserList extends Popup<IUserListProps> {
  userList: SimpleElement<HTMLUListElement>;

  constructor(
    data: IComponentProps<IPopupProps<IUserListProps>, Partial<HTMLElement>>,
  ) {
    const userList = new SimpleElement<HTMLUListElement>({});

    super({
      ...data,
      props: {
        header: new SimpleElement({
          props: { text: 'Users' },
          children: [
            new ButtonIcon({
              props: { template: crossTemplateIcon, iconProps: {} },
              attributes: {
                className: 'user-list__header__icon',
              },
              listeners: [
                {
                  event: 'click',
                  callback: () => data?.props?.onClose?.(),
                },
              ],
            }),
          ],
          attributes: {
            className: 'user-list__header',
          },
        }),
        body: userList,
        ...data?.props,
      },
      attributes: {
        className: 'user-list',
      },
    });

    this.userList = userList;
  }

  setProps(props: IUserListProps) {
    this.userList.children?.forEach((child) => {
      child.destroy();
    });
    super.setProps(props);
    this.userList.addChildren(
      (this?.props?.users || []).map(
        (it) =>
          new SimpleElement({
            props: { text: it.login },
            children: [
              new ButtonIcon({
                props: { template: deleteIconTemplate, iconProps: {} },
                listeners: [
                  {
                    event: 'click',
                    callback: () => {
                      this.props?.onDeleteUser?.(it.id);
                    },
                  },
                ],
                attributes: {
                  className: 'user-list__item__icon',
                },
              }),
            ],
            attributes: {
              className: 'user-list__item',
            },
          }),
      ),
    );
  }
}
