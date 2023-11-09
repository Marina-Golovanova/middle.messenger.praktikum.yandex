import { render } from './utils/render';

import './style.css';
import { authorizationPage } from './pages/authorization';
import { registrationPage } from './pages/registration';
import { notFoundPage } from './pages/not-found';

const linksContainer = document.getElementsByTagName('ul')[0];

const links = document.getElementsByTagName('a');

for (const link of links) {
  link.onclick = (e) => {
    e.preventDefault();
    linksContainer.style.display = 'none';

    if (link.href.includes('authorization')) {
      render('#app', authorizationPage);
    }

    if (link.href.includes('registration')) {
      render('#app', registrationPage);
    }

    if (link.href.includes('not-found')) {
      render('#app', notFoundPage);
    }
  };
}
