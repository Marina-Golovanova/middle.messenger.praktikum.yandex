import { Block } from './modules/system/block';

export type IListener = {
  event: keyof HTMLElementEventMap;
  callback: (e: Event) => void;
};

export type IComponentProps<Props, Attributes> = {
  props?: Props;
  attributes?: Attributes;
  listeners?: IListener[];
  children?: Block[];
};
