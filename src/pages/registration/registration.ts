import { CentredLayout } from '@layouts/centred-layout';
import { RegistrationForm } from './modules/registration-form';

export const registrationPage = new CentredLayout({
  children: [new RegistrationForm({})],
});
