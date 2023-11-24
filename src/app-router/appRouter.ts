import { Router } from '@modules/system/router/Router';
import { authorizationPage } from '@pages/authorization';
import { chat } from '@pages/chat/chat';
import { profile } from '@pages/profile/profile';
import { registrationPage } from '@pages/registration';
import { paths } from './paths';

export const appRouter = new Router('#app');

appRouter.use(paths.signIn, authorizationPage);
appRouter.use(paths.signUp, registrationPage);
appRouter.use(paths.settings, profile);
appRouter.use(paths.messenger, chat);
