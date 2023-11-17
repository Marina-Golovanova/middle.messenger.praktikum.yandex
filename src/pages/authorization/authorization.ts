import { CentredLayout } from '@layouts/centred-layout';
import { loginForm } from './modules/login-form';

export const authorizationPage = new CentredLayout({
  children: [loginForm],
});
