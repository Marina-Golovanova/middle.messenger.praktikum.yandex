type IUserData = {
  id: string;
  firstName: string;
  secondName: string;
  displayName: string;
  login: string;
  email: string;
  phone: string;
};

const mockUser: IUserData = {
  id: '1',
  firstName: 'Ivan',
  secondName: 'Ivanov',
  displayName: 'ivanko',
  login: 'ivanko545',
  email: 'ivan@yandex.ru',
  phone: '+7-999-888-77-66',
};

export const userFormFields = [
  {
    label: 'first name',
    value: mockUser.firstName,
  },
  {
    label: 'second name',
    value: mockUser.secondName,
  },
  {
    label: 'display name',
    value: mockUser.displayName,
  },
  {
    label: 'login',
    value: mockUser.login,
  },
  {
    label: 'email',
    value: mockUser.email,
  },
  {
    label: 'phone',
    value: mockUser.login,
  },
];
