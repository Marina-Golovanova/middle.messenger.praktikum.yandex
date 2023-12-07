import { CentredLayout } from '@layouts/centred-layout';
import { registrationFormConnector } from './modules/registration-form';

export const registrationPage = new CentredLayout({
  children: [new registrationFormConnector({ tagName: 'form' })],
});
