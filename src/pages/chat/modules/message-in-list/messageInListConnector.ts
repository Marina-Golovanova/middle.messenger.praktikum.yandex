import { Block } from '@modules/system/block';
import { connect } from '@modules/system/store/Connect';
import { Indexed } from '@types';
import { MessageInList } from './MessageInList';

export const messageInListConnector = connect(
  MessageInList as typeof Block,
  (state) => state?.user as Indexed<unknown>,
);
