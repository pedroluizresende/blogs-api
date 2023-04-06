const { User } = require('../models');
const { generateToken } = require('../utils/auth');
const validateNewUser = require('./validations/validateNewUser');

const insert = async (user) => {
  const error = validateNewUser(user);

  if (error.type) return error;

  const userExist = await User.findAll({
    where: { email: user.email },
  });
  if (userExist.length !== 0) {
    return { type: 'CONFLICT', message: 'User already registered' };
  }

  await User.create(user);

  const token = generateToken({ email: user.email });

  return { type: null, message: token };
};

module.exports = {
  insert,
};