import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { authorizationPage } from '@pages/authorization';

import './style.css';

appRouter.use(paths.signIn, authorizationPage)?.start();
