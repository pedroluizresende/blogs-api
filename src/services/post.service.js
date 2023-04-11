const { Op } = require('sequelize');
const { BlogPost, PostCategory, Category, User, sequelize } = require('../models');
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

const update = async (id, userId, { title, content }) => {
    const post = await BlogPost.findOne({
      where: { id },
    });

    if (post.id !== +userId) return { type: 'NOT_AUTH', message: 'Unauthorized user' };

    await BlogPost.update(
    { title, content },
    { where: { id } },
);

      const updatedPost = await BlogPost.findOne({
        where: { id },
        include: [{ model: Category, as: 'categories' },
        { model: User, as: 'user', attributes: { exclude: 'password' } }],
      });

    return { type: null, message: updatedPost };
  };

  const remove = async (id, userId) => {
    const post = await BlogPost.findOne({
      where: { id },
    });
  
    if (!post) return { type: 'NOT_FOUND', message: 'Post does not exist' };
  
    if (post.userId !== +userId) return { type: 'NOT_AUTH', message: 'Unauthorized user' };
  
    const t = await sequelize.transaction();
     
    try {
      await PostCategory.destroy({ where: { postId: id } }, { transaction: t });
  
      await BlogPost.destroy({ where: { id } }, { transaction: t });
  
      await t.commit();
  
      return { type: null, message: '' };
    } catch (error) {
      await t.rollback();
      throw error;
    }
  };

  const postsByTitle = async (term) => {
    console.log('term: ', term);
    const posts = await BlogPost.findAll({
      where: { title: { [Op.like]: `%${term}%` } },
      include: [{ model: Category, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: 'password' } }],
    });
    console.log('posts por titulo: ', posts);

    return posts;
  };

  const searchByTerm = async (term) => {
    console.log('term:', term);

    if (!term) {
      const allPosts = await BlogPost.findAll({
        include: [{ model: Category, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: 'password' } }],
      });
      return { type: null, message: allPosts };
    }

    const postsByContent = await BlogPost.findAll({
      where: { content: { [Op.like]: `%${term}%` } },
      include: [{ model: Category, as: 'categories' },
      { model: User, as: 'user', attributes: { exclude: 'password' } }],
    });
    const byTitle = await postsByTitle(term);

    const allPosts = [...byTitle, ...postsByContent];

    return { type: null, message: allPosts };
  };

module.exports = {
  insert,
  getAll,
  getBydId,
  update,
  remove,
  searchByTerm,
};