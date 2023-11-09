import { render } from './utils/render';

import './style.css';
import { authorizationPage } from './pages/authorization';
import { registrationPage } from './pages/registration';

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
  };
}
