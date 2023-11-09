import { CentredLayout } from '../../layouts/centred-layout/CentredLayout';
import { render } from '../../utils/render';
import { registrationForm } from './modules/registration-form';

export const registrationPage = new CentredLayout({
  attributes: {
    id: 'centred-layout',
  },
});

registrationPage.componentDidMount = () => {
  render('#centred-layout', registrationForm);
};
