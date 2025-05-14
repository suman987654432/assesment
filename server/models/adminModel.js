
const adminCredentials = {
  email: 'admin@gmail.com',
  password: 'admin'
};
const validateAdmin = (email, password) => {
  return email === adminCredentials.email && password === adminCredentials.password;
};

module.exports = {
  validateAdmin
};
