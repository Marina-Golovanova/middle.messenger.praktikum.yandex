import { CentredLayout } from '../../layouts/centred-layout/CentredLayout';
import { registrationForm } from './modules/registration-form';

export const registrationPage = new CentredLayout({
  children: [registrationForm],
});
