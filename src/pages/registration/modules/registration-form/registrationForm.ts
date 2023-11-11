import { Button } from '../../../../components/button';
import { FormLayout } from '../../../../components/form-layout';
import { Input } from '../../../../components/input';
import { SimpleElement } from '../../../../components/simple-element/SimpleElement';
import { registrationsFields } from './constants';

const inputs = registrationsFields.map((field) => {
  const input = new Input({
    props: {
      label: field.label,
      placeholder: field.placeholder,
      type: field.type,
      value: field.value,
    },
    attributes: {
      ...field,
      className: 'label',
    },
  });

  field.controller = input;

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
    const labelElement = document.getElementsByName(field.name)[0];
    const inputElement = labelElement.children[0] as HTMLInputElement;

    if (!field.controller) {
      return;
    }

    if (!inputElement.value || !field.validate(inputElement.value)) {
      field.controller.setProps({
        value: inputElement.value,
        errorMessage: field.errorMessage,
      });
      isError = true;
    } else {
      field.controller.setProps({
        errorMessage: undefined,
        value: inputElement.value,
      });
    }
    registrationData[field.name] = inputElement.value;
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
  children: [...inputs, buttonsGroupLayout],
  listeners: [
    {
      event: 'submit',
      callback: handleSubmitForm,
    },
  ],
});
