import {
  IChangePasswordData,
  IUserData,
  IUserSignInData,
  IUserSignUpData,
} from '@types';
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
    return httpTransport.get(`${baseUrl}/chats`) as Promise<XMLHttpRequest>;
  },

  getUserData: () => {
    return httpTransport.get(`${baseUrl}/auth/user`) as Promise<XMLHttpRequest>;
  },

  logOut: () => {
    return httpTransport.post(
      `${baseUrl}/auth/logout`,
    ) as Promise<XMLHttpRequest>;
  },

  editUser: (userData: IUserData) => {
    return httpTransport.put(`${baseUrl}/user/profile`, {
      data: JSON.stringify(userData),
      headers: {
        'Content-Type': 'application/json',
      },
    }) as Promise<XMLHttpRequest>;
  },

  changeAvatar: (avatar: FormData) => {
    return httpTransport.put(`${baseUrl}/user/profile/avatar`, {
      data: avatar,
    }) as Promise<XMLHttpRequest>;
  },

  changePassword: (data: IChangePasswordData) => {
    return httpTransport.put(`${baseUrl}/user/password`, {
      data: JSON.stringify(data),
      headers: {
        'Content-Type': 'application/json',
      },
    }) as Promise<XMLHttpRequest>;
  },

  createChat: (chatName: string) => {
    return httpTransport.post(`${baseUrl}/chats`, {
      data: JSON.stringify({ title: chatName }),
      headers: {
        'Content-Type': 'application/json',
      },
    }) as Promise<XMLHttpRequest>;
  },

  getToken: (chatId: string) => {
    return httpTransport.post(
      `${baseUrl}/chats/token/${chatId}`,
    ) as Promise<XMLHttpRequest>;
  },
};
