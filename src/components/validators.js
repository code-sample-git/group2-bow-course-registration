export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(String(email).toLowerCase());
};

export const validatePhone = (phone) => {
  const re = /^\(?([2-9][0-9]{2})\)?[-.●]?([2-9][0-9]{2})[-.●]?([0-9]{4})$/;
  return re.test(String(phone));
};

export const validateName = (name) => {
  return name.length <= 255;
};

export const validateBirthday = (birthday) => {
  const date = new Date(birthday);
  const minDate = new Date('1900-01-01');
  const maxDate = new Date();
  return date >= minDate && date <= maxDate;
};

export const validatePassword = (password) => {
  //password must be at least 8 characters long and contain upper and lower case letters, and a special character. And could not be more than 255 characters
  const re = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,255}$/;
  return re.test(password);
};