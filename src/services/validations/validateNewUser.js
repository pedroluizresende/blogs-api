const { newUser } = require('./schemas');
const { User } = require('../../models');

module.exports = (user) => {
  const { error } = newUser.validate(user);

  if (error) return { type: 'INVALID_FIELDS', message: error.message };

  return { type: null, message: '' };
};