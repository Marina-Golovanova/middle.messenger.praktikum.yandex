import {
  IChangePasswordApiData,
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

  changePassword: (data: IChangePasswordApiData) => {
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

  getUserByLogin: (userLogin: string) => {
    return httpTransport.post(`${baseUrl}/user/search`, {
      data: JSON.stringify({
        login: userLogin,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }) as Promise<XMLHttpRequest>;
  },

  addUserToChat: (users: string[], chatId: string) => {
    return httpTransport.put(`${baseUrl}/chats/users`, {
      data: JSON.stringify({
        users,
        chatId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }) as Promise<XMLHttpRequest>;
  },

  getChatUsers: (id: string) => {
    return httpTransport.get(
      `${baseUrl}/chats/${id}/users`,
    ) as Promise<XMLHttpRequest>;
  },

  deleteChat: (id: string) => {
    return httpTransport.delete(`${baseUrl}/chats`, {
      data: JSON.stringify({
        chatId: id,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }) as Promise<XMLHttpRequest>;
  },

  deleteUserFromChat: (users: string[], chatId: string) => {
    return httpTransport.delete(`${baseUrl}/chats/users`, {
      data: JSON.stringify({
        users,
        chatId,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    }) as Promise<XMLHttpRequest>;
  },

  changeChatAvatar: (avatar: FormData) => {
    return httpTransport.put(`${baseUrl}/chats/avatar`, {
      data: avatar,
    }) as Promise<XMLHttpRequest>;
  },
};
