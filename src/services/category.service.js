const { Category } = require('../models');
const validateNewCategory = require('./validations/validateNewCategory');

const insert = async (category) => {
  const error = validateNewCategory(category);
  
  if (error.type) return error;

  await Category.create(category);

  const newCategory = await Category.findOne({
    where: { name: category.name },
  });
  return { type: null, message: newCategory.dataValues };
};

module.exports = {
  insert,
};