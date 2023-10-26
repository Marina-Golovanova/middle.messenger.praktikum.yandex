import './style.css';

const authorizationHref = import.meta.resolve(
  './pages/authorization/',
  import.meta.url,
);
console.log(authorizationHref);

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <ul>
    <li><a href="${authorizationHref}">login page</a></li>
    <li><a href="./src/pages/registration/">registration page</a></li>
    <li><a href="./src/pages/not-found/">404</a></li>
    <li><a href="./src/pages/server-error/">500</a></li>
    <li><a href="./src/pages/profile/profile.html">Profile</a></li>
    <li><a href="./src/pages/profile/profile-edit.html">Profile edit</a></li>
    <li>
      <a href="./src/pages/profile/change-password.html">Change password</a>
    </li>
    <li><a href="./src/pages/chat/chat.html">Chat</a></li>
  </ul>
`;
