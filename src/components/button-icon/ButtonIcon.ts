import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IButtonProps = {
  template: HandlebarsTemplateDelegate<unknown>;
  iconProps: Partial<SVGElement> & {
    title?: string;
  };
};

export class ButtonIcon extends Block<
  IButtonProps,
  Partial<HTMLButtonElement>
> {
  constructor(data: IComponentProps<IButtonProps, Partial<HTMLButtonElement>>) {
    super({
      tagName: 'button',
      ...data,
      attributes: {
        ...data.attributes,
        className: 'button-icon',
      },
    });
  }

  render() {
    return this.props?.template(this.props.iconProps) || '';
  }
}
