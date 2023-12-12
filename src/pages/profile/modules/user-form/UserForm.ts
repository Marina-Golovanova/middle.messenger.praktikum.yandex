import { Button } from '@components/button';
import { FormLayout, IFormProps } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element';
import { Block } from '@modules/system/block';
import { IComponentProps, IUserData } from '@types';
import {
  handleSubmitForm,
  SubmitFormEvents,
} from '@utils/user-form/handleSubmitForm';
import { userFormFields } from './constants';

type IUserFormProps = {
  isEditable?: boolean;
  userData?: IUserData;
  onSaveChanges?: () => void;
  onCancel?: () => void;
  onChangePasswordClick?: () => void;
};

const fields = userFormFields.map((field) => {
  const input = new LabelInput({
    props: {
      ...field.props,
      errorMessage: undefined,
      inputProps: {
        readOnly: true,
      },
    },
    attributes: field.attributes,

    listeners: [
      {
        event: 'blur',
        callback: (e) => {
          if (input.props?.inputProps?.readOnly) {
            return;
          }

          const target = e.target as HTMLInputElement;
          const value = target.value;

          input.setAttributes({ value });

          const fieldInConfig = userFormFields.find(
            (it) => it.attributes.name === target.name,
          );
          if (fieldInConfig) {
            fieldInConfig.attributes.value = value;
          }

          if (!field.validate(value)) {
            input.setProps({
              ...input.props,
              errorMessage: field.props.errorMessage,
            });
          } else {
            input.setProps({
              ...input.props,
              errorMessage: undefined,
            });
          }
        },
      },
    ],
  });

  field.ref = input;

  return input;
});

const getEditableButtons = (onCancel: () => void) =>
  new SimpleElement({
    attributes: { className: 'form-layout__buttons-group-flex' },
    children: [
      new Button({
        props: {
          text: 'cancel',
        },
        attributes: {
          className: 'button--normal button--s',
          type: 'button',
        },
        listeners: [
          {
            event: 'click',
            callback: () => {
              onCancel();
            },
          },
        ],
      }),

      new Button({
        props: {
          text: 'save',
        },
        attributes: {
          className: 'button--accent button--s',
          type: 'submit',
        },
      }),
    ],
  });

const getNotEditableFormButtons = (onChangePasswordClick: () => void) =>
  new SimpleElement({
    attributes: {
      className: 'form-layout__buttons-group',
    },
    children: [
      new Button({
        props: {
          text: 'change password',
        },
        attributes: {
          className: 'button--accent',
          type: 'button',
        },
        listeners: [
          {
            event: 'click',
            callback: onChangePasswordClick,
          },
        ],
      }),
    ],
  });

export class UserForm extends FormLayout<IUserFormProps> {
  editableFormButtons: Block;
  notEditableFormButtons: Block;

  constructor(
    data: IComponentProps<IFormProps<IUserFormProps>, Partial<HTMLFormElement>>,
  ) {
    fields.forEach((field) => {
      field.inputRef.setProps({
        ...field.inputRef.props,
        readOnly: !data.props?.isEditable,
      });
    });

    const editableButton = getEditableButtons(() => data.props?.onCancel?.());
    const notEditableFormButtons = getNotEditableFormButtons(() =>
      data.props?.onChangePasswordClick?.(),
    );

    super({
      ...data,
      children: [...fields, editableButton, notEditableFormButtons],
      listeners: [
        {
          event: 'submit',
          callback: (e) =>
            handleSubmitForm({
              e,
              fields: userFormFields,
              eventType: SubmitFormEvents.edit,
              onSuccess: () => {
                data.props?.onSaveChanges?.();
              },
            }),
        },
      ],
    });

    fields.forEach((field) => {
      field.inputRef.setProps({
        ...field.inputRef.props,
        readOnly: !this.props?.isEditable,
      });

      field.inputRef.setAttributes({
        value:
          this.props?.userData?.[field.attributes?.name as keyof IUserData] ||
          '',
      });
    });

    this.editableFormButtons = editableButton;
    this.notEditableFormButtons = notEditableFormButtons;

    if (data.props?.isEditable) {
      this.notEditableFormButtons.hide();
    } else {
      this.editableFormButtons.hide();
    }
  }

  setProps(props: IUserFormProps) {
    super.setProps(props);

    if (props?.isEditable) {
      this.editableFormButtons.show();

      if (
        !this.notEditableFormButtons.attributes?.className?.includes('hidden')
      ) {
        this.notEditableFormButtons.hide();
      }
    } else {
      if (!this.editableFormButtons.attributes?.className?.includes('hidden')) {
        this.editableFormButtons.hide();
      }

      this.notEditableFormButtons.show();
    }

    fields.forEach((field) => {
      field.inputRef.setProps({
        ...field.inputRef.props,
        readOnly: !this.props?.isEditable,
      });

      field.inputRef.setAttributes({
        value:
          this.props?.userData?.[field.attributes?.name as keyof IUserData] ||
          '',
      });
    });

    userFormFields.forEach((field) => {
      field.attributes.value =
        this.props?.userData?.[field.attributes?.name as keyof IUserData] || '';
    });
  }
}
