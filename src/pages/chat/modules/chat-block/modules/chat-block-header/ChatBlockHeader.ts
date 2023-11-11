import { Avatar } from '../../../../../../components/avatar';
import { ButtonIcon } from '../../../../../../components/button-icon/ButtonIcon';
import { burgerMenuIconTemplate } from '../../../../../../components/icons-templates/burgerMenuIconTemplate';
import { SimpleElement } from '../../../../../../components/simple-element';
import { Block } from '../../../../../../modules/system/block';
import { IComponentProps } from '../../../../../../types';

type IChatBlockHeaderProps = {
  imgSrc: string;
  chatName: string;
};

export class ChatBlockHeader extends Block<IChatBlockHeaderProps> {
  constructor(
    data: IComponentProps<IChatBlockHeaderProps, Partial<HTMLDivElement>>,
  ) {
    super({
      tagName: 'div',
      ...data,
      attributes: { className: 'chat-block-header__layout' },
      children: [
        new Avatar({
          attributes: { className: 'avatar--xs' },
          props: { imgSrc: data.props?.imgSrc || '' },
        }),
        new SimpleElement({
          attributes: { className: 'chat-block-header__chat-name' },
          props: {
            text: data.props?.chatName,
          },
        }),
        new SimpleElement({
          attributes: { className: 'chat-block-header__burger-menu' },
          children: [
            new ButtonIcon({
              props: {
                template: burgerMenuIconTemplate,
                iconProps: {
                  title: 'settings',
                  className: 'chat-block-header__burger-menu__icon',
                },
              },
            }),
          ],
        }),
      ],
    });
  }
}
