import { Avatar } from '@components/avatar';
import { BurgerMenu } from '@components/burger-menu';
import { ButtonIcon } from '@components/button-icon';
import { addUserTemplate } from '@components/icons-templates/addUserTemplate';
import { burgerMenuIconTemplate } from '@components/icons-templates/burgerMenuIconTemplate';
import { deleteIconTemplate } from '@components/icons-templates/deleteIconTemplate';
import { usersGroupIconTemplate } from '@components/icons-templates/usersGroupIconTemplate';
import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IChatBlockHeaderProps = {
  imgSrc: string;
  chatName: string;
  onDelete: () => void;
  onAddUser: () => void;
  onShowUsers: () => void;
};

export class ChatBlockHeader extends Block<IChatBlockHeaderProps> {
  avatar: Avatar;
  title: SimpleElement<HTMLElement>;

  constructor(
    data: IComponentProps<IChatBlockHeaderProps, Partial<HTMLDivElement>>,
  ) {
    const burgerMenu = new BurgerMenu({
      props: {
        burgerMenuItems: [
          {
            text: 'Add user',
            icon: new ButtonIcon({
              props: { template: addUserTemplate, iconProps: {} },
              attributes: {
                className: 'chat-block-header__burger-menu-block__icon',
              },
            }),
            onClick: () => data?.props?.onAddUser(),
          },
          {
            text: 'Users',
            icon: new ButtonIcon({
              props: { template: usersGroupIconTemplate, iconProps: {} },
              attributes: {
                className: 'chat-block-header__burger-menu-block__icon',
              },
            }),
            onClick: () => data?.props?.onShowUsers(),
          },
          {
            text: 'Delete chat',
            icon: new ButtonIcon({
              props: { template: deleteIconTemplate, iconProps: {} },
              attributes: {
                className: 'chat-block-header__burger-menu-block__icon',
              },
            }),
            onClick: () => console.log('delete chat'),
          },
        ],
      },
      attributes: {
        className: 'chat-block-header__burger-menu-block',
      },
    });

    const avatar = new Avatar({
      attributes: { className: 'avatar--xs' },
      props: { imgSrc: data.props?.imgSrc || '' },
    });

    const title = new SimpleElement({
      attributes: { className: 'chat-block-header__chat-name' },
      props: {
        text: data.props?.chatName,
      },
    });

    super({
      tagName: 'div',
      ...data,
      attributes: { className: 'chat-block-header__layout' },
      children: [
        avatar,

        title,

        new SimpleElement({
          attributes: { className: 'chat-block-header__burger-menu' },
          children: [
            burgerMenu,

            new ButtonIcon({
              props: {
                template: burgerMenuIconTemplate,
                iconProps: {
                  title: 'settings',
                  className: 'chat-block-header__burger-menu__icon',
                },
              },
              listeners: [
                {
                  event: 'click',
                  callback: () => burgerMenu.show(),
                },
              ],
            }),
          ],
        }),
      ],
    });

    this.avatar = avatar;
    this.title = title;

    burgerMenu.hide();
  }

  setProps(props: IChatBlockHeaderProps) {
    super.setProps(props);

    this.avatar.setProps({ imgSrc: props.imgSrc });
    this.title.setProps({ text: props.chatName });
  }
}
