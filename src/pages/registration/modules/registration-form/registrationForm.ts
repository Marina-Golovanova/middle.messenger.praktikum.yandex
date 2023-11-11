import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { Input } from '@components/input';
import { SimpleElement } from '@components/simple-element/SimpleElement';
import { registrationsFields } from './constants';

const fields = registrationsFields.map((field) => {
  const { errorMessage, ...props } = field.props;
  const input = new Input({
    props,
    listeners: [
      {
        event: 'blur',
        callback: (e) => {
          const target = e.target as HTMLInputElement;
          const value = target.value;

          if (!field.validate(value)) {
            input.setProps({
              ...input.props,
              value,
              errorMessage,
            });
          } else {
            console.log(value);
            input.setProps({
              ...input.props,
              errorMessage: undefined,
              value,
            });
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

const handleSubmitForm = (e: Event) => {
  e.preventDefault();
  const registrationData: Record<string, string> = {};

  let isError = false;

  registrationsFields.forEach((field) => {
    if (!field.props.name || !field.ref) {
      return;
    }

    if (!field.validate(field.ref.props?.value || '')) {
      field.ref.setProps({
        ...field.ref.props,
        errorMessage: field.props.errorMessage,
      });
      isError = true;
    } else {
      field.ref.setProps({
        ...field.ref.props,
        errorMessage: undefined,
      });
    }
    registrationData[field.props.name] = field.ref.props?.value || '';
  });

  if (!isError) {
    console.log(registrationData);
  }
};

export const registrationForm = new FormLayout({
  attributes: {
    id: 'form-layout',
    className: 'form-layout__with-frame',
  },
  children: [...fields, buttonsGroupLayout],
  listeners: [
    {
      event: 'submit',
      callback: handleSubmitForm,
    },
  ],
});
