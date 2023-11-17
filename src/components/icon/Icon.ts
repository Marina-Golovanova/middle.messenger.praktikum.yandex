import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';

type IIconProps = {
  template: HandlebarsTemplateDelegate<unknown>;
  title?: string;
} & Partial<SVGElement>;

export class Icon extends Block<IIconProps> {
  constructor(data: IComponentProps<IIconProps, Partial<SVGElement>>) {
    super({ tagName: 'template', ...data });
  }

  componentDidMount() {
    if (!this.props?.template) {
      return;
    }
    this.element.innerHTML = this.props.template(this.props);
    const stub = (this.element as HTMLTemplateElement).content.children[0];
    this.element.replaceWith(stub);
  }
}
