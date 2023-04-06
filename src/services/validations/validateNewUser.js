const { newUser } = require('./schemas');

module.exports = (user) => {
  const { error } = newUser.validate(user);

  if (error) return { type: 'INVALID_FIELDS', message: error.message };

  return { type: null, message: '' };
};