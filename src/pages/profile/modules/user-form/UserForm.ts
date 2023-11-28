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
  isEditable: boolean;
  userData?: IUserData;
  onSaveChanges?: () => void;
  onCancel?: () => void;
};

const fields = userFormFields.map((field) => {
  const { inputProps } = field.props;

  const input = new LabelInput({
    props: {
      ...field.props,
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
            input.setProps({ ...input.props, inputProps });
          } else {
            input.inputRef.setProps({ ...inputProps, errorMessage: undefined });
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

const notEditableFormButtons = new SimpleElement({
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
      },
    }),
  ],
});

export class UserForm extends FormLayout<IUserFormProps> {
  editableFormButtons: Block;

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
              callback: () => {
                this.props?.onSaveChanges?.();
              },
            }),
        },
      ],
    });

    this.editableFormButtons = editableButton;
  }

  setProps(props: IUserFormProps) {
    super.setProps(props);

    fields.forEach((field) => {
      if (props.isEditable) {
        this.editableFormButtons.show();
        notEditableFormButtons.hide();
      } else {
        notEditableFormButtons.show();
        this.editableFormButtons.hide();
      }

      field.inputRef.setProps({
        ...field.inputRef.props,
        readOnly: !props.isEditable,
      });

      field.inputRef.setAttributes({
        value:
          props?.userData?.[field.attributes?.name as keyof IUserData] || '',
      });

      userFormFields.forEach((field) => {
        field.attributes.value =
          props?.userData?.[field.attributes?.name as keyof IUserData] || '';
      });
    });
  }
}
