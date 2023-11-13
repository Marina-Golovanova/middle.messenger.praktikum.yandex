import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { changePasswordFields } from './constants';

const fields = changePasswordFields.map(
  (it) =>
    new LabelInput({
      props: { label: it.label },
      attributes: { name: it.name },
    }),
);

export class ChangePasswordForm extends Block {
  constructor(
    data: IComponentProps<Record<string, unknown>, Partial<HTMLElement>>,
  ) {
    super({
      tagName: 'fragment',
      ...data,
      children: [new FormLayout({ children: fields })],
    });
  }

  componentDidMount() {
    this.element.replaceWith(this.element.children[0]);
  }
}
