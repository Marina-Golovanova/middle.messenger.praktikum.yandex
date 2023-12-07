import { Avatar } from '@components/avatar';
import { ButtonIcon } from '@components/button-icon';
import { deleteIconTemplate } from '@components/icons-templates/deleteIconTemplate';
import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IChatBlockHeaderProps = {
  imgSrc: string;
  chatName: string;
  onDelete: () => void;
};

export class ChatBlockHeader extends Block<IChatBlockHeaderProps> {
  avatar: Avatar;
  title: SimpleElement<HTMLElement>;

  constructor(
    data: IComponentProps<IChatBlockHeaderProps, Partial<HTMLDivElement>>,
  ) {
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
          attributes: { className: 'chat-block-header__delete' },
          children: [
            new ButtonIcon({
              props: {
                template: deleteIconTemplate,
                iconProps: {
                  title: 'settings',
                  className: 'chat-block-header__delete__icon',
                },
              },
              listeners: [
                {
                  event: 'click',
                  callback: () => this.props?.onDelete(),
                },
              ],
            }),
          ],
        }),
      ],
    });

    this.avatar = avatar;
    this.title = title;
  }

  setProps(props: IChatBlockHeaderProps) {
    super.setProps(props);

    this.avatar.setProps({ imgSrc: props.imgSrc });
    this.title.setProps({ text: props.chatName });
  }
}
