import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element/SimpleElement';
import {
  handleSubmitForm,
  SubmitFormEvents,
} from '@utils/user-form/handleSubmitForm';
import { registrationsFields } from './constants';

const fields = registrationsFields.map((field) => {
  const input = new LabelInput({
    ...field,
    props: {
      ...field.props,
      errorMessage: undefined,
    },

    listeners: [
      {
        event: 'blur',
        callback: (e) => {
          const target = e.target as HTMLInputElement;
          const value = target.value;

          if (!field.validate(value)) {
            input.setProps({
              ...input.props,
              errorMessage: field.props.errorMessage,
            });
          } else {
            input.setProps({ ...field.props, errorMessage: undefined });
            input.setAttributes({ ...input.attributes, value });
          }
        },
      },
    ],
  });

  field.ref = input;

  return input;
});

const button = new Button({
  props: {
    text: 'sign up',
  },
  attributes: {
    className: 'button--accent button--l',
  },
});

const buttonsGroupLayout = new SimpleElement({
  attributes: {
    id: 'buttons-group-layout',
    className: 'form-layout__buttons-group',
  },
  children: [button],
});

export const registrationForm: FormLayout = new FormLayout({
  attributes: {
    id: 'form-layout',
    className: 'form-layout__with-frame',
  },
  children: [...fields, buttonsGroupLayout],
  listeners: [
    {
      event: 'submit',
      callback: (e) =>
        handleSubmitForm({
          e,
          fields: registrationsFields,
          eventType: SubmitFormEvents.signUp,
          ref: registrationForm,
        }),
    },
  ],
});
