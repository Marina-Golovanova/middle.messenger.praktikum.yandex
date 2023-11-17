import { IFormField } from '@types';

export const handleSubmitForm = (e: Event, fields: IFormField[]) => {
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

  console.log(registrationData);
};
