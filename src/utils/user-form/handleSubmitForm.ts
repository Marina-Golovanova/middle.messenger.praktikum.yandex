import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { FormLayout } from '@components/form-layout';
import { api } from '@modules/system/api';
import { IFormField, IUserSignUpData } from '@types';

export const handleSubmitForm = (
  e: Event,
  fields: IFormField[],
  ref?: FormLayout,
) => {
  e.preventDefault();
  const registrationData: Record<string, string> = {};

  for (const field of fields) {
    if (!field.attributes.name) {
      return;
    }

    const value = field.ref?.inputRef?.element?.value || '';
    if (!field.validate(value)) {
      field.ref?.setProps({
        ...field.ref.props,
        inputProps: field.props.inputProps,
      });

      console.error('Something is wrong');

      return;
    }

    field.ref?.setProps({
      ...field.ref.props,
      inputProps: { errorMessage: undefined },
    });

    registrationData[field.attributes.name] = value;
  }

  const promise = api.signUp(registrationData as IUserSignUpData);
  promise
    .then((res) => {
      if (res.status !== 200) {
        ref?.setProps({ requestError: JSON.parse(res.responseText).reason });
      } else {
        ref?.setProps({ requestError: undefined });
        appRouter.go(paths.messenger);
      }
    })
    .catch(() => ref?.setProps({ requestError: 'Try again' }));
};
