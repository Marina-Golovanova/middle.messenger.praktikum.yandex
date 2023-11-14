import { ILabelInputProps, LabelInput } from '@components/label-input';
import { Block } from '@modules/system/block';

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

export type IFormField = {
  props: ILabelInputProps;
  attributes: Partial<HTMLInputElement>;
  listeners?: IListener[];
  ref?: LabelInput;
  validate: (value: string) => boolean;
};
