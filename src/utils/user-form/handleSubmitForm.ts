import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { FormLayout } from '@components/form-layout';
import { api } from '@modules/system/api';
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

    if (!field.validate(value)) {
      field.ref?.setProps({
        ...field.ref.props,
        inputProps: field.props.inputProps,
      });

      console.error('Something is wrong');

      return;
    } else {
      field.ref?.setProps({
        ...field.ref.props,
        inputProps: { ...field.ref.props?.inputProps, errorMessage: undefined },
      });
    }

    userData[field.attributes.name] = value;
  }

  if (props.eventType === SubmitFormEvents.signUp) {
    const promise = api.signUp(userData as IUserSignUpData);
    promise
      .then((res) => {
        if (res.status !== 200) {
          props.ref?.setProps({
            requestError: JSON.parse(res.responseText).reason,
          });
        } else {
          props.ref?.setProps({ requestError: undefined });
          appRouter.go(paths.messenger);
        }
      })
      .catch(() => props.ref?.setProps({ requestError: 'Try again' }));
  } else {
    const promise = api.editUser(userData as IUserData);

    promise
      .then(() => {
        props?.callback?.();
      })
      .catch(() => props.ref?.setProps({ requestError: 'Try again' }));
  }
};
