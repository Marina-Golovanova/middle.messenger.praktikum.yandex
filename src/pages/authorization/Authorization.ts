import { CentredLayout } from '../../layouts/centred-layout/CentredLayout';
import { render } from '../../utils/render';
import { loginForm } from './modules/login-form';

export const authorizationPage = new CentredLayout({
  attributes: {
    id: 'centred-layout',
  },
});

authorizationPage.componentDidMount = () => {
  render('#centred-layout', loginForm);
};
