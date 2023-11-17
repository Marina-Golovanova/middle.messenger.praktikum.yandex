export const checkName = (name: string) => {
  const reg = /^[a-zA-Zа-яёА-ЯЁ]+$/;

  return !!name.length && name[0].toUpperCase() === name[0] && reg.test(name);
};

export const checkLogin = (login: string) => {
  const reg = /^[a-zA-Z0-9]+$/;

  return login.length > 2 && login.length < 21 && reg.test(login);
};

export const checkEmail = (email: string) => {
  const reg = /^[\w_.]+@[\w_.]{0,}[a-zA-Z]\.\w+$/;

  return reg.test(email);
};

export const checkPassword = (password: string) => {
  const checkDigits = /\d/;

  return (
    password.length > 7 &&
    password.length < 40 &&
    !!password.match(checkDigits) &&
    !!Array.from(password).filter(
      (it) => !checkDigits.test(it) && it === it.toUpperCase(),
    ).length
  );
};

export const checkPhone = (phone: string) => {
  const reg = /^\+?\d+$/;

  return (
    reg.test(phone) &&
    phone.replace('+', '').length > 9 &&
    phone.replace('+', '').length < 17
  );
};
