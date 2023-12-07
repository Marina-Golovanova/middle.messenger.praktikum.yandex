import { Block } from '@modules/system/block';
import { connect } from '@modules/system/store/Connect';
import { Indexed } from '@types';
import { ChatBlock } from './ChatBlock';

export const chatBlockConnector = connect(
  ChatBlock as typeof Block,
  (state) => state?.user as Indexed<unknown>,
);
