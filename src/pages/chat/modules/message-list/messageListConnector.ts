import { Block } from '@modules/system/block';
import { connect } from '@modules/system/store/Connect';
import { Indexed } from '@types';
import { MessageList } from './MessageList';

export const messageListConnector = connect(
  MessageList as typeof Block,
  (state) => state?.user as Indexed<unknown>,
);
