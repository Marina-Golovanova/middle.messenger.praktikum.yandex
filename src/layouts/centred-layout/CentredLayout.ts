import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type ICentredLayoutProps = Record<string, never>;

export class CentredLayout extends Block<
  ICentredLayoutProps,
  Partial<HTMLElement>
> {
  constructor(
    data: IComponentProps<ICentredLayoutProps, Partial<HTMLElement>>,
  ) {
    super({
      tagName: 'main',
      ...data,
    });
  }

  render() {
    return '';
  }

  setAttributes(attributes?: Partial<HTMLElement>): void {
    const className = 'centred-layout';
    super.setAttributes({ ...attributes, className });
  }
}
