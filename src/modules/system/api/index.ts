import { IUserData, IUserSignInData, IUserSignUpData } from '@types';
import { HTTPTransport } from '../http-transport/HTTPTransport';

const baseUrl = 'https://ya-praktikum.tech/api/v2';

const httpTransport = new HTTPTransport();

export const api = {
  signIn: (userData: IUserSignInData) => {
    return httpTransport.post(`${baseUrl}/auth/signin`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(userData),
    }) as Promise<XMLHttpRequest>;
  },

  signUp: (userData: IUserSignUpData) => {
    return httpTransport.post(`${baseUrl}/auth/signup`, {
      headers: {
        'Content-Type': 'application/json',
      },
      data: JSON.stringify(userData),
    }) as Promise<XMLHttpRequest>;
  },

  getChats: () => {
    return httpTransport.get(
      `${baseUrl}/auth/chats`,
    ) as Promise<XMLHttpRequest>;
  },

  getUserData: () => {
    return httpTransport.get(`${baseUrl}/auth/user`);
  },

  logOut: () => {
    return httpTransport.post(`${baseUrl}/auth/logout`);
  },

  editUser: (userData: IUserData) => {
    return httpTransport.put(`${baseUrl}/user/profile`, {
      data: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    });
  },

  changeAvatar: (avatar: FormData) => {
    console.log(avatar);
    return fetch('https://ya-praktikum.tech/api/v2/user/profile/avatar', {
      method: 'PUT',
      body: avatar,
      credentials: 'include',
      mode: 'cors',
    });
  },
};
