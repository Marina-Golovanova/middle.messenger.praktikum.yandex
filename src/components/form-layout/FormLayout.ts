import { Block } from '../../modules/system/block';
import { IComponentProps } from '../../types';

type IFormProps = Record<string, never>;

export class FormLayout extends Block<IFormProps, Partial<HTMLFormElement>> {
  constructor(data: IComponentProps<IFormProps, Partial<HTMLFormElement>>) {
    super({
      tagName: 'form',
      ...data,
    });
  }

  render() {
    return '';
  }

  setAttributes(attributes?: Partial<HTMLFormElement>): void {
    const className = 'form-layout ' + (attributes?.className || '');
    super.setAttributes({ ...attributes, className });
  }
}
