import { Button } from '../../components/button';
import { ErrorMessage } from '../../components/error-message';
import { CentredLayout } from '../../layouts/centred-layout/CentredLayout';

export const notFoundPage = new CentredLayout({
  children: [
    new ErrorMessage({
      props: {
        errorNumber: 404,
        errorMessage: 'This page does not exist',
      },
      children: [
        new Button({
          props: {
            text: 'back to main page',
          },
          attributes: {
            className: 'button--accent button--m',
          },
        }),
      ],
    }),
  ],
});
