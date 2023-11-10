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
    placeholder: 'Anna',
  },
  {
    label: 'second name',
    value: mockUser.secondName,
    placeholder: 'Smith',
  },
  {
    label: 'display name',
    value: mockUser.displayName,
    placeholder: 'anna',
  },
  {
    label: 'login',
    value: mockUser.login,
    placeholder: 'anna123',
  },
  {
    label: 'email',
    value: mockUser.email,
    placeholder: 'anna@yandex.ru',
  },
  {
    label: 'phone',
    value: mockUser.login,
    placeholder: '+79998887766',
  },
];
