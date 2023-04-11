const { BlogPost, PostCategory, Category, User } = require('../models');
const { validateCategorysId } = require('./validations/validateNewPost');

const insert = async (userId, { title, content, categoryIds }) => {
const error = await validateCategorysId(categoryIds);
if (error.type) return error;

 await BlogPost.create({
  title, content, userId,
});

const newPost = await BlogPost.findOne({
  where: { content, title },
});
await Promise.all(
  categoryIds.map(async (c) => PostCategory.create({
    postId: newPost.id,
    categoryId: c,
  })),
);

return { type: null, message: newPost };
};

const getAll = async (userId) => {
  const posts = await BlogPost.findAll({
    where: { userId },
    include: [{ model: Category, as: 'categories' },
  { model: User, as: 'user', attributes: { exclude: 'password' } }],
  });
  return { type: null, message: posts };
};

const getBydId = async (id) => {
  const post = await BlogPost.findOne({
    where: { id },
    include: [{ model: Category, as: 'categories' },
  { model: User, as: 'user', attributes: { exclude: 'password' } }],
  });

  if (!post) return { type: 'NOT_FOUND', message: 'Post does not exist' };
  return { type: null, message: post };
};

module.exports = {
  insert,
  getAll,
  getBydId,
};