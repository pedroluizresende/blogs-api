const { User, BlogPost, sequelize, PostCategory } = require('../models');
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

const deleteOwnUser = async (userId) => {
  const t = await sequelize.transaction();
  try {
    const posts = await BlogPost.findAll({ where: { userId } });

    await Promise.all(
      posts.map(async (p) => PostCategory.destroy({ where: { postId: p.id } }, { transaction: t })),
    );
    // exclua as postagens associadas a este usuário
    await BlogPost.destroy({ where: { userId } }, { transaction: t });

    // exclua o próprio usuário
    await User.destroy({ where: { id: userId } }, { transaction: t });

    // confirme a transação
    await t.commit();

    return { type: null, message: '' };
  } catch (error) {
    // reverta a transação em caso de erro
    await t.rollback();
    throw error;
  }
};

module.exports = {
  insert,
  getAll,
  getById,
  deleteOwnUser,
};