import { Block } from '@modules/system/block';
import { connect } from '@modules/system/store/Connect';
import { Indexed } from '@types';
import { UserForm } from './UserForm';

export const userFormConnector = connect(
  UserForm as typeof Block,
  (state) => state?.user as Indexed<unknown>,
);
