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

const getAll = async () => {
  const users = await User.findAll({
    attributes: { exclude: ['password'] },
  });

  return { type: null, message: users };
};
// 
const getById = async (id) => {
  const user = await User.findByPk(id, {
    attributes: { exclude: ['password'] },
  });

  if (!user) return { type: 'NOT_FOUND', message: 'User does not exist' };

  return { type: null, message: user };
};

module.exports = {
  insert,
  getAll,
  getById,
};