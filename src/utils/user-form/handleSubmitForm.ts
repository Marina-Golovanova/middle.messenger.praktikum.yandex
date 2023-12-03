import { FormLayout } from '@components/form-layout';
import { api } from '@modules/system/api';
import { RegistrationFormController } from '@pages/registration/modules/registration-form/RegistrationFormController';
import { IFormField, IUserData, IUserSignUpData } from '@types';

export enum SubmitFormEvents {
  signUp = 'signUp',
  edit = 'edit',
}

export type IHandleSubmitForm = {
  e: Event;
  fields: IFormField[];
  eventType: SubmitFormEvents;
  ref?: FormLayout;
  callback?: () => void;
};

export const handleSubmitForm = (props: IHandleSubmitForm) => {
  props.e.preventDefault();
  const userData: Record<string, string> = {};

  for (const field of props.fields) {
    if (!field.attributes.name) {
      return;
    }

    const value = field.ref?.attributes?.value || field.attributes.value || '';
    userData[field.attributes.name] = value;
  }

  if (props.eventType === SubmitFormEvents.signUp) {
    const registrationFormController = new RegistrationFormController();

    registrationFormController.signUp(userData as IUserSignUpData, {
      onSuccess: () => {
        props.fields.forEach((field) => {
          field.ref?.inputRef?.setAttributes({ value: '' });
        });
      },
      onError: (errorMessage) =>
        props.ref?.setProps({ requestError: errorMessage }),
    });
  } else {
    const promise = api.editUser(userData as IUserData);

    promise
      .then(() => {
        props?.callback?.();
      })
      .catch(() => props.ref?.setProps({ requestError: 'Try again' }));
  }
};
