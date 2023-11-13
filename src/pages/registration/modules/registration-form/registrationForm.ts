import { Button } from '@components/button';
import { FormLayout } from '@components/form-layout';
import { LabelInput } from '@components/label-input';
import { SimpleElement } from '@components/simple-element/SimpleElement';
import { registrationsFields } from './constants';

const fields = registrationsFields.map((field) => {
  const { inputProps, ...props } = field.props;
  const input = new LabelInput({
    ...field,
    props,

    listeners: [
      {
        event: 'blur',
        callback: (e) => {
          const target = e.target as HTMLInputElement;
          const value = target.value;

          if (!field.validate(value)) {
            input.setProps({ ...input.props, inputProps });
          } else {
            input.setProps({ ...props, inputProps: undefined });
          }
          // if (!field.validate(value)) {
          //   input.setProps({
          //     ...input.props,
          //     inputProps: inputProps,
          //   });
          // } else {
          //   console.log(value);
          //   input.setProps({
          //     ...input.props,
          //     inputProps: inputProps,
          //   });
          // }
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
    if (!field.attributes.name) {
      return;
    }

    const value = field.ref?.inputRef?.element?.value || '';
    if (!field.validate(value)) {
      field.ref?.setProps({
        ...field.ref.props,
        inputProps: field.props.inputProps,
      });
      isError = true;
    } else {
      field.ref?.setProps({
        ...field.ref.props,
        inputProps: { errorMessage: undefined },
      });
      isError = false;
      registrationData[field.attributes.name] = value;
    }
    registrationData[field.attributes.name] = value;
  });

  if (!isError) {
    console.log(registrationData);
  } else {
    console.error('Something is wrong');
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
