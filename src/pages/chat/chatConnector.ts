import { Block } from '@modules/system/block';
import { connect } from '@modules/system/store/Connect';
import { Indexed } from '@types';
import { Chat } from './Chat';

export const chatConnector = connect(
  Chat as typeof Block,
  (state) => state?.user as Indexed<unknown>,
);
