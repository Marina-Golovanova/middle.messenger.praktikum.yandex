import { appRouter } from '@app-router/appRouter';
import { paths } from '@app-router/paths';
import { authorizationPage } from '@pages/authorization';
import { ChatController } from '@pages/chat/ChatController';

import './style.css';

const chatController = new ChatController();
setInterval(() => {
  chatController.setChats();
}, 60 * 1000 * 3);

window.addEventListener('load', () => chatController.setChats());

appRouter.use(paths.signIn, authorizationPage)?.start();
