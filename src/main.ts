import { render } from './utils/render';

import './style.css';
import { authorizationPage } from './pages/authorization';
import { registrationPage } from './pages/registration';
import { notFoundPage } from './pages/not-found';
import { serverError } from './pages/server-error';
import { profile } from './pages/profile/profile';
import { profileEdit } from './pages/profile/profile-edit';
import { changePassword } from './pages/profile/change-password';

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

    if (link.href.includes('server-error')) {
      render('#app', serverError);
    }

    if (link.href.includes('profile-common')) {
      render('#app', profile);
    }

    if (link.href.includes('profile-edit')) {
      render('#app', profileEdit);
    }

    if (link.href.includes('change-password')) {
      render('#app', changePassword);
    }
  };
}
