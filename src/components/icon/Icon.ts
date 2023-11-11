import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IIconProps = {
  template: HandlebarsTemplateDelegate<unknown>;
  title?: string;
} & Partial<SVGElement>;

export class Icon extends Block<IIconProps> {
  constructor(data: IComponentProps<IIconProps, Partial<SVGElement>>) {
    super({ tagName: 'fragment', ...data });
  }

  render() {
    if (this.props) {
      return this.props.template(this.props);
    }

    return '';
  }
}
