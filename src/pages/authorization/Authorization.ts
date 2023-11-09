import { CentredLayout } from '../../layouts/centred-layout/CentredLayout';
import { loginForm } from './modules/login-form';

export const authorizationPage = new CentredLayout({
  children: [loginForm],
});
