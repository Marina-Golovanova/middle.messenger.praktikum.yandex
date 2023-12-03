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

export type IUserSignUpData = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  password: string;
  phone: string;
};

export type IUserSignInData = {
  login: string;
  password: string;
};

export type IUserData = IUserSignUpData & {
  id?: string;
  display_name: string;
};

export type IChangePasswordData = {
  oldPassword: string;
  newPassword: string;
};

export type Indexed<T = unknown> = {
  [key in string]: T;
};
