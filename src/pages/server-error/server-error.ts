import { Button } from '@components/button';
import { ErrorMessage } from '@components/error-message';
import { CentredLayout } from '@layouts/centred-layout';

export const serverError = new CentredLayout({
  children: [
    new ErrorMessage({
      props: {
        errorNumber: 500,
        errorMessage: 'Something went wrong',
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
