export const validateLoginForm = (mail, password) => {
  return validateMail(mail) && validatePassword(password);
};

export const validateRegisterForm = ({ mail, username, password }) => {
  return (
    validateMail(mail) &&
    validateUsername(username) &&
    validatePassword(password)
  );
};

export const validatePassword = (password) => {
  return password.length >= 6 && password.length <= 12;
};

export const validateMail = (mail) => {
  const emailPattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return emailPattern.test(mail);
};

export const validateUsername = (username) => {
  return username.length >= 3 && username.length <= 12;
};
