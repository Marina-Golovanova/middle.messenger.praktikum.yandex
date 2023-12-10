import { Button } from '@components/button';
import { LabelInput } from '@components/label-input';
import { IPopupProps, Popup } from '@components/popup';
import { SimpleElement } from '@components/simple-element';
import { IComponentProps } from '@types';

export type IUserSearchPopupProps = {
  onSearch?: (value: string) => void;
  onCancel?: () => void;
};

const userSearchPopupInput = new LabelInput({
  attributes: { className: 'input--stretched' },
  props: { label: 'Type user login' },
  listeners: [
    {
      event: 'blur',
      callback: (e) => {
        const target = e.target as HTMLInputElement;
        userSearchPopupInput.inputRef.setAttributes({ value: target.value });
      },
    },
  ],
});

export class UserSearchPopup extends Popup<IUserSearchPopupProps> {
  constructor(
    data: IComponentProps<
      IPopupProps<IUserSearchPopupProps>,
      Partial<HTMLElement>
    >,
  ) {
    super({
      ...data,
      props: {
        header: userSearchPopupInput,
        footer: new SimpleElement({
          attributes: {
            className: 'chat__create-popup__controls',
          },
          children: [
            new Button({
              props: { text: 'cancel' },
              attributes: { className: 'button--dark button--s' },
              listeners: [
                {
                  event: 'click',
                  callback: () => data?.props?.onCancel?.(),
                },
              ],
            }),

            new Button({
              props: { text: 'search' },
              attributes: { className: 'button--accent button--s' },
              listeners: [
                {
                  event: 'click',
                  callback: () => {
                    const userLogin =
                      userSearchPopupInput.inputRef.attributes?.value || '';

                    data.props?.onSearch?.(userLogin);

                    userSearchPopupInput.inputRef.setAttributes({
                      value: '',
                    });
                  },
                },
              ],
            }),
          ],
        }),
      },
    });
  }
}
