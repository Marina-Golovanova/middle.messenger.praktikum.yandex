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
    name: 'first_name',
  },
  {
    label: 'second name',
    value: mockUser.secondName,
    placeholder: 'Smith',
    name: 'second_name',
  },
  {
    label: 'display name',
    value: mockUser.displayName,
    placeholder: 'anna',
    name: 'display_name',
  },
  {
    label: 'login',
    value: mockUser.login,
    placeholder: 'anna123',
    name: 'login',
  },
  {
    label: 'email',
    value: mockUser.email,
    placeholder: 'anna@yandex.ru',
    name: 'email',
  },
  {
    label: 'phone',
    value: mockUser.login,
    placeholder: '+79998887766',
    name: 'phone',
  },
];
