import { FormLayout } from '@components/form-layout';
import { Input } from '@components/input';
import { Block } from '@modules/system/block';
import { IComponentProps } from '@types';
import { changePasswordFields } from './constants';

const fields = changePasswordFields.map(
  (it) =>
    new Input({
      props: { name: it.name, label: it.label },
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
}
