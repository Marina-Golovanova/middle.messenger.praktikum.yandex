import { Block } from '@modules/system/block';
import { connect } from '@modules/system/store/Connect';
import { Indexed } from '@types';
import { RegistrationForm } from './RegistrationForm';

export const registrationFormConnector = connect(
  RegistrationForm as typeof Block,
  (state) => state.user as Indexed<unknown>,
);
